import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

function Navbar({ theme, setTheme }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    toast.success(`Language changed to ${lng}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    toast.success(`Switched to ${theme === 'light' ? 'dark' : 'light'} mode`);
  };

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fas fa-utensils text-2xl"></i>
          <span className="text-xl font-bold">MIT Mess</span>
        </div>
        <div className="flex space-x-4">
          <NavLink to="/" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-home mr-1"></i>{t('navbar.home')}
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-book-open mr-1"></i>{t('navbar.menu')}
          </NavLink>
          <NavLink to="/feedback" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-star mr-1"></i>{t('navbar.feedback')}
          </NavLink>
          <NavLink to="/notes" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-sticky-note mr-1"></i>{t('navbar.notes')}
          </NavLink>
          <NavLink to="/snackboard" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-coffee mr-1"></i>{t('navbar.snackboard')}
          </NavLink>
          <NavLink to="/rules" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-gavel mr-1"></i>{t('navbar.rules')}
          </NavLink>
          <NavLink to="/staff" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-users mr-1"></i>{t('navbar.staff')}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-envelope mr-1"></i>{t('navbar.contact')}
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-image mr-1"></i>{t('navbar.gallery')}
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-user mr-1"></i>{t('navbar.dashboard')}
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-cog mr-1"></i>{t('navbar.admin')}
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => `hover:text-accent ${isActive ? 'text-accent' : ''}`}>
            <i className="fas fa-sign-in-alt mr-1"></i>{t('navbar.login')}
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-secondary text-text p-2 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
          </select>
          <button
            onClick={toggleTheme}
            className="bg-accent text-white p-2 rounded hover:bg-hover"
          >
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;