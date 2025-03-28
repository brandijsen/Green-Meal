import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import { getSimilarRecipes, getRecipeInformation } from "../services/apiServices";
import useScrollToTop from "../services/utils.js";

const SimilarRecipes = () => {
  // Custom hook to scroll to the top of the page on route change
  useScrollToTop()

  // Get the current location and extract recipeId and recipeTitle from the state
  const location = useLocation();
  const [detailedRecipes, setDetailedRecipes] = useState(null); 
  const recipeId = location.state?.recipeId; 
  const recipeTitle = location.state?.recipeTitle; 

  useEffect(() => {
    // Function to fetch similar recipes and their detailed information
    const fetchSimilarAndDetails = async () => {
      try {
        // Fetch similar recipes based on the recipeId
        const similarRecipes = await getSimilarRecipes(recipeId);

        // Handle case where no similar recipes are found
        if (!similarRecipes || similarRecipes.length === 0) {
          console.warn("No similar recipes found");
          setDetailedRecipes([]); 
          return;
        }

        // Fetch detailed information for each similar recipe
        const detailedData = await Promise.all(
          similarRecipes.map((recipe) =>
            getRecipeInformation(recipe.id).catch((err) => {
              console.error(`Error with recipe ${recipe.id}:`, err);
              return null; // Return null in case of error
            })
          )
        );

        // Filter out the recipes that are not vegetarian
        const vegetarianRecipes = detailedData.filter(
          (data) => data !== null && data.vegetarian
        );

        // Update the state with the filtered vegetarian recipes
        setDetailedRecipes(vegetarianRecipes);
      } catch (error) {
        console.error("Error retrieving similar recipes:", error);
        setDetailedRecipes([]); // Set empty array on error
      }
    };

    // Fetch data only if recipeId is available
    if (recipeId) {
      fetchSimilarAndDetails(); 
    } else {
      console.error("recipeId not found!");
      setDetailedRecipes([]); // Set empty array if no recipeId is found
    }
  }, [recipeId]); // Re-run the effect when recipeId changes

  return (
      <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
        <h2 className="text-2xl font-bold mb-8">
          Similar recipes to "{recipeTitle}"{" "}
          {detailedRecipes && detailedRecipes.length > 0 && (
            <small className="text-red-500">({detailedRecipes.length})</small>
          )}
        </h2>
        {detailedRecipes === null ? (
          <></> // Render nothing if detailedRecipes is still null
        ) : detailedRecipes.length > 0 ? (
          // Display the list of similar recipes in a grid layout
          <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
          {detailedRecipes.map((recipe) => (
                <SmallRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          // Display message if no similar recipes are found
          <p className="text-center mt-5 text-gray-500">
            No similar recipes found for the recipe you viewed.
          </p>
        )}
      </div>
  );
};

export default SimilarRecipes;
