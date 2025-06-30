import ReactDOM from "react-dom";
import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { imageBasePath, fallbackImagePath } from "../../constants/paths";
import { useEffect } from "react";

type MovieModalProps = {
  onClose: () => void;
  movie: Movie;
};

function MovieModal({ onClose, movie }: MovieModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.removeAttribute("style");
    };
  }, [onClose]);

  const modalContent = (
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className={css.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        <img
          src={`${imageBasePath}${movie.backdrop_path}`}
          alt={movie.title}
          className={css.image}
          onError={(e) => {
            e.currentTarget.src = fallbackImagePath(
              500,
              550,
              "No+backdrop+poster"
            );
          }}
        />
        <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default MovieModal;
