import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommunityHome from "./pages/CommunityHome";
import Room from "./pages/Room";
import Login from "./pages/Login";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";



function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path = "/rooms/:roomName/:side" element = {<Room />}/>
        <Route path="/communities/:community" element={<CommunityHome />}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/create-user" element = {<CreateUser/>}/>
        <Route path = "/user/:username" element = {<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
