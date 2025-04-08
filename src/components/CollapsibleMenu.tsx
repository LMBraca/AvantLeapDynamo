import React, { useState } from "react";
import "../styles/CollapsibleMenu.css";

interface MenuItem {
  node: string;
  description?: string;
  input?: string;
  output?: string;
  nodes?: MenuItem[];
}

interface CollapsibleMenuProps {
  data: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  data,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    onSelect(item);
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.nodes && data.nodes.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="menu-item">
      <div
        className="menu-header"
        onClick={(e) => {
          handleClick(e, data);
          toggleOpen(e);
        }}
      >
        <span className="menu-icon">
          {data.nodes && data.nodes.length > 0 && (isOpen ? "▼" : "▶")}
        </span>
        <span className="menu-name">{data.node}</span>
      </div>
      {isOpen && data.nodes && data.nodes.length > 0 && (
        <div className="menu-children">
          {data.nodes.map((child, index) => (
            <CollapsibleMenu key={index} data={child} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleMenu;
