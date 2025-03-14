import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const dietOptions = ["Vegan", "Vegetarian", "Gluten Free", "Dairy Free"];

  const handleSelect = (diet) => {
    setIsOpen(false);
    navigate(`/recipes/${diet}`);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left" id='dropdown-button_container'>
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-[#4CAF50] px-4 py-2 text-sm font-bold text-white cursor-pointer"
        id="dropdown-button"
        onClick={toggleDropdown}
      >
        Recipes
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-1 w-full rounded-md shadow-lg bg-white  z-50 overflow-hidden"
          id="dropdown-menu"
        >
          <div>
            {dietOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option.toLowerCase())}
                className='text-left p-2 cursor-pointer' 
                id='dropdown-option'
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
