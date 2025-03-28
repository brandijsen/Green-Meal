import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to the top of the page whenever the route changes
const useScrollToTop = () => {
  const location = useLocation(); 

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]); 
};

export default useScrollToTop;

// Filters and normalizes diet types
export const filterDiets = (diets) => {
  // Converts a comma-separated string into an array
  if (typeof diets === "string") {
    diets = diets.split(",").map((diet) => diet.trim());
  }

  // Defines excluded diets
  const excludedDiets = ["primal", "whole 30", "paleolithic", "ketogenic", "fodmap friendly", "pescatarian"];

  // Normalizes diet names
  diets = diets.map((diet) => {
    if (diet.toLowerCase() === "lacto ovo vegetarian") {
      return "Vegetarian";
    }
    return diet;
  });

  // Filters out unwanted diets
  return diets.filter((diet) => {
    const lowerDiet = diet.toLowerCase();

    // Excludes certain combinations
    return (
      !excludedDiets.includes(lowerDiet) &&
      !(lowerDiet === "vegetarian" && (diets.includes("vegan") || diets.includes("dairy free"))) &&
      !(lowerDiet === "dairy free" && diets.includes("vegan"))
    );
  });
};

// Filters and normalizes dish types
export const filterDishTypes = (dishTypes) => {
  // Maps dish types to their synonyms
  const dishTypeMap = {
    appetizer: ['antipasti', 'antipasto', 'starter', 'hor d\'oeuvre', 'brunch'],
    breakfast: ['morning meal'],
    "main course": ['lunch', 'dinner', 'main dish']
  };

  const filteredDishTypes = []; 

  // Loops through each dish type and normalizes it
  dishTypes.forEach((type) => {
    const normalizedType = type.toLowerCase(); 

    let matched = false;
    // Matches synonyms to main dish types
    for (const [mainType, synonyms] of Object.entries(dishTypeMap)) {
      if (synonyms.includes(normalizedType)) {
        if (!filteredDishTypes.includes(mainType)) {
          filteredDishTypes.push(mainType); 
        }
        matched = true;
        break; 
      }
    }

    // Adds unrecognized dish types directly
    if (!matched && !filteredDishTypes.includes(normalizedType)) {
      filteredDishTypes.push(normalizedType); 
    }
  });

  return filteredDishTypes; 
};
