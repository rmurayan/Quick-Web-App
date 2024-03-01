import React, { useState } from "react";

import { FaCarrot } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { MdBakeryDining } from "react-icons/md";
import { GiManualJuicer } from "react-icons/gi";
import ItemCard from "./ItemCard";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function Home({ items, setItem }) {
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
      const updatedItems = items.map((item) =>
        item.name === selectedItemName
          ? { ...item, name: newItemName, quantity: newItemQuantity }
          : item
      );
      setItem(updatedItems);
    } 
    setNewItemName("");
    setNewItemQuantity("");
    closeModal();
  };


  const handleEditItem = (itemName) => {
    const selectedItem = items.find((item) => item.name === itemName);
    if (selectedItem) {
      setNewItemName(selectedItem.name);
      setNewItemQuantity(selectedItem.quantity);
      setSelectedItemName(itemName);
      openModal();
    }
  };

  const handleDeleteItem = () => {
    const updatedItems = items.filter((item) => item.name !== deleteItemName);
    setItem(updatedItems);
    closeDeleteModal();
  };
  const getCategoryTotal = (category) => {
    return items.reduce((total, item) => {
      if (item.category === category) {
        return total + 1;
      }
      return total;
    }, 0);
  };
  const renderIconCategory = (selectedCategory) => {
    switch (selectedCategory) {
      case "Fruit":
        return <FaCarrot />;
      case "Meat":
        return <TbMeat />;
      case "Bakery":
        return <MdBakeryDining />;
      case "Juice":
        return <GiManualJuicer />;
      default:
        return "";
    }
  };
  return (
    <>
    <div className="category-view">
      <div className="category-section">
        <span className="category-title">
          <FaCarrot />
          Fruit <span className="counter">{getCategoryTotal("Fruit")}</span>
        </span>
        {items.map(
          (item, index) =>
            item.category === "Fruit" && (
              <ItemCard
                key={index}
                item={item}
                categoryFlag={true}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              >
              </ItemCard>
            )
        )}
      </div>
      <div className="category-section">
        <span className="category-title">
          <TbMeat />
          Meat <span className="counter">{getCategoryTotal("Meat")}</span>
        </span>
        {items.map(
          (item, index) =>
            item.category === "Meat" && (
              <ItemCard
                key={index}
                item={item}
                categoryFlag={true}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              >
                {renderIconCategory(item.category)}
              </ItemCard>
            )
        )}
      </div>
      <div className="category-section">
        <span className="category-title">
          <GiManualJuicer />
          Juices <span className="counter">{getCategoryTotal("Juice")}</span>
        </span>
        {items.map(
          (item, index) =>
            item.category === "Juice" && (
              <ItemCard
                key={index}
                item={item}
                categoryFlag={true}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              >
                {renderIconCategory(item.category)}
              </ItemCard>
            )
        )}
      </div>
      <div className="category-section">
        <span className="category-title">
          <MdBakeryDining />
          Barkery <span className="counter">{getCategoryTotal("Bakery")}</span>
        </span>
        {items.map(
          (item, index) =>
            item.category === "Bakery" && (
              <ItemCard
                key={index}
                item={item}
                categoryFlag={true}
                handleEditItem={handleEditItem}
                handleDeleteItem={openDeleteModal}
              >
                {renderIconCategory(item.category)}
              </ItemCard>
            )
        )}
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
