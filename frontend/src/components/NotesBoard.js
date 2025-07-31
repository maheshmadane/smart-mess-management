import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';

function NotesBoard() {
  const { t } = useTranslation();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/notes/');
        setNotes(response.data);
        toast.success('Notes fetched');
      } catch (error) {
        toast.error('Error fetching notes');
      }
    };
    fetchNotes();
  }, []);

  const addNote = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/notes/', { content: newNote });
      toast.success('Note added');
      setNewNote('');
      const res = await axios.get('http://127.0.0.1:8000/api/notes/');
      setNotes(res.data);
    } catch (error) {
      toast.error('Error adding note');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notes Board</h1>
      <form onSubmit={addNote} className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Add a note..."
        ></textarea>
        <button type="submit" className="mt-2 bg-accent text-white p-2 rounded hover:bg-hover">
          Add Note
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div key={note.id} className="bg-secondary p-4 rounded-lg shadow-md">
            <p>{note.content}</p>
            <button
              onClick={async () => {
                await axios.delete(`http://127.0.0.1:8000/api/notes/${note.id}/`);
                setNotes(notes.filter((n) => n.id !== note.id));
                toast.success('Note deleted');
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

export default NotesBoard;