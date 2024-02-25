import React from "react";
import { useContext, useState } from "react";
import SearchDataContext from "../../store/search-data-context";
import styles from "./Cities.module.css";
import { Link } from "react-router-dom";

// show options cities
function Cities({ propsByArea }) {
  const { findHotels } = useContext(SearchDataContext);
  const cities = [
    {
      name: "ha noi",
      props: propsByArea.HN,
      image: "./images/hanoi-3609871_1920.jpg",
    },
    {
      name: "Ho Chi Minh",
      props: propsByArea.HCM,
      image: "./images/sai-gon.jpg",
    },
    {
      name: "Da Nang",
      props: propsByArea.DN,
      image: "./images/da-anng.jpg",
    },
  ];

  return (
    <div className={styles.cities}>
      {cities.map((city) => (
        <div className={styles.city} key={city.name}>
          <div className={styles.img}>
            <img src={city.image} alt={city.name} />
          </div>
          <div className={styles.content}>
            <h1>{city.name}</h1>
            <h3>{city.props} properties</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cities;
