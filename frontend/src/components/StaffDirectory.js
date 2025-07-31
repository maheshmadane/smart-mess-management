import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

function StaffDirectory() {
  const { t } = useTranslation();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/staff/')
      .then(response => setStaff(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t('staff.title')}</h2>
      <div className="grid grid-cols-3 gap-4">
        {staff.map(member => (
          <div key={member.staff_id} className="bg-white p-4 rounded shadow">
            <h3>{t('staff.name')}: {member.name}</h3>
            <p>{t('staff.role')}: {member.role}</p>
            <p>{t('staff.contact')}: {member.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffDirectory;
