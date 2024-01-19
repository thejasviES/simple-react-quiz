import "../App.css";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import { useEffect, useReducer } from "react";
import StartScreen from "./StartScreen";
import Active from "./Active";
import NextButtton from "./NextButtton";
import Progress from "./Progress";
import FinsishedScreen from "./FinsishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  numQuestions: 0,
  secondRemaining: 10,
};

function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case "dataRecived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        numQuestions: action.payload.questions.length,
      };

    case "datafailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.questions.at(state.index);
      // console.log(question);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finsihed":
      return { ...state, status: "finsihed" };
    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
        secondRemaining: 10,
      };
    case "tick":
      // state.secondRemaining < 0 ? console.log("hiii") : console.log("hello");
      return {
        ...state,
        // secondRemaining:
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finsihed" : state.status,
      };
    default:
      throw new Error("not sucess");
  }
}

//Start the server in the data folder to fetch question data from the server

function App() {
  //use reducer to little complicated version of useState
  const [
    { points, numQuestions, questions, status, index, answer, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  // // console.log(questions["questions"][0]);
  // const numbers = questions.length;
  // const questionssf=questions.questions;
  // console.log(questionssf);
  // let maxPosiiblePoints=questionssf.reduce((prev,cur)=>prev+cur.points,0);
  // console.log(maxPosiiblePoints);
  const maxPosiiblePoints = 270;

  useEffect(function () {
    fetch("http://localhost:4000/data")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Main>
        {status === "loading" && <Loader></Loader>}
        {status === "error" && <Error></Error>}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
          ></StartScreen>
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPosiiblePoints={maxPosiiblePoints}
              answer={answer}
            ></Progress>
            <Active
              question={questions["questions"][index]}
              dispatch={dispatch}
              answer={answer}
            ></Active>
            <Footer>
              <Timer
                dispatch={dispatch}
                secondRemaining={secondRemaining}
              ></Timer>
              <NextButtton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              ></NextButtton>
            </Footer>
          </>
        )}
        <Footer></Footer>
        {status === "finsihed" && (
          <FinsishedScreen
            points={points}
            dispatch={dispatch}
          ></FinsishedScreen>
        )}
      </Main>
    </div>
  );
}

export default App;
