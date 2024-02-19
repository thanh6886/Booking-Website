import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'
import { useEffect, useState } from 'react'

const RootPage = () => {
  const [currentUser, setCurrentUser] = useState(undefined)

  const logoutAction = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    setCurrentUser(currentUser)
  }, [])

  return (
    <>
      <Navbar
        onLogout={logoutAction}
        email={currentUser?.email}
        isLogin={currentUser !== undefined && currentUser !== null}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootPage
