import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'
import RootPage from './pages/Root'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { SearchDataContextProvider } from './store/search-data-context'
import Transaction from './pages/Transaction'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'detail/:hotelId', 
        element: <Detail />, 
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'transactions/:userId',
        element: <Transaction />
      }
    ],
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

function App() {
  return (
    <SearchDataContextProvider>
      <RouterProvider router={router} />
    </SearchDataContextProvider>
  )
}

export default App
