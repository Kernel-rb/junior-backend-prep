import { useState, useEffect } from "react";
import axios from "axios";
import { BsCircleFill, BsFillTrash2Fill } from "react-icons/bs";

import Create from "./Create";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/task/all")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/task/update/${id}`);
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, done: !todo.done } : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/task/delete/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <Create />
      {todos.length === 0 ? (
        <p style={{ display: "flex", justifyContent: "center"  , fontSize:100}}>No todos</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => handleEdit(todo._id)}
            >
              <button style={{ marginRight: "10px" }}>
                {todo.done ? <BsCircleFill /> : <BsCircleFill />}
              </button>
              <p
                style={{
                  marginLeft: "10px",
                    marginRight: "10px",
                  fontSize: "30px",
                  textDecoration: todo.done ? "line-through"  : "none",
                }}
              >
                {todo.task}
              </p>
              <button onClick={() => handleDelete(todo._id)}>
                <BsFillTrash2Fill />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
