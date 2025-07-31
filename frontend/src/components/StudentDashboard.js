import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function StudentDashboard() {
  const { t } = useTranslation();
  const [data, setData] = useState({ meals: [], attendance: [], notes: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mealsRes, attendanceRes, notesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/attendance/'),
          axios.get('http://127.0.0.1:8000/api/attendance/'),
          axios.get('http://127.0.0.1:8000/api/notes/'),
        ]);
        setData({
          meals: mealsRes.data,
          attendance: attendanceRes.data,
          notes: notesRes.data,
        });
        toast.success('Dashboard data fetched');
      } catch (error) {
        toast.error('Error fetching dashboard data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Meal History</h2>
          <ul>
            {data.meals.map((meal) => (
              <li key={meal.id} className="p-2">{meal.date}: {meal.meal_type}</li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Attendance Calendar</h2>
          <ul>
            {data.attendance.map((att) => (
              <li key={att.id} className="p-2">{att.date}: {att.present ? 'Present' : 'Absent'}</li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Personal Notes</h2>
          <ul>
            {data.notes.map((note) => (
              <li key={note.id} className="p-2">{note.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;