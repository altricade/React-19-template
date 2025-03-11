import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600">
              React 19 SSR
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? "text-primary-600 font-medium"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zm1 5a1 1 0 100 2h14a1 1 0 100-2H5z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-3 pb-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "text-primary-600 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  } transition-colors py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
