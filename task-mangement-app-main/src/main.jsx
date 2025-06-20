import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from "./pages/HomePage.jsx"
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.jsx'
import TaskList from './components/TaskList.jsx'
import AddTasksPage from "./pages/AddTasksPage.jsx"

import './index.css'

function App(){
  return(
    
    <BrowserRouter >
     <Routes >
      <Route path='/' element={<HomePage/>} > 
            
        <Route index element={<TaskList />}  />
             
        <Route path="/add-task" element={<AddTasksPage />} />
             
      </Route>
             
      <Route path='*'element={<ErrorPage />} />
  
      </Routes>
    </BrowserRouter>
  )
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
