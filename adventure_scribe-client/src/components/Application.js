import './Application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing'
import Navbar from './Navbar';
import Login from './Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainContainer from './Map/MainContainer';
import Register from './Register';

function Application() {
  return (
    <main>
      <nav>
        <Navbar />
      </nav>

      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
        </Routes>
        <Routes>
          <Route path="/campaign" element={<MainContainer />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </main>

  );
}

export default Application;
