import { Link } from "react-router-dom";
import footerLogo from '../assets/images/footer-logo.png'
const Footer = () => {
  return (
    <footer className="bg-[#4CAF50] py-6 mt-5 border-t border-white text-white text-center">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        {/* Logo centrato */}
        <Link to="/" className="mb-4">
          <img src={footerLogo} alt="footer logo" className="h-12 w-auto" />
        </Link>

        {/* Testo centrato */}
        <p className="mb-2 text-lg font-semibold">
          Discover and share delicious and healthy vegetarian recipes.
        </p>

        <p className="text-sm opacity-90">
          &copy; {new Date().getFullYear()} GreenMeal. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
