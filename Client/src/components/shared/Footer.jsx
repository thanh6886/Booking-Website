import React from "react";
import styles from "./Footer.module.css";
import Form from "./Form";

function Footer() {
  return (
    <footer>
      <Form />
      <div className={styles["more-options"]}>
        <div className={styles["wrap-options"]}>
          <ul className={styles.list}>
            <li>
              <a href="/#">Countries</a>
            </li>
            <li>
              <a href="/#">Regions</a>
            </li>
            <li>
              <a href="/#">Cities</a>
            </li>
            <li>
              <a href="/#">Districts</a>
            </li>
            <li>
              <a href="/#">Airports</a>
            </li>
            <li>
              <a href="/#">Hotels</a>
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              <a href="/#">Homes</a>
            </li>
            <li>
              <a href="/#">Apartments</a>
            </li>
            <li>
              <a href="/#">Resorts</a>
            </li>
            <li>
              <a href="/#">Villas</a>
            </li>
            <li>
              <a href="/#">Hostels</a>
            </li>
            <li>
              <a href="/#">Guest houses</a>
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              <a href="/#">Unique places to stay</a>
            </li>
            <li>
              <a href="/#">Reviews</a>
            </li>
            <li>
              <a href="/#">Unpacked: Travel articles</a>
            </li>
            <li>
              <a href="/#">Travel Communities</a>
            </li>
            <li>
              <a href="/#">Seasonal and holiday deals</a>
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              <a href="/#">Car rental</a>
            </li>
            <li>
              <a href="/#">Flight Finder</a>
            </li>
            <li>
              <a href="/#">Restaurant reservations</a>
            </li>
            <li>
              <a href="/#">Travel Agents</a>
            </li>
          </ul>
          <ul className={styles.list}>
            <li>
              <a href="/#">Customer Service</a>
            </li>
            <li>
              <a href="/#">Partner Help</a>
            </li>
            <li>
              <a href="/#">Careers</a>
            </li>
            <li>
              <a href="/#">Sustainability</a>
            </li>
            <li>
              <a href="/#">Press center</a>
            </li>
            <li>
              <a href="/#">Safety Resource Center</a>
            </li>
            <li>
              <a href="/#">Investor relations</a>
            </li>
            <li>
              <a href="/#">Terms & conditions</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
