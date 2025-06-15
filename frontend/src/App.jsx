import { Route, Routes } from "react-router";

import CreatePage from "./Pages/CreatePage";
import HomePage from "./Pages/HomePage";
import NoteDetailPage from "./Pages/NoteDetailPage";


const App = () => {
  return(
  <div className="relative h-full w-full" >
     <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/Create" element={<CreatePage />}/>
      <Route path="/note/:id" element={<NoteDetailPage />}/>
    </Routes>
  </div>
  );
};
export default App;