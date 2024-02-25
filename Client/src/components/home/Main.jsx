import { useEffect, useState } from "react";
import Cities from "./Cities";
import HotelList from "./HotelList";
import styles from "./Main.module.css";
import Types from "./Types";
import url from "../../utils/url";

function Main() {
  const [propsByArea, setPropsByArea] = useState({ HN: 0, HCM: 0, DN: 0 });
  const [propsByType, setPropsByType] = useState({
    hotel: 0,
    apartment: 0,
    resort: 0,
    villa: 0,
    cabin: 0,
  });
  const [highestRatingHotels, setHighestRatingHotels] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url.root + "/homepage");
        if (!res.ok) {
          throw new Error("Fetch failed.");
        }
        const data = await res.json();
        console.log(data);
        setPropsByArea(data.propsByArea);
        setPropsByType(data.propsByType);
        setHighestRatingHotels(data.highestRatingHotels);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Cities propsByArea={propsByArea} />
      <Types propsByType={propsByType} />
      <HotelList highestRatingHotels={highestRatingHotels} />
    </div>
  );
}

export default Main;
