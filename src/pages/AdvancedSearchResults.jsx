import { useLocation } from "react-router-dom";
import SmallRecipeCard from "../components/SmallRecipeCard";
import useScrollToTop from "../services/utils";

const AdvancedSearchResults = () => {
  useScrollToTop()
  const location = useLocation();
  const results = location.state?.results || [];
  const { query, diet, maxCalories, dishType, excludeIngredients, highHealthScore } = location.state || {};

  // Log per fare il debug
  console.log("Received Parameters:", { query, diet, maxCalories, dishType, excludeIngredients, highHealthScore });

  // Costruzione dinamica del titolo basato sui parametri
  const selectedParameters = [
    query && `"${query}"`,
    diet && `${diet}`,
    maxCalories && `Max ${maxCalories} kcal`,
    dishType && `${dishType}`,
    excludeIngredients && `exclude: ${excludeIngredients}`,
    highHealthScore && "Healthy",
  ]
    .filter(Boolean) // Rimuove i valori falsi (null, undefined, "")
    .join(" | "); // Unisce i parametri con un separatore



    
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
