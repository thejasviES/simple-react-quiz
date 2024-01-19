import { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  useEffect(() => {
    const id = setInterval(() => {
      // console.log("tick");
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);
  return <div className="timer">{secondRemaining}</div>;
}

export default Timer;
