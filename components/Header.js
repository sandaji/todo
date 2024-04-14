import React from "react";
import { MdAddTask } from "react-icons/md";

const Header = () => {
  return (
    <header className="header">
      <MdAddTask className="icon" fill="#9333ea" />
      <h1>Todo</h1>
    </header>
  );
};

export default Header;
