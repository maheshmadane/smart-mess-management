import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function SnackBoard() {
  const { t } = useTranslation();
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/snacks/')
      .then(response => setSnacks(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('snacks.title')}</h2>
      <div className="grid grid-cols-3 gap-4">
        {snacks.map(snack => (
          <div key={snack.snack_id} className="bg-white p-4 rounded shadow">
            <h3>{snack.name}</h3>
            <p>{t('snacks.price')}: ₹{snack.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SnackBoard;
