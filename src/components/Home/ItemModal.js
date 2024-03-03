// ItemModal.js
import React from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { GrUpdate } from "react-icons/gr";

export default function ItemModal({
  showModal,
  closeModal,
  selectedItemName,
  newItemName,
  setNewItemName,
  newItemQuantity,
  setNewItemQuantity,
  handleAddNewItem,
}) {
  return (
    <>
      {showModal && (
        <div className="modal-visible">
          <div className="modal-content">
            <div className="close-btn-wrapper">
              <IoMdCloseCircle
                size={30}
                color={"#508D69"}
                name="times"
                className="close-btn"
                onClick={closeModal}
              />
            </div>
            <h2 className="modal-title">
              {selectedItemName ? "Edit Item" : "Add New Item"}
            </h2>
            <div className="form-field">
              <label className="text-label">Item Name</label>
              <input
                type="text"
                className="text-input"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="text-label">Quantity:</label>
              <input
                type="number"
                className="text-input"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
              />
            </div>
            <div className="modal-btn">
              <button className="done-btn" onClick={handleAddNewItem}>
                {selectedItemName ? (
                  <>
                    <GrUpdate />
                    Update
                  </>
                ) : (
                  <>
                    <RiAddCircleLine />
                    Add
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
