import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/MovieDetailPage.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=b9bd48a6&i=${id}`
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="movie-detail">
      {movie ? (
        <>
          <div className="movie-poster">
            <img src={movie?.Poster} alt={movie?.Title} />
          </div>
          <div>
            <h2 className="movie-title">
              {movie?.Title} ({movie?.Year})
            </h2>
            <div className="movie-attributes">
              <div className="attribute">
                <strong>Genre</strong>
                <p>{movie?.Genre}</p>
              </div>
              <div className="attribute">
                <strong>Running Time</strong>
                <p>{movie?.Runtime}</p>
              </div>
              <div className="attribute">
                <strong>Rating</strong>
                <p>{movie?.imdbRating}/10</p>
              </div>
            </div>
            <div className="movie-plot">
              <strong>Plot</strong>
              <p>{movie?.Plot}</p>
            </div>
            <div className="movie-actors">
              <strong>Actors</strong>
              <p>{movie?.Actors}</p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MovieDetailPage;
