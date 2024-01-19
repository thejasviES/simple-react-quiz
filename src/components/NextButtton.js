function NextButtton({ dispatch, answer, index, numQuestions }) {
  // console.log(index, numQuestions);
  if (answer == null) return null;
  if (Number(index + 1) === Number(numQuestions)) {
    // console.log(index, numQuestions);
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finsihed" })}
      >
        finsided
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        next
      </button>
    );
  }
}

export default NextButtton;
