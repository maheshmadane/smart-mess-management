import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function StaffDirectory() {
  const { t } = useTranslation();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/staff/');
        setStaff(response.data);
        toast.success('Staff fetched');
      } catch (error) {
        toast.error('Error fetching staff');
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Staff Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staff.map((member) => (
          <div key={member.id} className="bg-secondary p-4 rounded-lg shadow-md">
            <img src={member.photo || 'https://via.placeholder.com/150'} alt={member.name} className="w-24 h-24 rounded-full mb-2" />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p>Role: {member.role}</p>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffDirectory;