// TodoForm.js
import React, { useRef, useContext, useState } from 'react';
import { TodoContext } from '../TodoProvider/TodoContext';

export default function TodoForm() {
  const { dispatch } = useContext(TodoContext);
  const inputRef = useRef();
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
    setErrorMessage(''); // Clear any previous error message
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todoText = inputRef.current.value.trim(); // Trim leading/trailing spaces

    if (!todoText) {
      setErrorMessage(alert('Please enter a task to add.'));
      return; // Don't proceed if the todo is empty
    }
    const newTodo = {
      id: Date.now(),
      text: inputRef.current.value,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
    inputRef.current.value = '';
    setErrorMessage(''); 
  };

  return (
    <form className="flex justify-center items-center mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        ref={inputRef}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded-lg w-72 mr-2"
        placeholder="Add a new todo"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-700">
        Add Todo
      </button>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  );
}
