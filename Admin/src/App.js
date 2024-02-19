import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Root from './pages/Root'
import Hotel from './pages/Hotel'
import NewHotel from './pages/NewHotel'
import Rooms from './pages/Rooms'
import NewRoom from './pages/NewRoom'
import Transactions from './pages/Transactions'
import EditHotel from './pages/EditHotel'
import EditRoom from './pages/EditRoom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, 
    children: [
      {
        index: true,
        element: <Dashboard />
      }, 
      {
        path: 'hotels',
        element: <Hotel />
      },
      {
        path: 'new-hotel',
        element: <NewHotel />
      },
      {
        path: 'rooms',
        element: <Rooms />
      },
      {
        path: 'new-room',
        element: <NewRoom />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'edit-hotel/:hotelId',
        element: <EditHotel />
      },
      {
        path: 'edit-room/:roomId',
        element: <EditRoom />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App