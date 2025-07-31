import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function Menu() {
  const { t } = useTranslation();
  const [menus, setMenus] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/menu/?date=${selectedDate}`);
        setMenus(response.data);
        toast.success('Menu fetched');
      } catch (error) {
        toast.error('Error fetching menu');
      }
    };
    fetchMenus();
  }, [selectedDate]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Menu</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-2 border rounded"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menus.map((menu) => (
          <div key={menu.id} className="bg-secondary p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{menu.date}</h2>
            <p>{menu.items}</p>
            {/* Placeholder for dish image */}
            <img src="https://via.placeholder.com/150" alt="Dish" className="mt-2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;