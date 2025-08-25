import "./App.css";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Requests from "./Pages/Requests";
import Connections from "./Pages/Connections";
import LoginPage from "./Pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
