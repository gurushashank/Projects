// Author : Jaahnvi Hehar
//This component is the navigation bar
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Topbar toggle={toggle} />
    </div>
  );
}

export default Navbar;
