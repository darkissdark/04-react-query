import { useEffect, useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie, MovieResponse } from "../../types/movie";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery.trim());
    setPage(1);
  }, []);

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const { data, isLoading, isError } = useQuery<MovieResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
  });

  const { results: movies = [], total_pages: totalPages = 1 } = data || {};
  const selectedMovie = movies.find(
    (movie: Movie) => movie.id === selectedMovieId
  );

  useEffect(() => {
    if (data) {
      if (!data.results.length) {
        toast("No movies found for your request.");
      }
    }
  }, [data]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {!isLoading && isError && <ErrorMessage />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid data={movies} onSelect={setSelectedMovieId} />
      )}
      {totalPages > 1 && !isLoading && !isError && (
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
