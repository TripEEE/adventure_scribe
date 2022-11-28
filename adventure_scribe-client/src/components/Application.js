import './Application.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Mapview from './Mapview';

function Application() {
  return (
    <main>
      <Navbar />
        <Mapview />
    </main>
  );
}

export default Application;
