
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import IndexFront from './components/IndexFront';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import CreateGoal from './components/CreateGoal';
import CreatePost from './components/CreatePost';

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
            <Route path="/profile/creategoal" element={<CreateGoal />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
