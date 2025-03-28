import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesByDiet } from "../services/apiServices.js";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import useScrollToTop from "../services/utils.js";

const Diet = () => {
  // Scroll to the top when the component is loaded
  useScrollToTop(); 
  
  const { diet } = useParams(); 
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes based on diet
    const fetchRecipes = async () => {
      try {
        const data = await getRecipesByDiet(diet); 
        // Set the fetched recipes
        setRecipes(data); 
      } catch (err) {
        console.error("Error loading recipes:", err); 
      } 
    };

    // Fetch recipes when the component mounts or diet changes
    fetchRecipes(); 
  }, [diet]); 
  return (
    <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
      {/* Title for the diet recipes */}
      <h2 className="text-2xl font-bold mb-8">
        {/* Capitalize each word in the diet name */}
        {diet
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{" "}
        recipes
        <small className="text-red-500"> ({recipes.length})</small>
      </h2>

      {/* Displaying the list of recipes */}
      <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
        {recipes.map((recipe) => (
          <SmallRecipeCard key={recipe.id} recipe={recipe} /> 
        ))}
      </div>
    </div>
  );
};

export default Diet;
