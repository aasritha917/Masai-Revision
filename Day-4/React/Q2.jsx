import { useState } from "react";

const initialTasks = ["Task One", "Task Two", "Task Three", "Task Four"];

export function ReorderList() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveUp = (index) => {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] =
      [newTasks[index], newTasks[index - 1]];
    setTasks(newTasks);
  };

  const moveDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index], newTasks[index + 1]] =
      [newTasks[index + 1], newTasks[index]];
    setTasks(newTasks);
  };

  return (
    <div>
      <h2>Reorder Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={task}>
            {index + 1}. {task}
            <button disabled={index === 0} onClick={() => moveUp(index)}>
              ↑
            </button>
            <button
              disabled={index === tasks.length - 1}
              onClick={() => moveDown(index)}
            >
              ↓
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
