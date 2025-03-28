import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes";

// Fetches vegetarian recipes based on a search query
export const getVegetarianRecipes = async (query, number = 12) => {
  try {
    const params = {
      apiKey: API_KEY,
      diet: "vegetarian",
      number,
      query,
      addRecipeInformation: true,
    };

    const response = await axios.get(`${BASE_URL}/complexSearch`, { params });

    return { results: response.data.results };
  } catch (error) {
    console.error("Error fetching vegetarian recipes:", error);
    return { results: [] };
  }
};

// Fetches recipes filtered by diet
export const getRecipesByDiet = async (diet) => {
  try {
    let dietFilter = diet ? `${diet},vegetarian` : "vegetarian";

    const params = {
      apiKey: API_KEY,
      number: 12,
      tags: dietFilter,
    };

    const response = await axios.get(`${BASE_URL}/random`, { params });
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    throw error;
  }
};

// Fetches recipes based on advanced filters
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
    let dietFilter = diet ? `${diet},vegetarian` : "vegetarian";

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

    return response.data.results.filter(
      (recipe) => !recipe.diets.includes("pescatarian")
    );
  } catch (error) {
    console.error("Error fetching recipes with filters:", error);
    throw error;
  }
};

// Fetches detailed information about a recipe
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
    console.error("Error fetching recipe information:", error);
    throw error;
  }
};

// Fetches similar recipes based on a given recipe ID
export const getSimilarRecipes = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/${id}/similar?number=12&apiKey=${API_KEY}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching similar recipes:", error);
    throw error;
  }
};


