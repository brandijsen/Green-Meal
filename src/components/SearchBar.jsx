import { useState, useEffect, useRef } from "react";
import { getVegetarianRecipes } from "../services/apiServices";
import { useNavigate, useLocation } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  // Initialize state variables
  const [query, setQuery] = useState(""); 
  const [suggestions, setSuggestions] = useState([]); 
  const [fullResults, setFullResults] = useState([]); 

  // Initialize navigation and location hooks
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const suggestionsRef = useRef(null); 

  // Reset the query when location changes
  useEffect(() => {
    setQuery(""); 
  }, [location]); 

  // Handle the API call with debounce when query changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) { 
        const data = await getVegetarianRecipes(query); 
        setFullResults(data?.results || []); 
        setSuggestions(
          data?.results
            ?.slice(0, 5) 
            ?.map((recipe) => ({
              id: recipe.id,
              title: recipe.title,
              image: recipe.image,
            })) || []
        );
      } else {
        setSuggestions([]); 
        setFullResults([]); 
      }
    }, 500); 
    return () => clearTimeout(delayDebounceFn); 
  }, [query]); 

  // Handle clicks outside of the suggestions container to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setSuggestions([]); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside); 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, []); 

  // Update query state when the user types in the input
  const handleInputChange = (e) => setQuery(e.target.value); 

  // Navigate to the recipe detail page when a suggestion is clicked
  const handleSuggestionClick = (recipe) => {
    setQuery(""); 
    setSuggestions([]); 
    navigate(`/${encodeURIComponent(recipe.id)}`, { state: { recipe } }); 
  };

  // Navigate to the search results page when the search button is clicked
  const handleSearchClick = () => {
    if (query.trim() === "") return; 
    
    setQuery(""); 
    setSuggestions([]); 
    navigate("/search-results", { state: { results: fullResults, query } }); 
  };

  return (
    <div className="relative w-full" id="search-bar_container">
      <div className="flex items-center border border-gray-300 rounded-lg w-full" id="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleInputChange} 
          placeholder="Search recipe..."
          className="w-full p-2 pl-4 text-lg border-none outline-none rounded-l-lg bg-white"
        />
        <div
          onClick={handleSearchClick} 
          className="px-3 py-2 cursor-pointer bg-[#4CAF50] text-white rounded-r-lg"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} /> 
        </div>
      </div>

      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef} 
          className="absolute top-full left-0 bg-white shadow-lg rounded-lg max-h-64 overflow-y-auto box-border w-full z-50"
          id="suggestions-container"
        >
          {suggestions.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => handleSuggestionClick(recipe)} 
              className="flex items-center cursor-pointer px-3 py-2"
              id="suggestion-title"
            >
              <img
                src={recipe.image || "/placeholder.jpg"} 
                alt={recipe.title}
                className="w-8 h-8 object-cover rounded-full mr-3"
              />
              <span className="text-sm truncate text-left w-full">{recipe.title}</span> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
