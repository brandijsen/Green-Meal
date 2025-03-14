import { useState, useEffect, useRef } from "react";
import { getRecipesByFilters } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

const AdvancedSearchForm = ({ onError }) => {
  const [query, setQuery] = useState("");
  const [maxCalories, setMaxCalories] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [highHealthScore, setHighHealthScore] = useState(false);
  const [diet, setDiet] = useState("");
  const [dishType, setDishType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showDietOptions, setShowDietOptions] = useState(false);
  const [showDishTypeOptions, setShowDishTypeOptions] = useState(false);

  const navigate = useNavigate();
  const dietMenuRef = useRef(null);
  const dishTypeMenuRef = useRef(null);

  const dietOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"];
  const dishTypeOptions = [
    "Main Course", "Side Dish", "Dessert", "Appetizer", "Salad",
    "Bread", "Breakfast", "Soup", "Beverage", "Sauce", 
    "Marinade", "Fingerfood", "Snack", "Drink"
  ];

  const handleClickOutside = (event) => {
    if (dietMenuRef.current && !dietMenuRef.current.contains(event.target)) {
      setShowDietOptions(false);
    }
    if (dishTypeMenuRef.current && !dishTypeMenuRef.current.contains(event.target)) {
      setShowDishTypeOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateSearch = () => query.trim() || diet.trim() || maxCalories || dishType.trim() || excludeIngredients.trim() || highHealthScore;

  const handleSearch = async () => {
    if (!validateSearch()) {
      setErrorMessage("Please fill in at least one field.");
      return;
    }

    setErrorMessage("");
    onError("");

    const searchParams = {
      query: query.trim(),
      diet: diet.trim(),
      maxCalories: maxCalories && !isNaN(maxCalories) ? parseInt(maxCalories, 10) : undefined,
      dishType: dishType.trim(),
      excludeIngredients: excludeIngredients.trim(),
      sort: highHealthScore ? "healthiness" : "",
    };

    try {
      const results = await getRecipesByFilters(searchParams);
      const filteredResults = highHealthScore ? results.filter((recipe) => recipe.healthScore > 60) : results;
      
      navigate("/advanced-search-results", {
        state: { results: filteredResults, query, diet, maxCalories, dishType, excludeIngredients, highHealthScore },
      });
    } catch (err) {
      console.error("Error during advanced search:", err);
      onError("Error retrieving recipes. Please try again.");
    }
  };

  return (
    <form className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg" >
      <div>
        <label htmlFor="searchQuery" className="block text-gray-700 font-medium mb-2">Keyword</label>
        <input
          id="searchQuery"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter a keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"  // Disabilita l'autocompletamento

        />
      </div>

      <div>
        <label htmlFor="excludeIngredients" className="block text-gray-700 font-medium mb-2">Exclude Ingredients</label>
        <input
          id="excludeIngredients"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter ingredients, separated by comma..."
          value={excludeIngredients}
          onChange={(e) => setExcludeIngredients(e.target.value)}
          autoComplete="off"  // Disabilita l'autocompletamento

        />
      </div>


      <div className="relative" ref={dietMenuRef}>
  {/* Label */}
  <label className="block text-gray-700 font-medium mb-2">Diet</label>

  {/* Selettore principale */}
  <div
    className="w-full p-3 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between"
    onClick={() => setShowDietOptions(!showDietOptions)}
  >
    <span className="text-left flex-1 no-transform">
      {diet || "Select a diet"}
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {/* Menu delle opzioni */}
  {showDietOptions && (
    <div className="absolute w-full bg-white rounded-md mt-1 shadow-md z-10 overflow-hidden">
      {dietOptions.map((option) => (
        <div
          key={option}
          className="p-2 cursor-pointer"
          onClick={() => { 
            setDiet(option);
            setShowDietOptions(false);
          }}
          id="advanced-option"
        >
          {option}
        </div>
      ))}
    </div>
  )}
</div>


<div className="relative" ref={dishTypeMenuRef}>
  <label className="block text-gray-700 font-medium mb-2">Dish Type</label>
  <div
    className="w-full p-3 border border-gray-300 rounded-md cursor-pointer flex items-center justify-between"
    onClick={() => setShowDishTypeOptions(!showDishTypeOptions)}
  >
    <span className="text-left flex-1 no-transform">{dishType || "Select a dish type"}</span>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
  {showDishTypeOptions && (
    <div className="absolute w-full bg-white rounded-md mt-1 shadow-md z-10 max-h-60 overflow-y-auto">
      {dishTypeOptions.map((type) => (
        <div
          key={type}
          className="p-2 cursor-pointer"
          onClick={() => { setDishType(type); setShowDishTypeOptions(false); }}
          id="advanced-option"
        >
          {type}
        </div>
      ))}
    </div>
  )}
</div>



      <div>
        <label htmlFor="maxCalories" className="block text-gray-700 font-medium mb-2">Calories</label>
        <input
          id="maxCalories"
          type="number"
          step="50"
          className="w-full p-3 border border-gray-300 rounded-md"
          placeholder="Enter max kcal..."
          value={maxCalories === undefined ? "" : maxCalories}
          onChange={(e) => setMaxCalories(e.target.value && !isNaN(e.target.value) ? Math.max(0, parseInt(e.target.value, 10)) : undefined)}
        />
      </div>

      <div className="flex items-center space-x-3">
        <label htmlFor="healthyScoreFilter" className="text-gray-700 font-medium">Healthy</label>
        <input
          id="healthyScoreFilter"
          type="checkbox"
          checked={highHealthScore}
          onChange={(e) => setHighHealthScore(e.target.checked)}
          className="h-5 w-5 appearance-none border border-gray-300 rounded-md cursor-pointer"/>

      </div>

      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}

      <button
        type="button"
        className="w-full px-6 py-3 bg-[#4CAF50] text-white font-bold rounded-md border"
        onClick={handleSearch}
        id="advanced-search_button"
      >
        Search
      </button>
    </form>
  );
};

export default AdvancedSearchForm;
