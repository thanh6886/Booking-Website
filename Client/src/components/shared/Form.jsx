import React, {useState} from 'react'
import styles from './Form.module.css'

function Form() {
    const [inputValue, setInputValue] = useState('')

    const changeInputHandler = (event) => {
        setInputValue(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()
    }

  return (
    <div className={styles.subscribe}>
        <div className={styles.container}>
            <p className={styles.slogan}><b>Save time, save money!</b></p>
            <p className={styles.content}>Sign up and we'll send the best deals to you</p>
            <form className={styles.form} onSubmit={submitHandler}>
                <input type="text" value={inputValue} onChange={changeInputHandler} placeholder='Your Email ...'/>
                <button>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default Form