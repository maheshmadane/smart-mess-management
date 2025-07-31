import React from 'react';
import { useTranslation } from 'react-i18next';

function AdminDashboard() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>Admin features to be implemented: Manage students, snacks, menus, and images.</p>
        <p>Use Django Admin at <a href="http://localhost:8000/admin" className="text-blue-600">/admin</a> for now.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
