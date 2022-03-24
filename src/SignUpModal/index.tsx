/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export const SignUpModal = () => {
  const [user, setUser] = useState('')
  const [isEmpty, setIsEmpty] = useState(true)

  const handleIfTheInputIsEmpty = () => {
    if (user === '') {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }

  useEffect(() => {
    handleIfTheInputIsEmpty()
  }, [user])

  return (
    <div className={styles.modal}>
      <h2>Welcome to CodeLeap network!</h2>

      <p>Please enter your username</p>

      <form className={styles.modal_form}>
        <input
          onChange={(e) => setUser(e.target.value)}
          type="text"
          placeholder="John doe"
        />

        <button disabled={isEmpty} type="submit">
          ENTER
        </button>
      </form>
    </div>
  )
}
