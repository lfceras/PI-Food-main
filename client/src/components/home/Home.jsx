import Card from "../cardComponent/Card";
import Carrousel from "../carrousel1/Carrousel";
import styles from "./home.module.css";
import Paginado from "../paginado/Paginado";
import usePaginado from "../../../hooks/usePaginado";
import NavBar from "../navbar/NavBar";
import Loading from "../loading/Loading";
import Footer from "../footer/Footer";

const Home = () => {
  const {
    currentPage,
    currentRecipes,
    maxPageLimit,
    minPageLimit,
    onNextClick,
    onPrevClick,
    paginado,
    recipes,
    pageNumberLimit,
    recipesPerPage,
    loading,
  } = usePaginado();
   
    return (
      <>
        <NavBar />
        <div className={styles.testing}>
          <div className={styles.homes}>
            <Carrousel />
          </div>
  
            <h1>LISTA DE RECETAS</h1>
          <div className={styles.homes2}>
            {loading ? (
              <Loading />
            ) : (
              currentRecipes &&
              currentRecipes?.map((el) => (
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
              ))
            )}
          </div>
  
          <div className={styles.paginadoes}>
            <Paginado
              recipes={recipes.length}
              currentPage={currentPage}
              maxPageLimit={maxPageLimit}
              minPageLimit={minPageLimit}
              onNextClick={onNextClick}
              onPrevClick={onPrevClick}
              paginado={paginado}
              pageNumberLimit={pageNumberLimit}
              recipesPerPage={recipesPerPage}
            />
          </div>
        </div>
        <Footer/>
      </>
    );

  }

export default Home;
