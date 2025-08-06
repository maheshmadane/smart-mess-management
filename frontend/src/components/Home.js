import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function Home() {
  const { t } = useTranslation();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/daily-summary/');
        setSummary(response.data);
        toast.success('Summary fetched successfully');
      } catch (error) {
        console.error('Error fetching summary:', error);
        toast.error('Failed to fetch summary');
      }
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-secondary p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{t('home.title')}</h1>
        <p className="mt-2">{t('home.description')}</p>
      </div>
      <div className="bg-accent text-white p-4 rounded-lg animate-pulse">
        <p className="text-lg font-semibold">Announcement: Mess closed on Dec 25th!</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{t('home.meal_count')}</h2>
          <p className="mt-2">{summary ? `Total Meals: ${summary.total_attendance}` : 'Loading...'}</p>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{t('home.menu')}</h2>
          <p className="mt-2">{summary ? summary.menu : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;