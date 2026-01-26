import { useEffect, useState } from "react";
import patientsData from "./data/patients";
import { storageKeys } from "./utils/storageKeys";
import PatientCard from "./components/PatientCard";
import Navigation from "./components/Navigation";
import Timer from "./components/Timer";
import Summary from "./components/Summary";

const SESSION_TIME = 15 * 60;

function App() {
  const [patients, setPatients] = useState(() =>
    JSON.parse(localStorage.getItem(storageKeys.PATIENTS)) || patientsData
  );

  const [index, setIndex] = useState(() =>
    Number(localStorage.getItem(storageKeys.CURRENT_INDEX)) || 0
  );

  const [time, setTime] = useState(() =>
    Number(localStorage.getItem(storageKeys.TIMER)) || SESSION_TIME
  );

  const sessionEnded = time === 0 || patients.every(p => p.status !== "PENDING");

  useEffect(() => {
    if (sessionEnded) return;

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionEnded]);

  useEffect(() => {
    localStorage.setItem(storageKeys.PATIENTS, JSON.stringify(patients));
    localStorage.setItem(storageKeys.CURRENT_INDEX, index);
    localStorage.setItem(storageKeys.TIMER, time);
  }, [patients, index, time]);

  const updateStatus = status => {
    const updated = [...patients];
    updated[index].status = status;
    setPatients(updated);
  };

  return (
    <div className="app">
      <Timer time={time} />

      {sessionEnded ? (
        <Summary patients={patients} />
      ) : (
        <>
          <PatientCard
            patient={patients[index]}
            onUpdate={updateStatus}
            disabled={sessionEnded}
          />

          <Navigation
            index={index}
            total={patients.length}
            next={() => setIndex(i => i + 1)}
            prev={() => setIndex(i => i - 1)}
          />
        </>
      )}
    </div>
  );
}

export default App;
