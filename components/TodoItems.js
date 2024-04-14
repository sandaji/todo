import React, { useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export const Item = ({ item,todos, setTodos }) => {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
    // Update localStorage after marking todo as completed
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  };
  const handleInputChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };
  const handleEdit = () => {
    setEditing(true);
  };
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);
  const handleInpuSubmit = (event) => {
    event.preventDefault();

    // Update localStorage after editing todo
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };
  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
    // Update localStorage after deleting todo
    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  };
  return (
    <li id={item?.id} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            <AiOutlineFileDone
              fill={item.is_completed ? "#22c55e" : "#cbd5e1"}
            />
            <p
              style={
                item.is_completed ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.title}
            </p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <FaRegEdit />
            </button>
            <button onClick={handleDelete}>
              <span className="visually-hidden">Delete</span>
              <AiFillDelete />
            </button>
          </div>
        </>
      )}
    </li>
  );
};
