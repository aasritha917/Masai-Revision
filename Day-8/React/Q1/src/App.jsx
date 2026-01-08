import { useRef, useState } from "react";

export default function App() {
  const inputsRef = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const clearOTP = () => {
    setOtp(Array(6).fill(""));
    inputsRef.current[0].focus();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "8px" }}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            style={{ width: 40, height: 40, textAlign: "center" }}
          />
        ))}
      </div>

      <p>{otp.join("")}</p>
      <button onClick={clearOTP}>Clear</button>
    </div>
  );
}
