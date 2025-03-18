import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { filterDiets, filterDishTypes } from "../services/utils";

const SmallRecipeCard = ({ recipe }) => {
  const [isHovered, setIsHovered] = useState(false); 
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/${recipe.id}`, { state: { recipe } }); 
  };

  const filteredDiets = recipe.diets ? filterDiets(recipe.diets) : [];
  const filteredDishTypes = recipe.dishTypes ? filterDishTypes(recipe.dishTypes) : [];

  return (
    <div
    className="relative flex flex-col justify-between cursor-pointer text-center rounded-xl shadow-md transition-shadow duration-300 bg-white z-10"
    onClick={handleCardClick}
    id="recipe-card_small"
  >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-[200px] object-cover rounded-t-xl"
      />

      <div className="p-4 flex flex-col items-center">
        <div className="relative flex justify-center w-full">
          <h5
            className="text-lg font-bold text-[#4CAF50] mb-2 px-2 text-center line-clamp-1 relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {recipe.title}
          </h5>

          {isHovered && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[1px] bg-white text-black px-3 py-1 text-sm rounded-md z-50 shadow-lg whitespace-nowrap border border-gray-300">
            {recipe.title}
            </div>
          )}
        </div>


        <div className="flex flex-wrap justify-center gap-4 mt-2 h-[24px]">
          {filteredDiets.length > 0 ? (
            filteredDiets.map((diet) => (
              <span
                key={diet}
                className="text-sm text-gray-700 capitalize font-medium"
              >
               {diet}
              </span>
            ))
          ) : null}
        </div>

        <div className="flex flex-wrap justify-center gap-1 mt-2 h-[24px]">
          {filteredDishTypes.length > 0 ? (
            <span className="text-sm text-gray-500 capitalize font-medium">
              {filteredDishTypes[0]}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SmallRecipeCard;
