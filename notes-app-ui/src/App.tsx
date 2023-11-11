import "./App.css";
import React, { useState, FormEvent, useEffect } from 'react';

type Note = {
  id: number,
  title:string,
  content:string
}
const App = () => {
  const [notes,setNotes] = useState<Note[]>([])

  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')

  const [selectedNote, setSelectedNote] = useState<Note | null >(null) //can be empty

  const handleNoteClick = (note:Note) =>{
    setSelectedNote(note);
    setContent(note.content);
    setTitle(note.title)
  }

  const handleAddNote = async (event: React.FormEvent) => {
    event.preventDefault();

    try {    
      const response = await fetch("http://localhost:5000/api/notes",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      })

      const newNote = await response.json();

      setNotes([newNote, ...notes])
      setTitle("");
      setContent("");
      
    } catch (error) {
      console.log(error)
    }

  }

  const handleUpdatedNote = async (event:React.FormEvent) => {
    console.log("HandleUpdated")
    event.preventDefault();

    if(!selectedNote){
      return;
    }

    try {

      const response = await fetch(`http://localhost:5000/api/notes/${selectedNote.id}`, {
        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      })

      const updatedNote = await response.json();
      
      const updatedNotesList = notes.map((note)=>
      note.id === selectedNote.id ?
      updatedNote : note
  );

  setNotes(updatedNotesList);
  setTitle("");
  setContent("");
  setSelectedNote(null);

      
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null)
  
  }

  const deleteNote = async (event:React.MouseEvent, noteId: number) => {
    event.stopPropagation();

    try {

      await fetch(`http://localhost:5000/api/notes/${noteId}`,{method:"DELETE"})

      const updatedNotes = notes.filter((note) => note.id !== noteId)
      setNotes(updatedNotes);
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {

    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");

        const notes:Note[] = await response.json();
        setNotes(notes)
        
      } catch (e) {
        console.log(e)
      }
    }
fetchNotes();
  }, [])
  
  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(event) => 
        selectedNote ? handleUpdatedNote(event) :
        handleAddNote(event)}>
        <input
        value={title}
        onChange={(event) => {
          setTitle(event.target.value)
        }}
        placeholder="Title" required />
        <textarea
        value={content}
        onChange={(event)=> {
          setContent(event.target.value)
        }}
        placeholder="Content" rows={10} required />

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ): ( <button type="submit">Add Note</button>)}

       
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(event)=> deleteNote(event,note.id)}>x</button>
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