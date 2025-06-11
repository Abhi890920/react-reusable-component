import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FormDemo from "./pages/FormDemo";
import TableDemo from "./pages/TableDemo";


function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form-demo" element={<FormDemo />} />
            <Route path="/table-demo" element={<TableDemo />} />
        </Routes>
    );
}

export default AppRouters;
