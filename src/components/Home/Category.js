import React, { useState } from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { FaCarrot, FaLayerGroup } from "react-icons/fa";
import "./Model.css";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ItemCard from "./ItemCard";
import { TbMeat } from "react-icons/tb";
import { MdBakeryDining } from "react-icons/md";
import { GiManualJuicer } from "react-icons/gi";
import CartEmpty from "../../emptyCart.jpg";
export default function Category({
  categoryItems,
  allItems,
  setFoodItems,
  selectedCategory
}) {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [selectedItemName, setSelectedItemName] = useState(null);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItemName(null);
    setNewItemName("");
    setNewItemQuantity("");
  };

  const openDeleteModal = (itemName) => {
    setShowModalDelete(true);
    setDeleteItemName(itemName);
  };

  const closeDeleteModal = () => {
    setShowModalDelete(false);
    setDeleteItemName("");
  };

  const handleAddNewItem = () => {
    if (selectedItemName) {
      const updatedItems = allItems.map((item) =>
        item.name === selectedItemName
          ? { ...item, name: newItemName, quantity: newItemQuantity }
          : item
      );
      setFoodItems(updatedItems);
    } else {
      const newItem = {
        name: newItemName,
        quantity: newItemQuantity,
        category: selectedCategory
      };
      setFoodItems([...allItems, newItem]);
    }
    setNewItemName("");
    setNewItemQuantity("");
    closeModal();
  };

  const handleEditItem = (itemName) => {
    const selectedItem = categoryItems.find((item) => item.name === itemName);
    if (selectedItem) {
      setNewItemName(selectedItem.name);
      setNewItemQuantity(selectedItem.quantity);
      setSelectedItemName(itemName);
      openModal();
    }
  };

  const handleDeleteItem = () => {
    const updatedItems = allItems.filter((item) => item.name !== deleteItemName);
    setFoodItems(updatedItems);
    closeDeleteModal();
  };
  const renderIconCategory= (selectedCategory)=>{
     switch (selectedCategory)
     {
      case "Fruit":
        return (<FaCarrot/> );
        case "Meat":
          return (<TbMeat />);
          case "Bakery":
          return (<MdBakeryDining />);
          case "Juice":
            return (<GiManualJuicer />);
        default:
          return ("");
     }
  }

  return (
    <>
      <div className="category-view">
        <div className="container-list">
          <div className="container-add">
            <span className="all-list-title">
              {renderIconCategory()}
              {selectedCategory} Items
              <span className="counter">{categoryItems.length}</span>
            </span>
            {categoryItems.length===0 &&(
              <img src={CartEmpty} alt={CartEmpty} className="emptyList"/>
            )}
            {categoryItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              > { renderIconCategory(selectedCategory) }</ItemCard>
            ))}
          </div>
          <div className="container-all-list">
            <span className="all-list-title">
              <FaLayerGroup />
              ALL Items <span className="counter">{allItems.length}</span>
            </span>
            {allItems.length===0 &&(
              <img src={CartEmpty} alt={CartEmpty} className="emptyList"/>
            )}
            {allItems.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              > {renderIconCategory(item.category)}</ItemCard>
            ))}
          </div>
        </div>
        <div className="add-btn">
          <button className="add-button" onClick={openModal}>
            <RiAddCircleLine /> <span>Add New Item</span>
          </button>
        </div>
      </div>
      <ItemModal
        showModal={showModal}
        closeModal={closeModal}
        selectedItemName={selectedItemName}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newItemQuantity={newItemQuantity}
        setNewItemQuantity={setNewItemQuantity}
        handleAddNewItem={handleAddNewItem}
      />
      <DeleteConfirmationModal
        showModalDelete={showModalDelete}
        closeDeleteModal={closeDeleteModal}
        deleteItemName={deleteItemName}
        handleDeleteItem={handleDeleteItem}
      />
    </>
  );
}
