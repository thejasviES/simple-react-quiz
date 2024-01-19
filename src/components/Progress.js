function Progress({ index, numQuestions, points, maxPosiiblePoints, answer }) {
  // console.log(numQuestions);
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> /{numQuestions}
      </p>
      <p>
        <strong>
          {points}/{maxPosiiblePoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
