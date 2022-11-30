import './Application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './Landing'
import Navbar from './Navbar';
import Login from './Login'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function Application() {
  return (
    <main>
      <Router>
        <nav>
      <Navbar />
      </nav>
          <Routes>
            <Route path="/landing" element={<Landing/>}/>
          </Routes>
          <Routes>
          <Route path="/login" element={<Login/>}/>
          </Routes>
        </Router>
    </main>
    
  );
}

export default Application;
