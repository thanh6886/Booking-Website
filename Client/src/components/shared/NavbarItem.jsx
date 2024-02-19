import React from 'react'
import styles from './NavbarItem.module.css'

function NavbarItem(props) {
  return (
    <>
        {props.list.map((option, index) => (
            <li key={index} className={`${styles.item} ${option.active && styles.active}`}><i className={`fa ${option.icon}`}></i>{option.type}</li>
        ))}
    </>
  )
}

export default NavbarItem