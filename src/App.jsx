import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Recipe from './pages/Recipe';
import SimilarRecipes from './pages/SimilarRecipes';
import Diet from './pages/Diet';
import AdvancedSearch from "./pages/AdvancedSearch";
import AdvancedSearchResults from "./pages/AdvancedSearchResults.jsx";
import './App.css';

const App = () => {
  return (
    <HashRouter>
      <Header/>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/advanced-search" element={<AdvancedSearch />} />
  <Route path="/advanced-search-results" element={<AdvancedSearchResults />} />
  <Route path="/search-results" element={<SearchResult />} />
  <Route path="/recipes/:diet" element={<Diet />} />
  <Route path="/:id" element={<Recipe />} /> {/* Modificata la rotta */}
  <Route path="/similar-recipes" element={<SimilarRecipes />} />
</Routes>
      <Footer/>
    </HashRouter>
  );
};

export default App;
