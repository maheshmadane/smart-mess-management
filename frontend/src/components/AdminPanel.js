import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminPanel() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ username: '', email: '' });
  const [newMenu, setNewMenu] = useState({ date: '', items: '' });
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, feedbackRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/students/'),
          axios.get('http://127.0.0.1:8000/api/feedback/'),
        ]);
        setStudents(studentsRes.data);
        setFeedback(feedbackRes.data);
        toast.success('Data fetched successfully');
      } catch (error) {
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  const addStudent = async (studentData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/students/', studentData);
    console.log('Student added:', response.data);
  } catch (error) {
    console.error('Error adding student:', error.response.data);
  }
  };
  const addMenu = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/menu/', newMenu);
      toast.success('Menu added');
      setNewMenu({ date: '', items: '' });
    } catch (error) {
      toast.error('Error adding menu');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Manage Students</h2>
          <form onSubmit={addStudent} className="mt-4">
            <div className="mb-4">
              <label className="block mb-1">Username</label>
              <input
                type="text"
                value={newStudent.username}
                onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-hover">
              Add Student
            </button>
          </form>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Student List</h3>
            <ul>
              {students.map((student) => (
                <li key={student.id} className="flex justify-between p-2">
                  <span>{student.username}</span>
                  <button
                    onClick={async () => {
                      await axios.delete(`http://127.0.0.1:8000/api/students/${student.id}/`);
                      setStudents(students.filter((s) => s.id !== student.id));
                      toast.success('Student deleted');
                    }}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Manage Menu</h2>
          <form onSubmit={addMenu} className="mt-4">
            <div className="mb-4">
              <label className="block mb-1">Date</label>
              <input
                type="date"
                value={newMenu.date}
                onChange={(e) => setNewMenu({ ...newMenu, date: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Items</label>
              <input
                type="text"
                value={newMenu.items}
                onChange={(e) => setNewMenu({ ...newMenu, items: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-hover">
              Add Menu
            </button>
          </form>
        </div>
        <div className="bg-secondary p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Feedback Summary</h2>
          <ul>
            {feedback.map((item) => (
              <li key={item.id} className="p-2">
                {item.rating} Stars: {item.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;