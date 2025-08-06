import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Rules from './components/Rules';
import SnackBoard from './components/SnackBoard';
import StaffDirectory from './components/StaffDirectory';
import Menu from './components/Menu';
import Feedback from './components/Feedback';
import NotesBoard from './components/NotesBoard';
import ContactUs from './components/ContactUs';
import StudentDashboard from './components/StudentDashboard';
import AdminPanel from './components/AdminPanel';
import Gallery from './components/Gallery';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} setTheme={setTheme} />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/snackboard" element={<SnackBoard />} />
          <Route path="/staff" element={<StaffDirectory />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/notes" element={<NotesBoard />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;