import { useState, useEffect } from "react";
import { getRecipesByDiet } from "../services/apiServices"; 
import SmallRecipeCard from "../components/SmallRecipeCard.jsx"; 
import useScrollToTop from "../services/utils.js";

const Home = () => {
  const [recipes, setRecipes] = useState([]); // State to store fetched recipes
  useScrollToTop(); // Custom hook to scroll to top on page load

  useEffect(() => {
    // Effect to fetch recipes when component mounts
    const fetchRecipes = async () => {
      try {
        const vegetarianRecipes = await getRecipesByDiet(); // Fetch vegetarian recipes
        setRecipes(vegetarianRecipes); // Set the fetched recipes to state
      } catch (error) {
        console.error("Error retrieving recipes:", error); // Handle error
      }
    };

    fetchRecipes(); // Trigger fetching of recipes
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
      <h2 className="text-2xl font-bold mb-8">
        Discover and share delicious and healthy vegetarian recipes
      </h2>
      <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
        {recipes.slice(0, 12).map((recipe) => (
          <SmallRecipeCard key={recipe.id} recipe={recipe} /> // Render recipes as cards
        ))}
      </div>
    </div>
  );
};

export default Home;
