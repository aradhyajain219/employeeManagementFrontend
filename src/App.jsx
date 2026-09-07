import './App.css'
import HeaderComponent from './Components/HeaderComponent'
import ListEmployeeComponent from './Components/ListEmployeeComponent'
import FooterComponent from './Components/FooterComponent'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import EmployeeComponent from './Components/EmployeeComponent'

function App() {
  return (
    <>

    <BrowserRouter basename={import.meta.env.BASE_URL}>
    <HeaderComponent/>

    <Routes>
      <Route path='/' element={<ListEmployeeComponent />} />
      <Route path='/employees' element={<ListEmployeeComponent />} />
      <Route path='/add-employee' element={<EmployeeComponent />} />
      <Route path='/update-employee/:id' element={<EmployeeComponent />} />

    </Routes>
    <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
