import { useLocation } from "react-router-dom";
import SmallRecipeCard from "../components/SmallRecipeCard";
import useScrollToTop from "../services/utils";

const AdvancedSearchResults = () => {
  useScrollToTop()
  const location = useLocation();
  const results = location.state?.results || [];
  const { query, diet, maxCalories, dishType, excludeIngredients, highHealthScore } = location.state || {};


  const selectedParameters = [
    query && `"${query}"`,
    excludeIngredients && `exclude: ${excludeIngredients}`,
    diet && `${diet}`,
    dishType && `${dishType}`,
    maxCalories && `Max ${maxCalories} kcal`,
    highHealthScore && "Healthy",
  ]
    .filter(Boolean) 
    .join(" | "); 
    
  return (
      <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
        <h2 className="text-2xl font-bold mb-8">
          Results for: <br />
          {selectedParameters || "your search"}{" "}
          <small className="text-red-500">({results.length})</small>
        </h2>
        {results.length > 0 ? (
          <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
          {results.map((recipe) => (
                <SmallRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-500">
            No results found. Please refine your search.
          </p>
        )}
      </div>
  );
};

export default AdvancedSearchResults;
