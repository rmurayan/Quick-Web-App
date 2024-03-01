import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";

export default function ItemCard({ item, handleEditItem, handleDeleteItem,children,categoryFlag}) {
  return (
    <div className="item-card">
      <div className="item-info">
        <span className="item-details">
          <IoMdArrowDropright />
          Item: {item.name}
        </span>
        <span className="item-details">
          <IoMdArrowDropright />
          Qty: {item.quantity}
        </span>
      </div>
      {!categoryFlag && (
        <span className="category-name">
          {children}
          {item.category}
        </span>
      )}
      <div className="item-btn">
        <FaEdit
          className="item-btn-icon"
          onClick={() => handleEditItem(item.name)}
        />
        <MdDelete
          className="item-btn-icon"
          onClick={() => handleDeleteItem(item.name)}
        />
      </div>
    </div>
  );
}
