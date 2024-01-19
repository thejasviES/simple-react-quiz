const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const pug = require('pug');
const fs = require('fs');
const app = express();
// app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to generate a unique filename
function generateUniqueFilename(originalFilename) {
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, "");
    const randomString = Math.random().toString(36).substring(2, 8);
    const baseFilename = path.parse(originalFilename).name;
    const uniqueFilename = `${baseFilename}_${timestamp}_${randomString}_output.pdf`;
    return uniqueFilename;
}

app.get("/", (req, res) => {
    res.render("index.pug");
});

app.post('/convert', upload.single('docx_file'), (req, res) => {
    if (!req.file) {
        return res.send('No file uploaded.');
    }

    // Save the uploaded docx file to a temporary path
    const docxPath = path.join(__dirname, 'uploads', 'temp.docx');
    require('fs').writeFileSync(docxPath, req.file.buffer);

    // Generate a unique filename for the PDF
    const uniquePdfFilename = generateUniqueFilename(req.file.originalname);
    const pdfPath = path.join(__dirname, 'uploads', uniquePdfFilename);

    // Run the Python script for conversion
    const pythonProcess = spawn('python', ['convert.py', docxPath, pdfPath]);
    console.log(uniquePdfFilename);
    pythonProcess.on('exit', (code) => {
        if (code === 0) {
            // Conversion successful, send the response
            console.log(uniquePdfFilename);
            res.render("index.pug", { uniquePdfFilename });
        } else {
            // Conversion failed, send an error response
            res.send('Error during conversion.');
        }
    });
});

app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.sendFile(filePath);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


