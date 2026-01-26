const PatientCard = ({
    patient, onUpdate, disabled
}) =>{
    return(
        <div className="card">
            <h3>{patient.name}</h3>
            <p>Age:{patient.age}</p>
            <p>Problem:{patient.problem}</p>
            <p>Doctor:{patient.doctor}</p>

            <button disabled={disabled || patient.status !== "PENDING"} 
            onClick={() => onUpdate("TREATED")}>
                Treated
            </button>

            <button disabled={disabled || patient.status !== "PENDING"} 
            onClick={() => onUpdate("NOT_TREATED")}>
                Not Treated
            </button>

            <p> Status: {patient.status} </p>
        </div>
    )
}

export default PatientCard