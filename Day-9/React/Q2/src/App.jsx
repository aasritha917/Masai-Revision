import { useState } from "react";

export default function App() {
  const steps = ["Shipping", "Billing", "Payment", "Review"];
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const validate = () => {
    if (!data[steps[current]]) {
      setErrors({ [steps[current]]: "This field is required" });
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (validate()) setCurrent(current + 1);
  };

  const goToStep = (i) => {
    if (i <= current) setCurrent(i);
  };

  return (
    <div>
      <h2>Wizard Form</h2>

      <div>
        {steps.map((step, i) => (
          <button
            key={step}
            onClick={() => goToStep(i)}
            disabled={i > current}
            style={{ fontWeight: current === i ? "bold" : "normal" }}
          >
            {step}
          </button>
        ))}
      </div>

      <div>
        <h3>{steps[current]}</h3>

        <input
          placeholder={`Enter ${steps[current]} info`}
          value={data[steps[current]] || ""}
          onChange={(e) =>
            setData({ ...data, [steps[current]]: e.target.value })
          }
        />

        {errors[steps[current]] && (
          <p style={{ color: "red" }}>{errors[steps[current]]}</p>
        )}
      </div>

      {current < steps.length - 1 && (
        <button onClick={next}>Next</button>
      )}

      {current === steps.length - 1 && <p>Review Complete</p>}
    </div>
  );
}
