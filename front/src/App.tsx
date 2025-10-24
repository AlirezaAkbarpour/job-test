import './App.css'
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/login',
    element: <LoginPage/>
  },
  {
    path:'/dashboard',
    element: <Dashboard/>
  },
  {
    path:'*',
    element:<LoginPage/>
  }
])

function App() {
  return (
    <div className='w-full flex justify-center items-center'>
    <RouterProvider router={router}/>
    </div>
  )
}

export default App;
