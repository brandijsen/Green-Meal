import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailedRecipeCard from "../components/DetailedRecipeCard.jsx";
import { getRecipeInformation, getSimilarRecipes } from "../services/apiServices";
import useScrollToTop from "../services/utils.js";

const Recipe = () => {
  // Custom hook to scroll to the top when the component mounts or the route changes
  useScrollToTop();
  
  // Use navigate to programmatically navigate to a different route
  const navigate = useNavigate();
  
  // Extract the recipeId from the URL parameters
  const { id: recipeId } = useParams();
  
  // State to store the fetched recipe data
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (recipeId) {
      // Fetch the recipe data when the component mounts or recipeId changes
      const fetchRecipe = async () => {
        try {
          const data = await getRecipeInformation(recipeId); // Call API to fetch recipe details
          setRecipe(data); // Set the fetched recipe to state
        } catch (error) {
          console.error("Error retrieving the recipe:", error); // Log error if fetching fails
        }
      };
      fetchRecipe();
    } else {
      // If recipeId is not found, navigate to a fallback route (similar recipes)
      navigate("/similar-recipes");
    }
  }, [recipeId, navigate]); // Re-run the effect when recipeId or navigate changes

  const handleSimilarRecipes = async () => {
    try {
      // Fetch similar recipes based on the current recipeId
      await getSimilarRecipes(recipeId);
      
      // Navigate to the similar recipes page and pass the current recipeId and title
      navigate("/similar-recipes", {
        state: { recipeId, recipeTitle: recipe?.title },
      });
    } catch (error) {
      console.error("Error retrieving similar recipes:", error); // Log error if fetching fails
    }
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-10 mb-20">
        {/* Render the DetailedRecipeCard component if the recipe data is available */}
        {recipe && <DetailedRecipeCard recipe={recipe} />}
        
        {/* Button to navigate to the similar recipes page */}
        <button
          onClick={handleSimilarRecipes}
          className="px-4 py-2 mt-4 mx-auto block rounded-md border border-gray-300 bg-[#4CAF50] text-sm font-bold text-white"
          id="similar-recipes_button"
        >
          Similar Recipes
        </button>
      </div>
    </div>
  );
};

export default Recipe;
