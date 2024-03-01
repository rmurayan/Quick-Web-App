import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "../Sidebar/Sidebar";
import Home from "./Home";
import { useLocation } from "react-router-dom";
import Category from "./Category";
import { firestore } from "../../DB/database";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";

export default function Main() {
  const [foodItems, setFoodItems] = useState([]);
  const location = useLocation();
  const userInfo = location.state?.userInfo;
  const userUid = userInfo.userUid;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodItemsCollection = collection(
          firestore,
          "users",
          userUid,
          "foodItems"
        );
        const querySnapshot = await getDocs(foodItemsCollection);

        // Extract the items array from the data
        const data = querySnapshot.docs.map((doc) => doc.data().items);

        // Parse the items array
        const foodItemsArray = data.map((item) => JSON.parse(item));

        // Flatten the array of arrays into a single array
        const flattenedFoodItems = foodItemsArray.flat();

        // Set the food items state
        setFoodItems(flattenedFoodItems);
      } catch (error) {
        console.error("Error fetching food items from Firestore: ", error);
        // Handle error fetching data
      }
    };
    fetchData();
  });

  const [syncMessageModal, setSyncMessageModal] = useState("");
  const handelSyncList = async () => {
    try {
      const foodItemsCollection = collection(
        firestore,
        "users",
        userUid,
        "foodItems"
      );
      const querySnapshot = await getDocs(foodItemsCollection);

      // Check if food items data already exists in Firebase
      if (querySnapshot.empty) {
        // If data doesn't exist, add a new document
        const itemsJSON = JSON.stringify(foodItems);
        await addDoc(foodItemsCollection, { items: itemsJSON });
      } else {
        // If data exists, update the existing document
        const docId = querySnapshot.docs[0].id; // Assuming there's only one document
        const itemsJSON = JSON.stringify(foodItems);
        await setDoc(doc(foodItemsCollection, docId), { items: itemsJSON });
      }
      setSyncMessageModal(
        "Your grocery list items are now available on your mobile application after being synced to the cloud."
      );
    } catch (error) {
      setSyncMessageModal("Error saving food items to Firestore");
    }
  };

  const sortedFoodItems = [...foodItems].sort((a, b) => {
    // Compare category strings
    if (a.category < b.category) {
      return -1; // a should come before b
    }
    if (a.category > b.category) {
      return 1; // a should come after b
    }
    return 0; // categories are equal
  });
  const copyFoodItemList = () => {
    return sortedFoodItems.map(item => `${item.name}: ${item.quantity}`).join("\n");
  };
  const [selectedCategory, setSelectedCategory] = useState("home");
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  // Function to return a list of items for a specific category
  const getItemsByCategory = (category) => {
    return foodItems.filter((item) => item.category === category);
  };

  const renderCategory = () => {
    switch (selectedCategory) {
      case "Fruit":
        return (
          <Category
            categoryItems={getItemsByCategory("Fruit")}
            setFoodItems={setFoodItems}
            allItems={sortedFoodItems}
            selectedCategory={selectedCategory}
          />
        );
      case "Juice":
        return (
          <Category
            categoryItems={getItemsByCategory("Juice")}
            allItems={sortedFoodItems}
            setFoodItems={setFoodItems}
            selectedCategory={selectedCategory}
          />
        );
      case "Meat":
        return (
          <Category
            categoryItems={getItemsByCategory("Meat")}
            allItems={sortedFoodItems}
            setFoodItems={setFoodItems}
            selectedCategory={selectedCategory}
          />
        );

      case "Bakery":
        return (
          <Category
            categoryItems={getItemsByCategory("Bakery")}
            allItems={sortedFoodItems}
            setFoodItems={setFoodItems}
            selectedCategory={selectedCategory}
          />
        );
      default:
        return <Home items={foodItems} setItem={setFoodItems} />;
    }
  };
  return (
    <div className="main-container">
      <Header
        userEmail={userInfo.userEmail}
        totalItems={foodItems.length}
        syncMessageModal={syncMessageModal}
        foodItems = {copyFoodItemList()}
        handelSyncList={handelSyncList}
      />
      <div className="content">
        <Sidebar
          handleCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
        />
        {renderCategory()}
      </div>
    </div>
  );
}
