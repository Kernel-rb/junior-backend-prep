import { useState } from "react"
import Create from "./Create"

function Home() {
    // setTodos
    const [todos ] = useState([]);
    return (
        <div>
            <h1>Todo List</h1>
            <Create />
            {
                todos.length == 0 ? <p>No todos</p> : <ul>
                    {
                        todos.map((todo, index) => (
                            <li key={index}>{todo}</li>
                        ))
                    }
                </ul>
            }
        </div>
  )
}

export default Home