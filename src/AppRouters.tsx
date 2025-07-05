import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FormDemo from "./pages/FormDemo";
import TableDemo from "./pages/TableDemo";
import ButtonExamples from "./component/ButtonExamples";
import FileUploadDemo from "./pages/FileUploadDemo";


function AppRouters() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/form-demo" element={<FormDemo />} />
            <Route path="/table-demo" element={<TableDemo />} />
            <Route path="/button-examples" element={<ButtonExamples />} />
            <Route path="/file-upload" element={<FileUploadDemo />} />
        </Routes>
    );
}

export default AppRouters;
