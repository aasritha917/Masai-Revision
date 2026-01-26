const Timer = ({
    time
}) =>{
    const minutes = Math.floor(time/60)
    const seconds = time % 60
    return(
        <h2>
            Session Time : {minutes} : {seconds.toString().padStart(2,"0")}
        </h2>
    )
}
export default Timer