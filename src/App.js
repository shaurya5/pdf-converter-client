import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Submit from './components/Submit'
import LoginPage from "./components/LoginPage";
import SignUp from './components/SignUp'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  );
}

export default App;
