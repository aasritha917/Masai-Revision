function Alert({ type, message, onClose }) {
  const colors = {
    success: "green",
    error: "red",
    warning: "orange",
    info: "blue"
  };

  return (
    <div style={{ border: `2px solid ${colors[type]}`, margin: "8px", padding: "8px" }}>
      <strong>{type.toUpperCase()}</strong>: {message}
      <button onClick={onClose} style={{ marginLeft: "10px" }}>
      X
      </button>
    </div>
  );
}

export default Alert;
