import React from "react";
import { FaHome } from "react-icons/fa";
import { FaCarrot } from "react-icons/fa";
import { TbMeat } from "react-icons/tb";
import { MdBakeryDining } from "react-icons/md";
import { GiManualJuicer } from "react-icons/gi";
import "./Sidebar.css";

export default function Sidebar({ handleCategoryClick,selectedCategory }) {
  return (
    <div className="sidebar">
      <nav>
        <ul className="side-nav">
          <li
            className={`side-nav__item ${
              selectedCategory === "home" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("home")}
            >
              <FaHome className="side-nav__icon" />
              <span>Home</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Fruit" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Fruit")}
            >
              <FaCarrot className="side-nav__icon" />
              <span>Fruit</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Meat" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Meat")}
            >
              <TbMeat className="side-nav__icon" />
              <span>Meat</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Bakery" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Bakery")}
            >
              <MdBakeryDining className="side-nav__icon" />
              <span>Bakery</span>
            </p>
          </li>
          <li
            className={`side-nav__item ${
              selectedCategory === "Juice" ? "side-nav__item--active" : ""
            }`}
          >
            <p
              className="side-nav__link"
              onClick={() => handleCategoryClick("Juice")}
            >
              <GiManualJuicer className="side-nav__icon" />
              <span>Juices</span>
            </p>
          </li>
        </ul>
      </nav>
      <div className="legal">&copy; 2024 by group 8. All rights reserved.</div>
    </div>
  );
}
