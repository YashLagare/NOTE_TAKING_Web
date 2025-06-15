// import Note from "../models/Note.js";

// //get all notes
// export async function getAllNotes(req,res){
//     try {
//         const notes = await Note.find().sort({createdAt:-1});// newest first
//         res.status(200).json(notes);
//     } catch (error) {
//         console.error("Error in getAllNotes Controller", error);
//         res.status(500).json({message:"Internal Server Error"});
//     }
// }

// //get specific note by id
// export async function getNoteById(req,res) {
//     try {
//         const note = await Note.findById(req.params.id);
//         if(!note) return res.status(404).json({message:"Note not found"})
//         res.json(note);
//     } catch (error) {
//         console.error("Error in getNoteById Controller", error);
//         res.status(500).json({message:"Internal Server Error"});
//     }
// }

// //create notes 
// export async function createNotes(req,res){
//     try {
//         const {title,content} = req.body
//         const note = new Note({title, content})

//         const savedNote = await note.save();
//         res.status(201).json(savedNote);

//     } catch (error) {
//         console.error("Error in createNotes Controller", error);
//         res.status(500).json({message:"Internal Server Error"});
//     }
// }

// //update notes 
// export async function updateNote(req,res) {
//     try {
//         const {title, content} = req.body
//         const updateNote = await Note.findByIdAndUpdate(req.params.id,{title, content},{
//             new:true //this will return the updated document/ record
//         });
//         if (!updateNote) return res.status(404).json({message:"Note not found"});
        
//         res.status(200).json(updateNote);
//     } catch (error) {
//         console.error("Error in updateNote Controller", error);
//         res.status(500).json({message:"Internal Server Error"});
//     }
// }

// //delete notes 
// export async function deleteNote(req,res) {
//     try {
//         const deletedNote = await Note.findByIdAndDelete(req.params.id);
//         if (!deletedNote) return res.status(404).json({message:"Note not found"});
//         res.status(200).json({message:"Note deleted successfully!"})
//     } catch (error) {
//         console.error("Error in deleteNote Controller", error);
//         res.status(500).json({message:"Internal Server Error"});
//     }
// }

import mongoose from "mongoose";
import Note from "../models/Note.js";

// get all notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// get specific note by id
export async function getNoteById(req, res) {
  const { id } = req.params;

  // ✅ Prevent CastError by validating ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }

  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// create notes 
export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNotes Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// update notes 
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // this will return the updated document
    );
    if (!updateNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updateNote);
  } catch (error) {
    console.error("Error in updateNote Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// delete notes 
export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote Controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
