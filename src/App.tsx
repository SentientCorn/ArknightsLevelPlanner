// import supabase from './config/supabase'
import './styles.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Header from './components/Header';

function App() {
  return (
    <div className="App">
    <Router >
      <Header />
      {/* Main content area */}
      <main >
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </Router>
    </div>
  )

}

export default App
