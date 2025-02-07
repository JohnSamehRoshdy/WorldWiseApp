import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../Contexts/CitiesContext";
import Spinner from "./Spinner";
import Button from "./Button";

////////////////////////////////////////////////////////////////////////////////////////////

const flagemojiToPNG = (flag = "") => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return `https://flagcdn.com/24x18/${countryCode}.png`;
};

// const flagemojiToPNG = (flag = "") => {
//   var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
//     ?.map((char) => String.fromCharCode(char - 127397).toLowerCase())
//     .join("");
//   return (
//     <img
//       src={`https://flagcdn.com/24x18/${countryCodeToFlag(countryCode)}.png`}
//       alt="flag"
//     />
//   );
// };

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
////////////////////////////////////////////////////////////////////////////////////////////////
function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const navigate = useNavigate();
  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { cityName, emoji, date, notes } = currentCity;

  const FlagImage = ({ flagEmoji }) => {
    const imageUrl = flagemojiToPNG(flagEmoji);

    return <img src={imageUrl} alt="flag" />;
  };

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span style={{ fontSize: "24px" }}>
            <FlagImage flagEmoji={emoji} />
          </span>{" "}
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        {" "}
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

export default City;
