import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Funzione per scrollare la pagina in alto
const useScrollToTop = () => {
  const location = useLocation(); // Ottieni la location corrente

  useEffect(() => {
    console.log('Navigating to:', location.pathname); // Diagnostica la navigazione
    window.scrollTo(0, 0); // Effettua lo scroll in alto ogni volta che cambia la location
  }, [location.pathname]); // Dipende solo dal pathname per evitare re-render inutili
};

export default useScrollToTop;






export const filterDiets = (diets) => {
  if (typeof diets === "string") {
    diets = diets.split(",").map((diet) => diet.trim());
  }

  const excludedDiets = ["primal", "whole 30", "paleolithic", "ketogenic", "fodmap friendly", "pescatarian"];

  // Modifica per trasformare "lacto ovo vegetarian" in "Vegetarian"
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
  // Mappa dei sinonimi per ciascun tipo di piatto
  const dishTypeMap = {
    appetizer: ['antipasti', 'antipasto', 'starter', 'hor d\'oeuvre', 'brunch'],
    breakfast: ['morning meal'],
    "main course": ['lunch', 'dinner', 'main dish']  // Sinonimi per "main course"
      // Aggiungi qui altre categorie se necessario
  };

  const filteredDishTypes = [];

  dishTypes.forEach((type) => {
    const normalizedType = type.toLowerCase();

    // Cerca di normalizzare i sinonimi
    let matched = false;
    for (const [mainType, synonyms] of Object.entries(dishTypeMap)) {
      if (synonyms.includes(normalizedType)) {
        if (!filteredDishTypes.includes(mainType)) {
          filteredDishTypes.push(mainType);  // Aggiungi solo se non è già presente
        }
        matched = true;
        break; // Uscita dalla funzione appena trovato il sinonimo
      }
    }

    // Se non è stato trovato un sinonimo, aggiungi il tipo originale
    if (!matched && !filteredDishTypes.includes(normalizedType)) {
      filteredDishTypes.push(normalizedType);
    }
  });

  return filteredDishTypes; // Restituisce la lista dei piatti normalizzati
};
