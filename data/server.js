const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const cors = require("cors");
app.use(cors());
const { promisify } = require('util');


//  const port=4000;

app.get('/data', async (req, res) => {
    try {
        const data = await fs.readFile('questions.json', 'utf8');
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(4000, () => {
    console.log(`Server is running at http://localhost:4000`);
});
