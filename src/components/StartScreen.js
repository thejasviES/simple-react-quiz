function StartScreen({ dispatch, numQuestions }) {
  // console.log(numQuestions)
  return (
    <div className="start">
      <h2>Welcome</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        start
      </button>
    </div>
  );
}

export default StartScreen;
