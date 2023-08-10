import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import AllEvents from "./pages/all-events.jsx";
import CreateEvent from "./pages/admin/create-event.jsx";
import Settings from "./pages/admin/settings.jsx";
import Subscription from "./pages/subscription/subscription.jsx";
import Documentation from "./pages/documentation/documentation.jsx";
import PageNotFound from "./pages/page-not-found";
import EventsImage1 from "./assets/documentationFiles/events/image1.png";
import EventsImage2 from "./assets/documentationFiles/events/image2.png";
import EventsImage3 from "./assets/documentationFiles/events/image3.png";
import SubscriptionImage1 from "./assets/documentationFiles/subscription/image1.png";
import UserSettingsImage1 from "./assets/documentationFiles/user_settings/image1.png";
import UserSettingsImage2 from "./assets/documentationFiles/user_settings/image2.png";
import ErrorsImage1 from "./assets/documentationFiles/errors/image1.png";
import ErrorsImage2 from "./assets/documentationFiles/errors/image2.png";
import CreateEventsImage1 from "./assets/documentationFiles/create_events/image1.png";
import EventSettingsImage1 from "./assets/documentationFiles/event_settings/image1.png";
import EventSettingsImage2 from "./assets/documentationFiles/event_settings/image2.png";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages */}
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

        {/* Images Routes */}
        <Route
          path="/documentation/documentationFiles/events/image1"
          element={<img src={EventsImage1} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image2"
          element={<img src={EventsImage2} />}
        />
        <Route
          path="/documentation/documentationFiles/events/image3"
          element={<img src={EventsImage3} />}
        />
        <Route
          path="/documentation/documentationFiles/subscription/image1"
          element={<img src={SubscriptionImage1} />}
        />
        <Route
          path="/documentation/documentationFiles/user_settings/image1"
          element={<img src={UserSettingsImage1} />}
        />
        <Route
          path="/documentation/documentationFiles/user_settings/image2"
          element={<img src={UserSettingsImage2} />}
        />
        <Route
          path="/documentation/documentationFiles/errors/image1"
          element={<img src={ErrorsImage1} />}
        />
        <Route
          path="/documentation/documentationFiles/errors/image2"
          element={<img src={ErrorsImage2} />}
        />
        <Route
          path="/documentation/documentationFiles/create_events/image1"
          element={<img src={CreateEventsImage1} />}
        />
        <Route
          path="/documentation/documentationFiles/event_settings/image1"
          element={<img src={EventSettingsImage1} />}
        />
        <Route
          path="/documentation/documentationFiles/event_settings/image2"
          element={<img src={EventSettingsImage2} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
