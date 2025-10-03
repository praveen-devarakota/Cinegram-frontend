// src/components/SearchBar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef();
  const searchContainerRef = useRef();

  // Close search on outside click or Escape
  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  // Autofocus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted');
  };

  return (
    <li className="relative ml-1 flex items-center" ref={searchContainerRef}>
      {/* Search Icon Button */}
      {!isSearchOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSearchOpen(true)}
          className="p-3 rounded-xl relative z-50 text-gray-600 hover:text-blue-700 hover:bg-blue-50"
          aria-label="Toggle search"
        >
          <FaSearch className="text-lg" />
        </motion.button>
      )}

      {/* Expanding Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ width: 48, opacity: 0 }}
            animate={{ width: 'calc(100% + 520px)', opacity: 1 }}
            exit={{ width: 48, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="absolute right-0 h-12 z-40 bg-white/95 backdrop-blur-md shadow-lg border border-gray-200/60 rounded-full overflow-hidden flex items-center"
            style={{ transformOrigin: 'right center' }}
          >
            <motion.form
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
              onSubmit={handleSearchSubmit}
              className="h-full flex items-center gap-3 px-5 w-full"
            >
              <div className="flex-1 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search movies, theaters, shows..."
                  className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-400 font-normal text-sm"
                  autoComplete="off"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm"
              >
                Search
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default Searchbar;
