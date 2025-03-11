import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Register from "./Component/Register";
import Edit from "./Component/Edit";
import Detail from "./Component/Detail";


function App() {
  return (
    <Router>
    <Navbar />
       <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/view/:id" element={<Detail />} />
          
        </Routes>
       </div>
    </Router>
  );
}

export default App;
