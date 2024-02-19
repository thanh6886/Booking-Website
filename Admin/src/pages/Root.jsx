import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import classes from './Root.module.css'
import { Outlet } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Root = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const currentUser =
      JSON.parse(localStorage.getItem('currentUser')) || undefined
    setIsLogin(() => {
      return currentUser ? true : false
    })
  }, [])

  return (
    <>
      {isLogin && (
        <div className={classes.container}>
          <Sidebar />
          <section className={classes['main-content']}>
            <div className={classes.decor} />
            <div className={classes.main}>
              <Outlet />
            </div>
          </section>
        </div>
      )}
      {!isLogin && <LoginForm />}
    </>
  )
}

export default Root
