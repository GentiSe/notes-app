import "./App.css";
import React, { useState } from 'react';

type Note = {
  id: number,
  title:string,
  content:string
}
const App = () => {
  const [notes,setNotes] = useState<Note[]>([
{
  id:1,
  title:"note title 1",
  content:"content"
},
{
  id:2,
  title:"note title 1",
  content:"content"
},
{
  id:3,
  title:"note title 1",
  content:"content"
},
{
  id:4,
  title:"note title 1",
  content:"content"
},{
  id:5,
  title:"note title 1",
  content:"content"
}

  ])
  return (
    <div className="app-container">
      <form className="note-form">
        <input placeholder="Title" required />
        <textarea placeholder="Content" rows={10} required />

        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item">
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
        ))}
        
      </div>
    </div>
  );
};

export default App;