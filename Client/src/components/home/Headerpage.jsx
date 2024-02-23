import React from "react";
import { Link } from "react-router-dom";
import url from "../../utils/url";
import styles from "./Headerpage.module.css";

export default function () {
  return (
    <div className={styles.page}>
      <Link to={url.home}>HOME</Link>
    </div>
  );
}
