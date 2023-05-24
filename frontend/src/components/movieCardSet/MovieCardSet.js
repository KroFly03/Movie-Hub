import styles from "./MovieCardSet.module.scss";
import MovieCard from "../movieCard/MovieCard";
import { getYoutubePreview } from "../../utils/utils";

export const MovieCardSet = ({ movies, limit }) => {

  const sortedArray = limit ? movies.slice(0, limit) : movies;

  return (
    <div className={styles.MovieCardSet}>
      {sortedArray.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          img={getYoutubePreview(movie.trailer)}
          title={movie.title}
          rating={movie.rating}
          year={movie.year}
        />
      ))}
    </div>
  )

};

export default MovieCardSet;