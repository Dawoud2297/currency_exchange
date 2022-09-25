import './App.css';
import Currency from './components/Currency';
import Login from './components/Login system/Login';

import {BrowserRouter ,Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Currency/>}/>
        {/* <Route path='/login' element={<Login/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
