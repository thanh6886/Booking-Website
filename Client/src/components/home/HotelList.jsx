import { useNavigate } from "react-router-dom";
import styles from "./HotelList.module.css";

// show options hotels
function HotelList({ highestRatingHotels }) {
  const navigate = useNavigate();
  // console.log(highestRatingHotels);

  // navigate to page /detail
  const clickHandler = (hotelId) => {
    navigate("/detail/" + hotelId);
  };

  return (
    <div className={styles.wrap}>
      <h2>Homes guests love</h2>
      <div className={styles.lists}>
        {/* EACH HOTEL IS A CARD */}
        {highestRatingHotels.map((hotel, index) => (
          <div className={styles.list} key={index}>
            <div className={styles.img}>
              <img
                src={hotel.photos[0]}
                alt={hotel.title}
                height="280px"
                width="100%"
              />
            </div>
            <div className={styles.content}>
              <h3
                onClick={() => clickHandler(hotel._id)}
                className={`${styles.name} ${styles.m10}`}
              >
                {hotel.title}
              </h3>
              <p>{hotel.city}</p>
              <p className={styles.m10}>
                <b>Starting from ${hotel.cheapestPrice}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HotelList;
