import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { NoteCard } from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect(() => {
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes"); // we dont need to add whole url again and agian because we  alrady added in axios.js file as base url
      setNotes(res.data); // ✅ Don't forget to actually set the notes!
      setIsRateLimited(false);
    } catch (error) {
      console.log("Error fetching notes");
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to load notes");
      }
    } finally {
      setLoading(false);
    }
  };

     // ✅ Fetch notes on mount or after note creation
  if (location.state?.noteCreated) {
    fetchNotes();
    window.history.replaceState({}, document.title); // Clear state after reading
  } else {
    fetchNotes();
  }

  },[]);

  return (
    <div className="min-h-screen">
    <Navbar/>

     {isRateLimited && <RateLimitedUI/>}

     <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) =>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
     </div>
  </div>
  );
  
};
export default HomePage