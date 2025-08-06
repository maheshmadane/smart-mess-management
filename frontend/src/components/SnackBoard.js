import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function SnackBoard() {
  const { t } = useTranslation();
  const [snacks, setSnacks] = useState([]);
  const [newSnack, setNewSnack] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/snacks/');
        setSnacks(response.data);
        toast.success('Snacks fetched');
      } catch (error) {
        toast.error('Error fetching snacks');
      }
    };
    fetchSnacks();
  }, []);

  const addSnack = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/snacks/', newSnack);
      toast.success('Snack added');
      setNewSnack({ name: '', price: '' });
      const res = await axios.get('http://127.0.0.1:8000/api/snacks/');
      setSnacks(res.data);
    } catch (error) {
      toast.error('Error adding snack');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Snack Board</h1>
      <form onSubmit={addSnack} className="mb-4">
        <div className="mb-4">
          <label className="block mb-1">Snack Name</label>
          <input
            type="text"
            value={newSnack.name}
            onChange={(e) => setNewSnack({ ...newSnack, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input
            type="number"
            value={newSnack.price}
            onChange={(e) => setNewSnack({ ...newSnack, price: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-accent text-white p-2 rounded hover:bg-hover">
          Add Snack
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {snacks.map((snack) => (
          <div key={snack.id} className="bg-secondary p-4 rounded-lg shadow-md">
            <p>{snack.name} - ₹{snack.price}</p>
            <button
              onClick={async () => {
                await axios.delete(`http://127.0.0.1:8000/api/snacks/${snack.id}/`);
                setSnacks(snacks.filter((s) => s.id !== snack.id));
                toast.success('Snack deleted');
              }}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SnackBoard;