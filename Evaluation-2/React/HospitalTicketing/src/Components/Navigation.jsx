const Navigation = ({
    index, total, next, prev
}) =>{
    return(
        <div className="nav">
            <button onClick={prev} disabled = {index == 0}>Prev</button>
            <button onClick={next} disabled = {index == total -1}>Next</button>
        </div>
    )
}
export default Navigation