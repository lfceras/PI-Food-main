import styles from "./paginado.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import usePaginado from "../../../hooks/usePaginado";

const Paginado = () => {
  const {
    recipesPerPage,
    recipes,
    paginado,
    currentPage,
    maxPageLimit,
    minPageLimit,
    onPrevClick,
    onNextClick,
  } = usePaginado();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    paginado(Number(e.target.id));
  };
  // console.log(pageNumbers);

  const pageRecipes = pageNumbers.map((pageNum) => {
    if (pageNum <= maxPageLimit && pageNum > minPageLimit) {
      return (
        <li
          key={pageNum}
          id={pageNum}
          onClick={handlePageClick}
          className={currentPage === pageNum ? "active" : null}
        >
          {pageNum}
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      <div  className={styles.paginadoss}>
        <ul>
          <button
            className={styles.bton}
            onClick={handlePrevClick}
            disabled={currentPage === pageNumbers[0]}
          >
            <FaChevronLeft />
          </button>
          {pageRecipes}
          <button
            className={styles.bton}
            onClick={handleNextClick}
            disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
          >
            <FaChevronRight />
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Paginado;
