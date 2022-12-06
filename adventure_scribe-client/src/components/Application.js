import './Application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Landing from './Landing'
import Navbar from './Navbar';
import Login from './Login'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainContainer from './Map/MainContainer';
import Register from './Register';
import Search from './Search'

function Application() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  return (
    <main>
      <nav>
        <Navbar onOpenSearchModal={() => setIsSearchModalOpen(true)} />
      </nav>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/campaign/:campaignId" element={<MainContainer />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
      <div className="overlay-container">
        {isSearchModalOpen && (
          <Search onCloseModal={() => setIsSearchModalOpen(false)} />
        )}
      </div>
    </main>

  );
}

export default Application;
