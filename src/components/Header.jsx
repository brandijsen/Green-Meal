import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import headerLogo from '../assets/images/header-logo.png';

const Header = () => 
  <header className="flex justify-between items-center p-4 border-b-2 border-[#4CAF50] gap-x-6">
    {/* Logo linking to home page */}
    <div className="flex-1">
      <Link to="/" id='advanced-search_link'>
        <img src={headerLogo} alt="header logo" className="h-16 w-auto" id='header-logo'/>
      </Link>
    </div>

    {/* Section with dropdown menu, search bar, and advanced search link */}
    <div className="flex items-center gap-6 px-3" id='header-section_two'>
      <DropdownMenu />
      <SearchBar />
      <Link
        to="/advanced-search"
        className="text-[#4CAF50] font-medium no-underline whitespace-nowrap"
        id="advanced-search_link"
      >
        Advanced Search
      </Link>
    </div>
  </header>

export default Header;
