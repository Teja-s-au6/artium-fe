import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieSearch from "../components/SearchBar";
import "../styles/MovieListingPage.css";

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const fetchMovies = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=b9bd48a6&s=marvel&page=${page}`
      );
      if (response.data.Search) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.Search]);
        setTotalResults(response.data.totalResults);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsFetching(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [page, fetchMovies]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearch = useCallback(
    debounce(async (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      if (searchTerm) {
        try {
          const response = await axios.get(
            `https://www.omdbapi.com/?apikey=b9bd48a6&s=${searchTerm}&page=1`
          );
          if (response.data.Search) {
            setSuggestions(response.data.Search);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching search suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );

  const handleSelectSuggestion = (id) => {
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !isFetching &&
        movies.length < totalResults &&
        !searchTerm
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isFetching, movies.length, totalResults, searchTerm]);

  return (
    <div className="home">
      <MovieSearch
        handleSearch={handleSearch}
        suggestions={suggestions}
        onSelectSuggestion={handleSelectSuggestion}
      />
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />
        ))}
      </div>
      <div ref={loaderRef}>{isFetching && "Loading..."}</div>
    </div>
  );
};

export default MovieListPage;
