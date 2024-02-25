import React, { useState } from "react";
import styles from "./Form.module.css";

function Form() {
  const [inputValue, setInputValue] = useState("");

  const changeInputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.subscribe}>
      <div></div>
    </div>
  );
}

export default Form;
