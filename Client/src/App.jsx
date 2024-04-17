import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

import { Error } from "./pages/Error";
import { Navbars } from "./components/Navbars";

const App = ()=>{
  return (
    <>
    <Router>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
    </>
  )

}

export default App;