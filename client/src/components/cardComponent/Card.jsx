/* eslint-disable react/prop-types */
import styles from "./cards.module.css";

const Card = ({name, image, summary, healthScore }) => {
  return (
    <div className={styles.span}>
      <div className={styles.cardPrincipal}>
        <div className={styles.cardPrincipal2}>
          <img src={image} alt="Not found" />
          <span>{name}</span>
          <p>{summary}</p>
          <span>HealthScore</span>
          <span>{healthScore}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
