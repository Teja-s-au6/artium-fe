import { Route, Routes } from "react-router-dom";

import "./App.css";
import MovieListPage from "./pages/MovieListPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
