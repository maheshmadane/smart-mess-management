import React from 'react';
import { useTranslation } from 'react-i18next';

function Rules() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('rules.title')}</h2>
      <div className="bg-white p-6 rounded shadow">
        <ul className="list-disc pl-6">
          <li>Maintain cleanliness in the dining area.</li>
          <li>Follow meal timings strictly.</li>
          <li>Provide feedback for improvement.</li>
          <li>No wastage of food allowed.</li>
        </ul>
      </div>
    </div>
  );
}

export default Rules;
