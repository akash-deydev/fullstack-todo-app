import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const todayDate = new Date();

  const AddTask = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3002/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    setTask("");
  };

  const getAllTasksFromDB = async () => {
    try {
      const res = await fetch("http://localhost:3002/");
      const data = await res.json();

      setTodo(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3002/${id}`, {
      method: "delete",
    });
    getAllTasksFromDB();
  };

  useEffect(() => {
    getAllTasksFromDB();
  }, [task]);

  return (
    <div id="container">
      <h1>Todo App</h1>
      <div id="input-container">
        <input
          type="text"
          value={task}
          placeholder="Add a task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={AddTask}>Add</button>
      </div>
      {error ? <span id="error">{error}</span> : <></>}

      <div>
        {todo.map((todo) => {
          return (
            <div className="task-container" key={todo._id}>
              <div>{todo.task}</div>
              <div>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
