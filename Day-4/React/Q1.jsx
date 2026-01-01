import { useState } from "react";

const initialTodos = [
  { id: "1", text: "Complete React project", priority: "High", completed: false },
  { id: "2", text: "Review PRs", priority: "Medium", completed: true },
  { id: "3", text: "Update documentation", priority: "Low", completed: false }
];

export default function TodoApp() {
  const [todos, setTodos] = useState(initialTodos);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (!text) return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text, priority, completed: false }
    ]);
    setText("");
  };

  const getColor = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "orange";
    return "green";
  };

  return (
    <div>
      <h2>Todo List</h2>

      <input value={text} onChange={e => setText(e.target.value)} />
      <select value={priority} onChange={e => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {todo.text}
            </span>
            <span style={{ color: getColor(todo.priority), marginLeft: "10px" }}>
              {todo.priority}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
