
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import IndexFront from './components/IndexFront';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';

function App() {
  // here 
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<IndexFront />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
