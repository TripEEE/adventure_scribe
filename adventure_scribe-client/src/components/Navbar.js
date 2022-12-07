import './Navbar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import client from '../client'


function Navbar({ onOpenSearchModal = () => { } }) {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const handleLogout = () => {
    client.logout()
    window.location.href = "/"
  }
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img className="logo" src={require("../logo.webp")} alt="logo" onClick={() => navigate('/')}></img>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><Link to="/" className="nav-link px-2 text-secondary">Home</Link></li>
          </ul>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">

          </form>
          <div className="text-end">
            <button className="btn btn-outline-light me-2" onClick={onOpenSearchModal}>Search</button>
            {
              user ?
                <>
                  <button type="button" className="btn btn-outline-light me-2" onClick={handleLogout}>Logout</button>
                </>
                :
                <>
                  <button type="button" className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
                  <button type="button" className="btn btn-warning" onClick={() => navigate('/register')}>Sign-up</button>
                </>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
