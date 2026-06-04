import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import "./App.css";
// import Chat from "./components/Chat";
// import Auth from "./components/Auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
