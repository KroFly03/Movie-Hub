import styles from "./Menu.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteCookie, getCookie } from "../../utils/cookies";
import { useNavigate } from 'react-router-dom';


export const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }


  const clearCookies = () => {
    setIsOpen(false);
    deleteCookie("AccessToken");
    deleteCookie("RefreshToken");
  }

  return (
    <div className={styles.Menu}>
      <div
        className={styles.Menu__button}
        onClick={toggleMenu}
      >
        <span />
      </div>
      <div
        className={styles.Menu__back}
        onClick={() => navigate(-1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path d="M16.9786 7.26392H4.80856L10.3936 1.67892L8.97856 0.263916L0.978561 8.26392L8.97856 16.2639L10.3936 14.8489L4.80856 9.26392H16.9786V7.26392Z" fill="white"/>
        </svg>
      </div>

      {isOpen &&
        <div className={styles.Menu__panel}>

          <Link
            onClick={toggleMenu}
            className={styles.Menu__link}
            to="/">Главная
          </Link>

          {getCookie("AccessToken") &&
            <Link
              onClick={toggleMenu}
              className={styles.Menu__link}
              to="/profile">
              Профиль
            </Link>}

          {getCookie("AccessToken") &&
          <Link
            onClick={toggleMenu}
            className={styles.Menu__link}
            to="/favorites">
            Избранное
          </Link>}

          {getCookie("AccessToken") &&
            <Link
              onClick={clearCookies}
              className={styles.Menu__link}
              to="/login">
              Выход
            </Link>}

          {!getCookie("AccessToken") &&
            <Link
              onClick={toggleMenu}
              className={styles.Menu__link}
              to="/login">
              Вход
            </Link>}

          {!getCookie("AccessToken") &&
            <Link
              onClick={toggleMenu}
              className={styles.Menu__link}
              to="/register">
              Регистрация
            </Link>}

        </div>
      }
    </div>
  )
};

export default Menu;