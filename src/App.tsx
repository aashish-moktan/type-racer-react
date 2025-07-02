import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Layout from "./components/Layout";
import TypingRace from "./components/TypingRace";
import PracticeRace from "./components/PracticeRace";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/typing-race" element={<TypingRace />} />
            <Route path="/practice-race" element={<PracticeRace />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
