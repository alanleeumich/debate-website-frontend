import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";




function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/rooms/:roomName/:side" element = {<Room />}/>
        <Route exact path="/" element={<Home />}/>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App;
