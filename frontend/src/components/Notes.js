import React, { useContext, useEffect, useRef, useState } from "react";
import Addnotes from "./Addnotes";
import NoteContext from "./context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
   else{
    navigate("/login");
   }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refclose = useRef(null);
  const [note, setnote] = useState({id:"", etitle: "", edescription: "", etag: "default" });

const updateNote = (currentNote) => {
 
  setnote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  ref.current.click();
  
};
const handleclick = (e) => {
  console.log("updating the note", note);
  editNote(note.id, note.etitle,note.edescription,note.etag)
  refclose.current.click();
  props.showAlert("Updated successfully", "success")
}

const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
}
  return (
    <>
      <Addnotes showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control"  value={note.etitle} name='etitle' id="etitle" aria-describedby="emailHelp" onChange={onchange} required/>

                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control"  value={note.edescription} name='edescription' id="edescription" onChange={onchange}  required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" value={note.etag} name='etag' id="etag" onChange={onchange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="button" onClick={handleclick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2> Your Notes</h2>
        <div className="container">
        {notes.length===0 && 'no notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert}  note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
