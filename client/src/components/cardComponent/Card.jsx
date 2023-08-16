/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./cards.module.css";

const Card = ({id, name, image, summary, healthScore }) => {
  return (
    <div className={styles.span}>
      <div className={styles.cardPrincipal}>
        <div className={styles.cardPrincipal2}>
          <Link to={`/detalles/${id}`}>
            <div className={styles.image_container}>
            <img src={image} alt="Not found" loading="lazy" />
            </div>
          </Link>
            <div className={styles.content}>
              <Link to={`/detalles/${id}`} 
              style={{textDecoration: "none", color: "black"}}
              >
                  <span>{name}</span>
              </Link>
          <p>{summary}</p>
          <span>HealthScore</span>
          <span>{healthScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
