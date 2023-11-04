import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Bookingscreen from './screens/Bookingscreen';
import RegisterScreen from './screens/RegisterScreen';
import Loginscreen from './screens/Loginscreen';
import ProfileScreen from './screens/ProfileScreen';
import Adminscreen from './screens/Adminscreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/home' element={<HomeScreen />} />
          {/* <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen />} /> */}
          <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen />} />

          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/login' element={<Loginscreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/admin' element={<Adminscreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
