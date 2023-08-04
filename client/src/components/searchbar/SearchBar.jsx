import styles from "./SearchBar.module.css";
import { IconContext } from "react-icons/lib";
import { BiSearchAlt2 } from "react-icons/bi";
import useSearch from "../../../hooks/useSearch";

const SearchBar = () => {
  const { handleChange, handleSubmit, recipe } = useSearch();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.search}>
          <div className={styles.test}>
            <input
              type="text"
              name="name"
              value={recipe}
              onChange={handleChange}
            />
            <div className={styles.icon}>
              <IconContext.Provider value={{ size: "20px" }}>
                <BiSearchAlt2 />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
