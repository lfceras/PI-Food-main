import Card from "../cardComponent/Card";
import Carrousel from "../carrousel1/Carrousel";
import styles from "./home.module.css";
import useRecipes from "../../../hooks/useRecipes";

const Home = () => {
  const { recipes } = useRecipes();

  return (
    <>
      <div className={styles.testing}>
        <div className={styles.homes}>
          <Carrousel />
        </div>

        <div className={styles.homes2}>
          {recipes.map((el) => (
            <Card
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              summary={el.summary}
              diets={el.diets}
              steps={el.steps}
              healthScore={el.healthScore}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
