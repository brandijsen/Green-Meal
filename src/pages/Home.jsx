import { useState, useEffect } from "react";
import { getRecipesByDiet } from "../services/apiServices"; // Importa la tua funzione
import SmallRecipeCard from "../components/SmallRecipeCard.jsx"; // Importa il componente
import useScrollToTop from "../services/utils.js";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]); // Stato per memorizzare le ricette
  useScrollToTop();

  useEffect(() => {
    // Funzione per ottenere le ricette vegetariane
    const fetchRecipes = async () => {
      try {
        const vegetarianRecipes = await getRecipesByDiet(); // Chiama la funzione senza parametri
        console.log("Ricette recuperate:", vegetarianRecipes); // Log delle ricette per il controllo
        setRecipes(vegetarianRecipes); // Aggiorna lo stato con le ricette
      } catch (error) {
        console.error("Errore durante il recupero delle ricette:", error);
      }
    };

    fetchRecipes(); // Chiama la funzione al caricamento della pagina
  }, []); // Array vuoto per chiamare solo al primo render

  return (
      <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
        <h2 className="text-2xl font-bold mb-8">Discover and share delicious and healthy vegetarian recipes</h2>
          <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
            {recipes.slice(0, 12).map((recipe) => (
             <SmallRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
      </div>
  );
};

export default HomePage;
