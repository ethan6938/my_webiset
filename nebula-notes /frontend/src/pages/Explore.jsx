import React, { useEffect, useState } from 'react';

export default function Explore() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/notes')
      .then(res => res.json())
      .then(setNotes);
  }, []);

  return (
    <div>
      <h1>Public Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>By: {note.owner.username}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
