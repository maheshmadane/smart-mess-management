import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Home from './components/Home';
import AdminDashboard from './components/AdminDashboard';
import SnackBoard from './components/SnackBoard';
import FeedbackForm from './components/FeedbackForm';
import Login from './components/Login';
import Rules from './components/Rules';
import Gallery from './components/Gallery';
import StaffDirectory from './components/StaffDirectory';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-2xl">{t('home.title')}</h1>
            <div>
              <select onChange={(e) => changeLanguage(e.target.value)} className="bg-blue-700 p-2 rounded text-white">
                <option value="en">{t('language.en')}</option>
                <option value="hi">{t('language.hi')}</option>
                <option value="mr">{t('language.mr')}</option>
              </select>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/snacks" element={<SnackBoard />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/staff" element={<StaffDirectory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
