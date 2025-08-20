
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Feed from "./Pages/Feed";
import Login from "./components/Forms/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
        <Route path="/" element={<Feed />}/>
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
