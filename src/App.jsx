
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'

function App() {

  return (
    <>
    <BrowserRouter>

      <HeaderComponent/>

      <Routes>
        <Route path='/' 
          element={<h1>HOME</h1>}>
        </Route>
        <Route path='/employees' 
          element={<ListEmployeeComponent/>}>
        </Route>
        <Route path='/add-employees' 
          element={<EmployeeComponent/>}>
        </Route>
        <Route path='/edit-employees/:id' 
          element={<EmployeeComponent/>}>
        </Route>
      </Routes>

      <FooterComponent/>

    </BrowserRouter>
      
    </>
  )
}

export default App


