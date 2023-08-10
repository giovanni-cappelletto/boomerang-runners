import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import AllEvents from "./pages/all-events.jsx";
import CreateEvent from "./pages/admin/create-event.jsx";
import Settings from "./pages/admin/settings.jsx";
import Subscription from "./pages/subscription/subscription.jsx";
import Documentation from "./pages/documentation/documentation.jsx";
import PageNotFound from "./pages/page-not-found";
import EventsImage2 from "./assets/documentationFiles/events/image2.png";
import EventsImage3 from "./assets/documentationFiles/events/image3.png";
import EventsImage4 from "./assets/documentationFiles/subscription/image1.png";
import EventsImage5 from "./assets/documentationFiles/user_settings/image1.png";
import EventsImage6 from "./assets/documentationFiles/user_settings/image2.png";
import EventsImage7 from "./assets/documentationFiles/errors/image1.png";
import EventsImage8 from "./assets/documentationFiles/errors/image2.png";
import EventsImage9 from "./assets/documentationFiles/create_events/image1.png";
import EventsImage10 from "./assets/documentationFiles/event_settings/image1.png";
import EventsImage11 from "./assets/documentationFiles/event_settings/image2.png";
import "./App.css";

function App() {
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
          element={<img src={EventsImage2} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image2"
          element={<img src={EventsImage3} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image3"
          element={<img src={EventsImage4} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image4"
          element={<img src={EventsImage5} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image5"
          element={<img src={EventsImage6} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image6"
          element={<img src={EventsImage7} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image7"
          element={<img src={EventsImage8} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image8"
          element={<img src={EventsImage9} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image9"
          element={<img src={EventsImage10} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image10"
          element={<img src={EventsImage11} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
