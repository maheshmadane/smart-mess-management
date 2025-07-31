import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function Login() {
  const { t } = useTranslation();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/students/login/', {
        student_id: studentId,
        password,
      });
      // Store token or handle login success
      alert('Login successful');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{t('login.title')}</h2>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">{t('login.id')}</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t('login.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {t('login.submit')}
        </button>
      </div>
    </div>
  );
}

export default Login;