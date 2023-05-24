import styles from "./List.module.scss";
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { getGenre } from "../../api/genres";
import { getDirector } from "../../api/directors";
import { getFavorites } from "../../api/user";
import Header from "../../components/header/Header";
import Loader from "../../components/loader/Loader";
import MovieCardSet from "../../components/movieCardSet/MovieCardSet";
import {getMovies} from "../../api/movies";

export const List = ({ title, type }) => {
  const { id } = useParams();
  const [state, setState] = useState({loading: true, content: []});
  const [movies, setMovies] = useState({loading: true, content: []});

  useEffect(() => {
    switch (type) {
      case "genre":
        (async () => {
          const { data } = await getGenre(id);
          setState({loading: false, content: data})
        })();
        (async () => {
          const { data } = await getMovies();
          setMovies({loading: false, content: data.filter(movie => movie.genre_id === Number(id))});
        })();
        break;

      case "director":
        (async () => {
          const { data } = await getDirector(id);
          setState({loading: false, content: data});
        })();
        (async () => {
          const { data } = await getMovies();
          setMovies({loading: false, content: data.filter(movie => movie.director_id === Number(id))});
        })();
        break;

      case "favorites":
        (async () => {
          const { data } = await getFavorites();
          setMovies({loading: false, content: data});
        })();
        break;

      default:
        break;

    }
  }, [id, type]);

  return (
    <div className={styles.List}>
      <Header
        title={`${title}${state.content.name ? ": " + state.content.name : ""}`}
        subtitle="MovieHub"
        type="secondary"
      />

      <div className={styles.List__cards}>
        {movies.loading && <Loader />}
        {movies.content.length > 0 &&
          <MovieCardSet movies={movies.content} />
        }
      </div>
    </div>
  )
};

export default List;