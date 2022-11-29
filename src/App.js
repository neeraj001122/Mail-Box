import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignUpPage from './Components/Authentication/SignUpPage';
import LoginPage from './Components/Authentication/LoginPage';
import Welcome from './Components/Pages/Welcome';

function App() {
  return (
    <Routes>
      <Route path='/welcome' element={<Welcome />}></Route>
      <Route path='' element={<SignUpPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
} 

export default App;
