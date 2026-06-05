import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Onboarding from "./pages/Auth/Onboarding";
import "./App.css";
import ChatPage from "./pages/Chat/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Onboarding/>} />
        <Route path="/chat" element={<ChatPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
