/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import SmallRecipeCard from "../components/SmallRecipeCard.jsx";
import useScrollToTop from "../services/utils.js";

const SearchResult = () => {
  useScrollToTop()
  const location = useLocation();
  const query = location.state?.query || ""; // Ottiene la query passata tramite state

  // Usa useMemo per memorizzare il valore di results ed evitare cambiamenti a ogni render
  const results = useMemo(() => location.state?.results || [], [location.state?.results]);

  // Stato per gestire il caricamento
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (results.length > 0 || query === "") {
      setLoading(false);
    }
  }, [results, query]); // Ora results è stabile grazie a useMemo

  return (
      <div className="container min-h-screen flex flex-col mx-auto px-20 mt-10 mb-20" id="container">
        <h2 className="text-2xl font-bold mb-8">
          Results for "{query}" 
          <small className="text-red-500"> ({results.length})</small>
        </h2>

        {/* Mostra i risultati solo dopo il caricamento */}
        {!loading && (
          results.length > 0 ? (
            <div className="grid grid-cols-4 gap-20 w-full" id="recipes-grid">
            {results.map((recipe) => (
                  <SmallRecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-4 text-gray-500">
              No recipes found for "{query}".
            </p>
          )
        )}
      </div>
  );
};

export default SearchResult;
