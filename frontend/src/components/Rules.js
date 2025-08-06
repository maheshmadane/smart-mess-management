import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function Rules() {
  const { t } = useTranslation();
  const [rules, setRules] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rules/');
        setRules(response.data);
        toast.success('Rules fetched');
      } catch (error) {
        toast.error('Error fetching rules');
      }
    };
    fetchRules();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Rules</h1>
      <div className="space-y-2">
        {rules.map((rule, index) => (
          <div key={rule.id} className="bg-secondary p-4 rounded-lg shadow-md">
            <button
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              className="w-full text-left font-semibold flex justify-between items-center"
            >
              {rule.title}
              <i className={`fas ${activeIndex === index ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
            {activeIndex === index && <p className="mt-2">{rule.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rules;