import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import useScrollToTop from "../services/utils.js";

const SearchResult = () => {
  // Custom hook to scroll to the top when the component mounts or the route changes
  useScrollToTop()

  // Retrieve the search query and results from the location state
  const location = useLocation();
  const query = location.state?.query || ""; // Fallback to empty string if no query is provided

  // Use memoization to prevent unnecessary re-computations of results
  const results = useMemo(() => location.state?.results || [], [location.state?.results]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false once the results are available or if the query is empty
    if (results.length > 0 || query === "") {
      setLoading(false);
    }
  }, [results, query]); // Re-run the effect when results or query change

  return (
      <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
        <h2 className="text-2xl font-bold mb-8">
          Results for "{query}" 
          <small className="text-red-500"> ({results.length})</small>
        </h2>

        {/* Render results or a message depending on loading and whether results are found */}
        {!loading && (
          results.length > 0 ? (
            // Display results in a grid format if there are results
            <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
              {results.map((recipe) => (
                <SmallRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            // Show a message if no results are found
            <p className="text-center mt-4 text-gray-500">
              No recipes found for "{query}".
            </p>
          )
        )}
      </div>
  );
};

export default SearchResult;
