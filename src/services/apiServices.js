import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

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

    return { results: response.data.results }; 

  } catch (error) {
    console.error("Errore nella chiamata API:", error);
    return { results: [] }; 
  }
};


export const getRecipesByDiet = async (diet) => {
  try {
    let dietFilter = "vegetarian"; 
    
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
      apiKey: API_KEY,
      number: 12, 
      tags: dietFilter,
    };

    const response = await axios.get(`${BASE_URL}/random`, { params });

    const recipes = response.data.recipes;

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
    let dietFilter = "vegetarian"; 

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

    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });

    const filteredRecipes = response.data.results.filter(
      (recipe) => !recipe.diets.includes("pescatarian")
    );

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
        includeNutrition: true, 
      },
    });
    return response.data;

  } catch (error) {
    console.error("Errore nel recupero delle informazioni della ricetta:", error);
    throw error; 
  }
};


export const getSimilarRecipes = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/similar?number=12&apiKey=${API_KEY}`
    );

    const similarRecipes = response.data;

    return similarRecipes; 

  } catch (error) {
    console.error("Errore nella chiamata getSimilarRecipes:", error);
    throw error;
  }
};
