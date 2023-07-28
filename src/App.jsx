import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import AllEvents from "./pages/all-events.jsx";
import CreateEvent from "./pages/admin/create-event.jsx";
import Settings from "./pages/admin/settings.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
