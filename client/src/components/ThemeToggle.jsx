import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
    return (
        <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="theme-toggle-content">
                {theme === 'light' ? (
                    <span className="theme-icon sun">☀️</span>
                ) : (
                    <span className="theme-icon moon">🌙</span>
                )
                }
            </div>
        </button>
    );
};

export default ThemeToggle;
