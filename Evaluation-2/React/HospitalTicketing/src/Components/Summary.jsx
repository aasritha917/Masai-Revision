const Summary = ({
    patients
}) =>{
    const treated = patients.filter(p =>p.status == "TREATED").length
    const notTreated = patients.filter(p =>p.status == "NOT_TREATED").length
    const pending = patients.filter(p =>p.status == "PENDING").length

    return(
        <div className="summary">
            <h2>Session Summmary</h2>
            <p>Total Patients : {patients.length}</p>
            <p>Treated : {treated}</p>
            <p>Not Treated : {notTreated}</p>
            <p>Pending : {pending}</p>
        </div>
    )
}
export default Summary