import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      // Simulate login (replace with actual API call)
      toast.success('Login successful');
      navigate('/dashboard');
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-secondary rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t('login.title')}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">{t('login.username')}</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">{t('login.password')}</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-accent text-white p-2 rounded hover:bg-hover">
          {t('login.submit')}
        </button>
      </form>
    </div>
  );
}

export default Login;