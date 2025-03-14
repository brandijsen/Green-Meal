import axios from "axios";

const API_KEY = "7df372b3c5464cf0a34f714b09927023"; // La tua chiave Spoonacular
const BASE_URL = "https://api.spoonacular.com/recipes";

/*
const apiKey = '7df372b3c5464cf0a34f714b09927023'
const apiKey3 = 'cde97d25452548fb91a032b5355759a3';
const apiKey2 = '62ceda901da5433e88277b56076302c5'
*/

export const getVegetarianRecipes = async (query, number = 12) => {
  try {
    const params = {
      apiKey: API_KEY,
      diet: "vegetarian",
      number: number,
      query: query,
      addRecipeInformation: true,
    };

    console.log("Fetching vegetarian recipes with params:", params);

    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });

    return { results: response.data.results }; // Ritorna un oggetto con "results"
  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    return { results: [] }; // Ritorna un array vuoto in caso di errore
  }
};



export const getRecipesByDiet = async (diet) => {
  try {
    let dietFilter = "vegetarian"; // Default dieta vegetariana
    
    if (diet) {
      if (diet === "gluten free") {
        dietFilter = "gluten free,vegetarian"; // Ricette senza glutine e vegetariane
      } else if (diet === "dairy free") {
        dietFilter = "dairy free,vegetarian"; // Ricette senza latticini e vegetariane
      } else {
        dietFilter = diet; // Se vegan o vegetarian è selezionato, usa direttamente la dieta
      }
    }

    const params = {
      apiKey: API_KEY,
      number: 12, // Numero di ricette richieste
      tags: dietFilter,
    };

    console.log("Fetching random recipes with params:", params);

    const response = await axios.get(`${BASE_URL}/random`, { params });

    // Rimuovi il filtro sulle ricette
    const recipes = response.data.recipes;

    console.log("Random recipes:", recipes);

    return recipes;
  } catch (error) {
    console.error("Errore nella chiamata API random:", error);
    throw error;
  }
};



export const getRecipesByFilters = async ({
  query,
  excludeIngredients,
  diet,
  maxCalories,
  dishType,
  number = 12,
  sort = '',
}) => {
  try {
    let dietFilter = "vegetarian"; // Assicura che il filtro sia sempre "vegetarian"

    if (diet) {
      if (diet === "gluten free") {
        dietFilter = "gluten free,vegetarian";
      } else if (diet === "dairy free") {
        dietFilter = "dairy free,vegetarian";
      } else {
        dietFilter = diet;
      }
    }

    const params = {
      query,
      diet: dietFilter,
      number,
      apiKey: API_KEY,
      addRecipeInformation: true,
      sort,
      maxCalories,
      type: dishType,
      excludeIngredients,
    };

    console.log("Fetching recipes with params:", params);

    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });

    // 🔴 Filtriamo manualmente eventuali ricette pescetariane 🔴
    const filteredRecipes = response.data.results.filter(
      (recipe) => !recipe.diets.includes("pescatarian")
    );

    console.log("Filtered recipes (no pescetarian):", filteredRecipes);

    return filteredRecipes;
  } catch (error) {
    console.error("Errore durante la ricerca delle ricette:", error);
    throw error;
  }
};



export const getRecipeInformation = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: {
        apiKey: API_KEY,
        includeNutrition: true, // Include i dati nutrizionali
      },
    });
    console.log("Dettagli della ricetta:", response.data); // Log per debug
    return response.data;
  } catch (error) {
    console.error("Errore nel recupero delle informazioni della ricetta:", error);
    throw error; // Propaga l'errore
  }
};

export const getSimilarRecipes = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/similar?number=12&apiKey=${API_KEY}`
    );

    const similarRecipes = response.data;

    console.log("Raw similar recipes:", similarRecipes);

    return similarRecipes; // Restituisce tutte le ricette
  } catch (error) {
    console.error("Errore nella chiamata getSimilarRecipes:", error);
    throw error;
  }
};
