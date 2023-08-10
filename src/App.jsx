import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import AllEvents from "./pages/all-events.jsx";
import CreateEvent from "./pages/admin/create-event.jsx";
import Settings from "./pages/admin/settings.jsx";
import Subscription from "./pages/subscription/subscription.jsx";
import Documentation from "./pages/documentation/documentation.jsx";
import PageNotFound from "./pages/page-not-found";
import EventsImage1 from "./assets/documentationFiles/events/image1.png";
import "./App.css";

function App() {
  console.log(EventsImage1);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/documentation/introduction" element={<Documentation />} />
        <Route path="/documentation/events" element={<Documentation />} />
        <Route path="/documentation/subscription" element={<Documentation />} />
        <Route
          path="/documentation/user_settings"
          element={<Documentation />}
        />
        <Route path="/documentation/errors" element={<Documentation />} />
        <Route
          path="/documentation/create_events"
          element={<Documentation />}
        />
        <Route
          path="/documentation/event_settings"
          element={<Documentation />}
        />
        <Route
          path="/documentation/documentationFiles/events/image1"
          element={<img src={EventsImage1} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
