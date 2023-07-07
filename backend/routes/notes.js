const express = require('express')
const router = express.Router();
var fetchuser = require('../middleware/fetchuser')
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');

//Route 1: get all the Notes  using : GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }

})
// ROUTE2: Add a new Note using : POST "/api/notes/addnote"  . login required
router.post('/addnotes', fetchuser, [
    body('title', "enter a valid title").isLength({ min: 3 }),
    body('description', "description must be atleast 5 character").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

// ROUTE3: update an existing Note using PUT "/api/notes/updatenote"  .login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
       

        //find the note to be delete and delete it
        let note = await Notes.findById(req.params.id)
        console.log(req.params.id)
        console.log(note)
        if (!note) { return res.status(404).send("Not Found") }
        // allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Seccess":"Note has been deleted",note:note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

// ROUTE4: delete an existing Note using DELETE "/api/notes/updatenote"  .login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        console.log(req.params.id)
        console.log(note)
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

module.exports = router