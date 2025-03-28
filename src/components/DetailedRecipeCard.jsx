import { filterDiets, filterDishTypes } from "../services/utils"; 

// Function to capitalize the first letter of each word in a string
const capitalizeFirstLetter = (str) => {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const DetailedRecipeCard = ({ recipe }) => {
  // Filter diets and dish types based on the recipe's data
  const filteredDiets = recipe.diets ? filterDiets(recipe.diets) : [];
  const filteredDishTypes = recipe.dishTypes ? filterDishTypes(recipe.dishTypes) : [];

  // Define the required nutrients to display
  const requiredNutrients = ["Calories", "Protein", "Fat", "Saturated Fat", "Carbohydrates"];
  // Filter the nutrients to show only the required ones
  const filteredNutrients = recipe.nutrition.nutrients?.filter(nutrient =>
    requiredNutrients.includes(nutrient.name)
  );

  // Find the saturated fat from the filtered nutrients
  const saturatedFat = filteredNutrients.find(nutrient => nutrient.name === "Saturated Fat");

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white shadow-lg rounded-xl">

      {/* Recipe Image and Title */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <h2 className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent p-4 text-white text-2xl font-bold">
          {recipe.title}
        </h2>
      </div>

      {/* Recipe Details: General Info, Ingredients, and Nutrition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border-r border-gray-300">
          <h4 className="text-xl font-semibold text-[#4CAF50] mb-2">General</h4>
          {filteredDiets.length > 0 && (
            <p><strong>Diet:</strong> {filteredDiets.map(diet => capitalizeFirstLetter(diet)).join(", ")}</p>
          )}
          {filteredDishTypes.length > 0 && (
            <p><strong>Meal:</strong> {filteredDishTypes.map(type => capitalizeFirstLetter(type)).join(", ")}</p>
          )}
          {recipe.nutrition.nutrients[0] && (
            <p><strong>Calories:</strong> {recipe.nutrition.nutrients[0]?.amount} Kcal</p>
          )}
          {recipe.readyInMinutes && (
            <p><strong>Preparation Time:</strong> {recipe.readyInMinutes} minutes</p>
          )}
        </div>

        <div className="p-4 border-r border-gray-300">
          <h4 className="text-xl font-semibold text-[#4CAF50] mb-2">Ingredients</h4>
          <ul className="list-disc list-outside space-y-1">
            {recipe.extendedIngredients?.map((ingredient, idx) => (
              <li key={idx} className="text-gray-700">
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h4 className="text-xl font-semibold text-[#4CAF50] mb-2">Nutrition</h4>
          <div className="space-y-1">
            {filteredNutrients.map((nutrient, idx) => (
              nutrient.name === "Saturated Fat" ? null : (
                <p key={idx} className="text-gray-700">
                  <strong>{nutrient.name}:</strong> {nutrient.amount} {nutrient.unit}
                  {nutrient.name === "Fat" && saturatedFat && ` (of which saturated: ${saturatedFat.amount} ${saturatedFat.unit})`}
                </p>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Preparation Steps */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="text-xl font-semibold text-[#4CAF50] mb-3">Preparation</h4>
        {recipe.analyzedInstructions[0]?.steps.map((step, idx) => (
          <div key={idx} className="mb-2">
            <strong className="text-[#4CAF50]">{idx + 1}.</strong> {step.step}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default DetailedRecipeCard;
