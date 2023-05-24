import styles from "./Homepage.module.scss"
import Header from "../../components/header/Header";
import Heading from "../../components/heading/Heading";
import { useEffect, useState } from "react";
import { getGenres } from "../../api/genres";
import { getMovies } from "../../api/movies";
import { getDirectors } from "../../api/directors";
import MovieCardSet from "../../components/movieCardSet/MovieCardSet";
import Tag from "../../components/tag/Tag";
import Loader from "../../components/loader/Loader";

export const Homepage = () => {
  const [genres, setGenres] = useState({loading: true, content: []});
  const [movies, setMovies] = useState({loading: true, content: []});
  const [directors, setDirectors] = useState({loading: true, content: []})

  useEffect(() => {
    (async () => {
      const { data } = await getGenres();
      setGenres({loading: false, content: data});
    })();

    (async () => {
      const { data } = await getMovies("status=new");
      setMovies({loading: false, content: data});
    })();

    (async () => {
      const { data } = await getDirectors();
      setDirectors({loading: false, content: data});
    })();
  }, []);

  return (
    <div className={styles.Homepage}>
      <Header
        title="MovieHub"
        subtitle="Movie information service"
      />

      <div className={styles.Homepage__movieSet}>
        <Heading label="Новинки"/>
        {movies.loading && <Loader />}
        <MovieCardSet
          movies={movies.content}
          limit={4}
        />
      </div>

      <div className={styles.Homepage__tagSet}>
        <Heading label="Жанры"/>
        {genres.loading && <Loader />}
        {genres.content.map(genre => (
          <Tag
            key={genre.id}
            id={genre.id}
            label={genre.name}
            type="genre"
          />
        ))}
      </div>

      <div className={styles.Homepage__tagSet}>
        <Heading label="Режиссёры"/>
        {directors.loading && <Loader />}
        {directors.content.map(genre => (
          <Tag
            key={genre.id}
            id={genre.id}
            label={genre.name}
            type="director"
          />
        ))}
      </div>
    </div>
  )
}