import './App.css'
import ProtectedRoute from './components/protectRoute';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path:'/login',
    element: <LoginPage/>
  },
  {
    path:'/dashboard',
    element: <ProtectedRoute><Dashboard/></ProtectedRoute> 
  },
  {
    path:'*',
    element:<Navigate to={'/dashboard'} replace/>
  },
  {
    path:'/',
    element: <Navigate to={'/dashboard'} replace/>
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
