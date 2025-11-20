import React from "react";
import "./Sidebar.css";
import SidebarItem from "./SidebarItem";

function Sidebar({ items }) {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        {items.map((item) => (
          <SidebarItem
            key={item.name}
            name={item.name}
            completed={item.completed}
            active={item.active || false}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
