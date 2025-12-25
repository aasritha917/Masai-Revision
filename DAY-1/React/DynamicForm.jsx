import { useState } from "react";

function DynamicForm() {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", type: "text" }]);
  };

  const updateQuestion = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Survey Builder</h2>

      <button onClick={addQuestion}>Add Question</button>

      {questions.map((q, index) => (
        <div key={index}>
          <input
            placeholder="Question text"
            value={q.text}
            onChange={(e) =>
              updateQuestion(index, "text", e.target.value)
            }
          />

          <select
            value={q.type}
            onChange={(e) =>
              updateQuestion(index, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
          </select>

          <button onClick={() => removeQuestion(index)}>Remove</button>
        </div>
      ))}

      <h3>Live Preview</h3>
      {questions.map((q, index) => (
        <p key={index}>
          {q.text} ({q.type})
        </p>
      ))}
    </div>
  );
}

export default DynamicForm;
