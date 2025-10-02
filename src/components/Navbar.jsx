import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch, FaFilm, FaBars, FaTimes,
  FaTheaterMasks, FaVideo, FaInfoCircle, FaEnvelope, FaUser
} from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef();
  const searchContainerRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search when clicking outside or pressing Escape
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

  const navLinks = [
    { name: 'THEATRES', icon: FaTheaterMasks, href: '#theatres' },
    { name: 'MOVIES', icon: FaVideo, href: '#movies' },
    { name: 'ABOUT', icon: FaInfoCircle, href: '#about' },
    { name: 'CONTACT', icon: FaEnvelope, href: '#contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted');
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-xl border-b border-blue-100'
            : 'bg-white/60 backdrop-blur-sm shadow'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4 relative">
          {/* Logo - Fixed Position (Left) */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center space-x-3 cursor-pointer select-none relative z-50"
            aria-label="Cinegram Home"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-sky-400/20 rounded-full blur-md"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-sky-400 p-2.5 rounded-full shadow-lg">
                <FaFilm className="text-2xl text-white" />
              </div>
            </motion.div>
            <span className="text-2xl font-black bg-gradient-to-r from-blue-900 via-blue-700 to-sky-500 bg-clip-text text-transparent tracking-tight">
              Cinegram
            </span>
          </motion.a>

          {/* Desktop Nav Links - Centered */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center space-x-1 relative">
              {/* Nav Links - Fade out when search is open, reappear gradually on close */}
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  animate={{ 
                    opacity: isSearchOpen ? 0 : 1,
                    scale: isSearchOpen ? 0.9 : 1,
                    x: isSearchOpen ? 15 : 0
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: isSearchOpen ? 0 : index * 0.06,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="relative group"
                >
                  <motion.a
                    href={link.href}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-700 font-semibold hover:text-blue-700 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <link.icon className="text-base relative z-10" />
                    <span className="relative z-10">{link.name}</span>
                  </motion.a>
                  <motion.div
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 to-sky-400 rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.li>
              ))}

              {/* Search Container - Icon + Expanding Search Bar */}
              <li className="relative ml-1" ref={searchContainerRef}>
                {/* Search Icon Button - Always visible */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-3 rounded-xl transition-all duration-300 relative z-50 ${
                    isSearchOpen 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-label="Toggle search"
                >
                  <FaSearch className="text-lg" />
                </motion.button>

                {/* Expanding Search Bar - Originates from search icon, expands leftward */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 48, originX: 1 }}
                      animate={{ width: 500 }}
                      exit={{ width: 48 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="absolute top-0 right-0 h-12 z-40 bg-white backdrop-blur-xl shadow-2xl border-2 border-blue-400 rounded-full overflow-hidden"
                      style={{ transformOrigin: 'right center' }}
                    >
                      <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          opacity: { delay: isSearchOpen ? 0.25 : 0, duration: 0.2 }
                        }}
                        onSubmit={handleSearchSubmit}
                        className="h-full flex items-center pl-6 pr-16"
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          placeholder="Search movies, theatres, shows..."
                          className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-500 font-medium text-sm"
                        />
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="absolute right-14 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-full hover:from-blue-700 hover:to-sky-600 transition-all shadow-md font-semibold text-xs whitespace-nowrap"
                        >
                          Search
                        </motion.button>
                      </motion.form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>

          {/* Login Button - Fixed Position (Right) */}
          <div className="hidden lg:flex items-center space-x-3 relative z-50">
            <motion.a
              href="#login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-sky-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center space-x-2">
                <FaUser className="text-sm" />
                <span>Login</span>
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-800 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 relative z-50"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes className="text-2xl" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars className="text-2xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden border-t border-blue-100/50 bg-white/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-6 space-y-2">
                {/* Mobile Search */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-4"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-5 py-3 pr-12 rounded-xl border-2 border-blue-200 bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                    />
                    <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                  </div>
                </motion.div>

                {/* Mobile Nav Links */}
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.1 + index * 0.08,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                    onClick={() => setIsOpen(false)}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center space-x-3 px-5 py-3.5 text-gray-700 font-semibold hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 hover:text-blue-700 rounded-xl transition-all cursor-pointer group"
                  >
                    <link.icon className="text-lg group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                  </motion.a>
                ))}

                {/* Mobile Login Button */}
                <motion.a
                  href="#login"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.1 + navLinks.length * 0.08,
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-600 to-sky-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                >
                  <FaUser />
                  <span>Login</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}