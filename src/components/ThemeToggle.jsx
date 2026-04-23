import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2V4M10 16V18M4 10H2M6.34315 6.34315L4.92893 4.92893M13.6569 13.6569L15.0711 15.0711M18 10H16M13.6569 6.34315L15.0711 4.92893M6.34315 13.6569L4.92893 15.0711M10 6C12.2091 6 14 7.79086 14 10C14 12.2091 12.2091 14 10 14C7.79086 14 6 12.2091 6 10C6 7.79086 7.79086 6 10 6Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M17 12C15.5 14.5 12.5 16 10 16C7.5 16 4.5 14.5 3 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M10 12V16M10 18H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;