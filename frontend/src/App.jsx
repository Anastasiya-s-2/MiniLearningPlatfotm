import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Categories from "./pages/Categories";
function App() {
    return (
        <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/courses" element={<Courses />} />
                         <Route path="/categories" element={<Categories />}/>
                        <Route path="/users" element={<Register />}/>
                    </Routes>
                </BrowserRouter>
    );
}
export default App;