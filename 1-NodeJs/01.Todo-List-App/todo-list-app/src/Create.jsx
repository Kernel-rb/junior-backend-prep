import { useState } from "react";
import axios from "axios";

function Create() {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    axios
      .post("http://localhost:3001/api/task/add", { task: task })
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        name=""
        id=""
        style={{
          padding: "10px",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "200px",
        }}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="button"
        onClick={handleAdd}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </div>
  );
}

export default Create;
