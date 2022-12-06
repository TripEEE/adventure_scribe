import './Navbar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navbar({ onOpenSearchModal = () => { } }) {
  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <img className="logo" src={require("../logo.webp")} alt="logo" onClick={() => { window.location.href = '/landing' }}></img>
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="/landing" className="nav-link px-2 text-secondary">Home</a></li>
          </ul>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">

          </form>
          <div className="text-end">
            <button className="btn btn-outline-light me-2" onClick={onOpenSearchModal}>Search</button>
            <button type="button" className="btn btn-outline-light me-2"onClick={() => { window.location.href = '/login' }}>Login</button>
            <button type="button" className="btn btn-warning"onClick={() => { window.location.href = '/register' }}>Sign-up</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
