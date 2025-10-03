import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFilm, FaBars, FaTimes,
  FaTheaterMasks, FaVideo, FaInfoCircle, FaEnvelope, FaUser
} from 'react-icons/fa';
import Searchbar from './Searchbar'; // import the new SearchBar

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'THEATRES', icon: FaTheaterMasks, href: '#theatres' },
    { name: 'MOVIES', icon: FaVideo, href: '#movies' },
    { name: 'ABOUT', icon: FaInfoCircle, href: '#about' },
    { name: 'CONTACT', icon: FaEnvelope, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-xl border-b border-blue-100'
          : 'bg-white/60 backdrop-blur-sm shadow'
        }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4 relative">
        {/* Logo */}
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

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center space-x-1 relative">
            {navLinks.map((link, index) => (
              <motion.li key={link.name} className="relative group">
                <motion.a
                      href={link.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        flex items-center space-x-2 px-4 py-2.5 rounded-xl
                        text-gray-700 font-semibold cursor-pointer
                        relative overflow-hidden
                        group
                      "
                    >
                  
                  <link.icon className="text-base relative z-10" />
                  <span className="relative z-10">{link.name}</span>
                  {/* Underline */}
                  <span
                    className="
                      pointer-events-none
                      absolute left-4 right-4 bottom-2 h-0.5
                      bg-blue-600
                      origin-left
                      scale-x-0
                      transition-transform duration-500
                      group-hover:scale-x-100
                      rounded-full
                      z-20
                    "
                  />
                </motion.a>
              </motion.li>
            ))}

            {/* SearchBar Component */}
            <Searchbar />
          </ul>
        </div>

        {/* Login Button */}
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
  );
}
