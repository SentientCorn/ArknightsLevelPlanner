// import supabase from './config/supabase'
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </Router>
  )

}

export default App
