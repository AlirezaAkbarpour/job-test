import './App.css'
import ProtectedRoute from './components/protectRoute';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

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
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  return (
    <UserContext.Provider value={user}>
      <div className='w-full flex justify-center items-center'>
      <RouterProvider router={router}/>
      </div>
    </UserContext.Provider>
  )
}

export default App;
