import { useState } from "react";
import AdvancedSearchForm from "../components/AdvancedSearchForm.jsx"; // Importa il componente SearchForm
import useScrollToTop from "../services/utils.js";

const AdvancedSearch = () => {
useScrollToTop()
  const [error, setError] = useState("");

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  

  return (
  <div className="flex-1 container mx-auto mt-10 mb-20 px-4" id="adv-search_page">
    <h2 className="text-2xl font-semibold mb-8 text-center">Advanced Search</h2>
    <AdvancedSearchForm onError={handleError} />
    {error && (
      <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
        {error}
      </div>
    )}
  </div>

  );
};

export default AdvancedSearch;
