import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
    </div>
  );
};

export default MovieCard;
