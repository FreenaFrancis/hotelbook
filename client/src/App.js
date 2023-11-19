import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Bookingscreen from './screens/Bookingscreen';
import RegisterScreen from './screens/RegisterScreen';
import Loginscreen from './screens/Loginscreen';
import ProfileScreen, { Cart } from './screens/ProfileScreen';
import Adminscreen from './screens/Adminscreen';

import AddCart from './components/AddCart';
import UpdateRoom from './screens/updateRoom';
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
          <Route path='/cart/:roomid' element={<AddCart/>} />
          <Route path='/update/:roomid' element={<UpdateRoom/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
