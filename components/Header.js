import React, { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="text-gray-600 body-font px-4 md:px-24 relative">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 header-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 heading-text">Resell</span>
          </div>

          {/* Toggler for small screens */}
          <button
            className="toggler-button text-gray-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Responsive menu */}
          <nav className={`header-nav flex flex-col md:flex-row md:flex-1 md:items-center md:justify-end space-y-4 md:space-y-0 md:space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
            <a
              href="#search"
              className="block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search Product
            </a>
            <a
              href="#add"
              className="block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Product
            </a>
            <a
              href="#display"
              className="block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Available products
            </a>
          </nav>
        </div>
      </header>

      <style jsx>{`
        .heading-text {
          font-size: 1.875rem; /* default to text-3xl */
        }

        .toggler-button {
          display: none; /* Default to hidden */
          position: absolute; /* Position the toggler absolutely */
          right: 16px; /* Align to the right */
          top: 50%; /* Center vertically */
          transform: translateY(-50%); /* Adjust for exact vertical center */
        }

        @media (max-width: 1200px) {
          .toggler-button {
            display: block; /* Show toggler on screens up to 1200px */
          }
          .header-nav {
            display: ${isOpen ? 'block' : 'none'}; /* Toggle menu visibility */
          }
        }

        @media (min-width: 1201px) {
          .toggler-button {
            display: none; /* Hide toggler on screens wider than 1200px */
          }
          .header-nav {
            display: flex; /* Ensure menu is visible on screens wider than 1200px */
            justify-content: flex-end; /* Align menu to the right */
          }
        }

        @media (max-width: 575px) and (min-width: 280px) {
          .container {
            padding-left: 8px;
            padding-right: 8px;
          }

          .header-logo {
            margin-bottom: 16px;
          }

          .header-nav {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-nav a {
            margin-bottom: 8px;
          }

          .heading-text {
            font-size: 1.25rem; /* equivalent to text-xl */
          }
        }
      `}</style>
    </>
  );
};

export default Header;
