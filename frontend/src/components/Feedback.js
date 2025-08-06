import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function Feedback() {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState({ rating: 0, comment: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/feedback/', feedback);
      toast.success('Feedback submitted');
      setFeedback({ rating: 0, comment: '' });
    } catch (error) {
      toast.error('Error submitting feedback');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-secondary rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">{t('feedback.title')}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">{t('feedback.rating')}</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fas fa-star cursor-pointer ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setFeedback({ ...feedback, rating: star })}
              ></i>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">{t('feedback.comment')}</label>
          <textarea
            value={feedback.comment}
            onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-accent text-white p-2 rounded hover:bg-hover">
          {t('feedback.submit')}
        </button>
      </form>
    </div>
  );
}

export default Feedback;