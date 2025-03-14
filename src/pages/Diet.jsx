import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipesByDiet } from "../services/apiServices.js";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import useScrollToTop from "../services/utils.js";

const Diet = () => {
  useScrollToTop()
  const { diet } = useParams(); // Ottieni il parametro "diet" dalla URL
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipesByDiet(diet); // Chiamata API per ottenere le ricette
        setRecipes(data);
        console.log("Ricette ricevute:", data); // Mostra le ricette in console
      } catch (err) {
        console.error("Errore durante il caricamento delle ricette:", err); // Mostra l'errore in console
      } 
    };

    fetchRecipes();
  }, [diet]);


  return (
      <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
        <h2 className="text-2xl font-bold mb-8">
          {diet
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          recipes
          <small className="text-red-500"> ({recipes.length})</small>
        </h2>

        <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
          {recipes.map((recipe) => (
              <SmallRecipeCard  key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    
  );
};

export default Diet;
