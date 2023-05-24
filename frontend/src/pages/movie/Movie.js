import styles from "./Movie.module.scss";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getMovies, getMovie } from "../../api/movies";
import { getYoutubePreview } from "../../utils/utils";
import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import MovieCardSet from "../../components/movieCardSet/MovieCardSet";
import {deleteFavorites, getFavorites, setFavorites} from "../../api/user";
import {tokenChecker} from "../../utils/token";
import {getCookie} from "../../utils/cookies";

export const Movie = () => {
  const [movies, setMovies] = useState({loading: true, content: []});
  const [movie, setMovie] = useState({loading: true, content: {}});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getFavorites()
      .then(res => {
        if (res.data.find(item => item.id === Number(id))) {
          setIsBookmarked(true);
        }
      })
      .catch(error => {
        console.error(error.response);
      })
  }, [id, isBookmarked]);

  useEffect(() => {
    getMovie(id)
      .then(res => {
        setMovie({loading: false, content: res.data});
      })
      .catch(error => {
        console.log(error.response);
      });

    getMovies()
      .then(res => {
        setMovies({loading: false, content: res.data});
      })
      .catch(error => {
        console.log(error.response);
      });
  }, [id]);

  const toggleBookmark = () => {
    isBookmarked ?
      deleteFavorites(id)
        .then(() => {
          setIsBookmarked(false);
        })
        .catch(error => {
          tokenChecker(error);
          console.error(error.response);
        })
      :
      setFavorites(id)
        .then(() => {
          setIsBookmarked(true);
        })
        .catch(error => {
          tokenChecker(error);
          console.error(error.response);
        })
  };

  return(
    <div className={styles.Movie}>
      <div className={styles.Cover}>
        <div className={styles.Cover__information}>
          <div className={styles.Cover__title}>{movie.content.title}</div>
          <div className={styles.Cover__data}>
            <span>{movie.content.year}</span><span>{movie.content.rating}</span>
          </div>
        </div>
        <div className={styles.Cover__layer} />
        {movie.content.trailer &&
          <img src={getYoutubePreview(movie.content.trailer)} alt="Cover"/>
        }
      </div>

      <div className={styles.Movie__wrapper}>
        <div className={styles.Movie__description}>
          {movie.content.description}
        </div>

        <div className={styles.Movie__actions}>
          {movie.content.trailer &&
            <Button
              label="Смотреть"
              type="dark"
              onClick={() => {
                window.open(movie.content.trailer, "_blank");
              }}
            />
          }
          {getCookie("AccessToken") &&
            <Button
              label={isBookmarked ? "Удалить из избранного" : "Добавить в избранное"}
              type="dark"
              onClick={toggleBookmark}
            />}
        </div>

        <div className={styles.Movie__selection}>
          <Heading label="Похожие фильмы"/>
          <MovieCardSet
            movies={movies.content.filter(item => item.genre_id === movie.content.genre_id)}
            limit={4}
          />
        </div>
      </div>

    </div>
  )
}

export default Movie;