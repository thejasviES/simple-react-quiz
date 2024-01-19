function FinsishedScreen({points,dispatch}) {
    return (
        <>
        
        <p className="result">
          Your score is {points} 
        </p>
        <button className="btn btn-ui" onClick={() => dispatch({ type: "reset" })}>
    Reset
</button>
        </>
    )
}

export default FinsishedScreen
