import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery.trim());
    setPage(1);
  }, []);

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  useEffect(() => {
    if (!query) return;

    const loadMovies = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchMovies(query, page);

        if (!data.results.length) {
          toast("No movies found for your request.");
        }

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError(true);
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [query, page]);

  const selectedMovie = movies.find((movie) => movie.id === selectedMovieId);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid data={movies} onSelect={setSelectedMovieId} />
      )}
      {totalPages > 1 && !loading && !error && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {selectedMovieId && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster />
    </div>
  );
};

export default App;
