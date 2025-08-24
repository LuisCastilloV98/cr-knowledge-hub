import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TopicDetail from "./pages/TopicDetail";
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topic/:slug" element={<TopicDetail />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App
