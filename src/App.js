import Dashboard from "./components/Dashboard";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Submit from './components/Submit'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </Router>
  );
}

export default App;
