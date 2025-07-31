import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/summary/')
      .then(response => setSummary(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:8000/api/menu/')
      .then(response => setMenu(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">{t('home.meal_count')}</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>{t('home.breakfast')}</h3>
          <p>{summary.breakfast || 0} {t('home.students')}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>{t('home.lunch')}</h3>
          <p>{summary.lunch || 0} {t('home.students')}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3>{t('home.dinner')}</h3>
          <p>{summary.dinner || 0} {t('home.students')}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">{t('home.menu')}</h2>
      <div className="grid grid-cols-3 gap-4">
        {menu.map(item => (
          <div key={item.id} className="bg-white p-4 rounded shadow">
            <h3>{item.meal_type}</h3>
            <p>{item.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
