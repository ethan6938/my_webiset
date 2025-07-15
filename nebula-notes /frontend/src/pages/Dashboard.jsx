import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔄 Fetch notes
  const fetchNotes = () => {
    setLoading(true);
    setError(null);
    fetch('http://localhost:5000/api/notes', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then(data => {
        setNotes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setNotes([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ➕ Create new note
  const createNote = async () => {
    if (!title.trim() || !content.trim()) return alert('Title and content required');
    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to create note');
      setTitle('');
      setContent('');
      setShowForm(false);
      fetchNotes();
    } catch (err) {
      alert(err.message);
    }
  };

  // ✏️ Edit note
  const startEdit = (note) => {
    setEditId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
    setEditContent('');
  };

  const submitEdit = async () => {
    if (!editTitle.trim() || !editContent.trim()) return alert('Title and content required');
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${editId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to update note');
      cancelEdit();
      fetchNotes();
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete note, status: ${res.status}`);
      }

      // Optional: await res.text(); if server sends no JSON
      const data = await res.json();
      console.log('Note deleted:', data);

      // Remove from UI
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };


  // 🚪 Logout
  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'false');
        onLogout();       // <-- Use prop function here to update login state in App
        navigate('/');         // <-- Redirect to login page or homepage
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout network error:', err);
    }
  };
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#333' }}>📒 My Notes</h1>
        <button onClick={handleLogout} style={{ padding: '0.4rem 1rem', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Toggle form button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {showForm ? 'Cancel' : 'New Note'}
        </button>
      </div>

      {/* New Note Form */}
      {showForm && (
        <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', fontSize: '1rem' }}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '0.5rem' }}
          />
          <button
            onClick={createNote}
            style={{
              padding: '0.5rem 1.2rem',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Add Note
          </button>
        </div>
      )}

      {/* Notes list */}
      {loading && <p>Loading notes...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && (
        <>
          {notes.length === 0 ? (
            <p>No notes found. Click "New Note" to create one!</p>
          ) : (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {notes.map(note => (
                <li
                  key={note._id}
                  style={{
                    border: '1px solid #ddd',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: 8,
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  {editId === note._id ? (
                    <>
                      <input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                      />
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        rows={3}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                      />
                      <button onClick={submitEdit} style={{ marginRight: 8, padding: '0.4rem 1rem' }}>
                        Save
                      </button>
                      <button onClick={cancelEdit} style={{ padding: '0.4rem 1rem' }}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 style={{ margin: '0 0 0.5rem 0' }}>{note.title}</h3>
                      <p style={{ margin: '0 0 1rem 0' }}>{note.content}</p>
                      <button
                        onClick={() => startEdit(note)}
                        style={{ marginRight: 8, padding: '0.4rem 1rem', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        style={{
                          padding: '0.4rem 1rem',
                          cursor: 'pointer',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
