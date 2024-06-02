import Login from '../components/login'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from '../components/dashboard'
import Home from '../components/Home'
import Categorie from '../components/Categorie'
import Fonction from '../components/Fonction'
import Profile from '../components/Profile'
import AddPret from '../components/AddPret'
import AddNew from '../components/AddNew'
import Edith from '../components/Edith'

function App() { 

  return (
  <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}>
        <Route path='' element={<Home/>}></Route>
        <Route path='/dashboard/element' element={<Home/>}></Route>
        <Route path='/dashboard/categorie' element={<Categorie/>}></Route>
        <Route path='/dashboard/fonction' element={<Fonction/>}></Route>
        <Route path='/dashboard/profile' element={<Profile/>}></Route>
        <Route path='/dashboard/add_Pret' element={<AddPret/>}></Route>
        <Route path='/dashboard/add_New' element={<AddNew/>}></Route>
        <Route path='/dashboard/edith_fonct/:num_compte' element={<Edith/>}></Route>
        <Route path='/dashboard/delete_fonct/:num_compte' element={<Fonction/>}></Route>

      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
