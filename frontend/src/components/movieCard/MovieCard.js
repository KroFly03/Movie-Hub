import styles from "./MovieCard.module.scss";
import {Link} from "react-router-dom";

export const MovieCard = ({ id, img, title, rating, year }) => {

  return (
    <Link
      className={styles.MovieCard}
      to={"/movie/" + id}
    >
      <div className={styles.MovieCard__image}>
        <img src={img} alt="Movie Poster"/>
      </div>
      <div className={styles.MovieCard__title}>{title}</div>
      <div className={styles.MovieCard__additional}>
        <p className={styles.MovieCard__rating}>{rating}</p>
        <p className={styles.MovieCard__year}>{year}</p>
      </div>
    </Link>
  )
}

export default MovieCard;