import React from "react";
import styles from "./NavbarItem.module.css";
import { Link } from "react-router-dom";

function NavbarItem(props) {
  return (
    <>
      {props.list.map((option, index) => (
        <Link
          key={index}
          className={`${styles.item} ${option.active && styles.active}`}
        >
          <i className={`fa ${option.icon}`}></i>
          {option.type}
        </Link>
      ))}
    </>
  );
}

export default NavbarItem;
