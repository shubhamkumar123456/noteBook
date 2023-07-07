
import NoteContext from './context/notes/NoteContext';
import React, { useContext, useState } from 'react'

const Addnotes = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [note, setnote] = useState({ title: "", Description: "", tag: "" });
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.Description, note.tag);
        setnote({ title: "", Description: "", tag: "" })
        props.showAlert("Added successfully", "success")
    }
    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h2> Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name='title' value={note.title} id="title" aria-describedby="emailHelp" onChange={onchange} placeholder={"must be atleast 5 character"} required/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="Description" className="form-label">Description</label>
                        <input type="text" className="form-control" name='Description' value={note.Description} id="Description" onChange={onchange} placeholder={"must be atleast 5 character"}  required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" name='tag' value={note.tag} id="tag" onChange={onchange} placeholder={"must be atleast 5 character"} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>

        </div>
    )
}

export default Addnotes
