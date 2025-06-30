import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { imageBasePath, fallbackImagePath } from "../../constants/paths";

type MovieGridProps = {
  data: Movie[];
  onSelect: (movieId: number) => void;
};

function MovieGrid({ data, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {data.map((movie) => (
        <li key={movie.id}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`${imageBasePath}${movie.poster_path}`}
              alt={movie.title}
              loading="lazy"
              onClick={() => {
                onSelect(movie.id);
              }}
              onError={(e) => {
                e.currentTarget.src = fallbackImagePath(
                  500,
                  750,
                  "No+poster+image"
                );
              }}
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
