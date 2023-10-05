import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting todo: ', error);
      });
  };

  return (
    <div className="todo-list">
      <h1>Manish Todo List</h1>
      <table className="todo-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id} className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}>
              <td>{todo.userId}</td>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleDelete(todo.id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default TodoList;
