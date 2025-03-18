import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]); 
};

export default useScrollToTop;






export const filterDiets = (diets) => {
  if (typeof diets === "string") {
    diets = diets.split(",").map((diet) => diet.trim());
  }

  const excludedDiets = ["primal", "whole 30", "paleolithic", "ketogenic", "fodmap friendly", "pescatarian"];

  diets = diets.map((diet) => {
    if (diet.toLowerCase() === "lacto ovo vegetarian") {
      return "Vegetarian";
    }
    return diet;
  });

  return diets.filter((diet) => {
    const lowerDiet = diet.toLowerCase();

    return (
      !excludedDiets.includes(lowerDiet) &&
      !(lowerDiet === "vegetarian" && (diets.includes("vegan") || diets.includes("dairy free"))) &&
      !(lowerDiet === "dairy free" && diets.includes("vegan"))
    );
  });
};


export const filterDishTypes = (dishTypes) => {
  const dishTypeMap = {
    appetizer: ['antipasti', 'antipasto', 'starter', 'hor d\'oeuvre', 'brunch'],
    breakfast: ['morning meal'],
    "main course": ['lunch', 'dinner', 'main dish']  
  };

  const filteredDishTypes = [];

  dishTypes.forEach((type) => {
    const normalizedType = type.toLowerCase();

    let matched = false;
    for (const [mainType, synonyms] of Object.entries(dishTypeMap)) {
      if (synonyms.includes(normalizedType)) {
        if (!filteredDishTypes.includes(mainType)) {
          filteredDishTypes.push(mainType);  
        }
        matched = true;
        break; 
      }
    }

    if (!matched && !filteredDishTypes.includes(normalizedType)) {
      filteredDishTypes.push(normalizedType);
    }
  });

  return filteredDishTypes; 
};
