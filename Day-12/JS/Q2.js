const tasks = [
  { id: 1, text: 'Complete project proposal' },
  { id: 2, text: 'Review code submissions' },
  { id: 3, text: 'Update documentation' },
  { id: 4, text: 'Team meeting' }
];

const list = document.getElementById("tasks");
let draggedIndex = null;

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.draggable = true;

    li.addEventListener("dragstart", () => draggedIndex = index);
    li.addEventListener("dragover", e => e.preventDefault());
    li.addEventListener("drop", () => reorder(index));

    list.appendChild(li);
  });
}

function reorder(dropIndex) {
  const [moved] = tasks.splice(draggedIndex, 1);
  tasks.splice(dropIndex, 0, moved);
  renderTasks();
}

renderTasks();
