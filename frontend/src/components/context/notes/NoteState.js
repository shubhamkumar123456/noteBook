
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:3001"
  const notesInitial = [];

  const [notes, setnotes] = useState(notesInitial);
  // get all notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':  localStorage.getItem('token')
      }
    });
    const allnotes = await response.json()
    // console.log(allnotes);
    setnotes(allnotes)
  }

  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json()
    // console.log(note)
    setnotes(notes.concat(note))

  }
  // delete a note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    });
    const json = response.json();
    // console.log(json)
    // console.log("deleting the note id ", id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  //edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    let newNotes= notes.slice()
    // let newNotes = JSON.parse(json.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;