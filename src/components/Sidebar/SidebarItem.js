import React from "react";
import "./SidebarItems.css";

function SidebarItem({ name, completed, active }) {
  return (
    <li
      className={`sidebar-item ${active ? "active" : completed ? "" : "inactive"}`}
    >
      {active && <span className="sidebar-item-left-line">{""}</span>}
      <span className="sidebar-item-name">{name}</span>
      {completed && <div className="check-icon"></div>}
    </li>
  );
}

export default SidebarItem;
