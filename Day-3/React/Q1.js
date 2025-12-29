import { useState } from "react";

function PasswordValidator() {
  const [password, setPassword] = useState("");

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let borderColor = "red";
  if (score >= 2 && score <= 3) borderColor = "orange";
  if (score === 4) borderColor = "green";

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ border: `2px solid ${borderColor}` }}
        placeholder="Enter password"
      />

      <ul>
        <li>{checks.length ? "✓" : "✗"} Min 8 characters</li>
        <li>{checks.upper ? "✓" : "✗"} Uppercase letter</li>
        <li>{checks.number ? "✓" : "✗"} Number</li>
        <li>{checks.special ? "✓" : "✗"} Special character</li>
      </ul>
    </div>
  );
}

export default PasswordValidator;
