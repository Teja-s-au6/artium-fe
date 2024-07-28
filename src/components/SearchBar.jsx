import { useState } from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ handleSearch, suggestions, onSelectSuggestion }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    handleSearch(e);
    setShowSuggestions(true);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.imdbID}
              onMouseDown={() => onSelectSuggestion(suggestion.imdbID)}
            >
              {suggestion.Title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SearchBar;
