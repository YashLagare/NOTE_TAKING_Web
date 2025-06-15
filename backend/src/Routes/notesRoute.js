
import express from 'express';
import { createNotes, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notesController.js';

const routes = express.Router();

routes.get("/",getAllNotes)
routes.get("/:id",getNoteById)
routes.post("/",createNotes)
routes.put("/:id", updateNote)
routes.delete("/:id", deleteNote)



export default routes

