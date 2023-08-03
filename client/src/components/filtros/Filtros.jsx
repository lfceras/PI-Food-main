import styles from "./filtros.module.css";

const Filtros = () => {
  return (
    <div>
      <div className={styles.c_principal}>
        <div className={styles.c_principalE}>
          <span> Filtros</span>
          <input type="range" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default Filtros;
