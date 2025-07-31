import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function FeedbackForm() {
  const { t } = useTranslation();
  const [mealType, setMealType] = useState('Breakfast');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/feedback/', {
        student: 'student_id_placeholder', // Replace with actual student ID from auth
        meal_type: mealType,
        feedback_text: feedback,
        date: new Date().toISOString().split('T')[0],
      });
      alert('Feedback submitted');
      setFeedback('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">{t('feedback.title')}</h2>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">{t('feedback.meal_type')}</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Breakfast">{t('home.breakfast')}</option>
            <option value="Lunch">{t('home.lunch')}</option>
            <option value="Dinner">{t('home.dinner')}</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">{t('feedback.feedback')}</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white p-2 rounded w-full"
        >
          {t('feedback.submit')}
        </button>
      </div>
    </div>
  );
}

export default FeedbackForm;
