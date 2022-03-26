/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../redux/features/user/userSlice'
import styles from './styles.module.scss'

type user = {
  username: string
  id: number
}

// type SignUpModalProps = {
//   isOpen: boolean
//   setIsOpen: () => void
// }

export const SignUpModal = () => {
  const [user, setUser] = useState('')
  const [isEmpty, setIsEmpty] = useState(true)
  const dispatch = useDispatch()

  const router = useRouter()

  const handleIfTheInputIsEmpty = () => {
    if (user === '') {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }

  const handleSignUp = async () => {
    const session = sessionStorage.getItem('user')

    if (session !== null) {
      const response: user = (
        await axios.post('/api/validateUser', {
          username: session,
        })
      ).data

      dispatch(signUp(response))
    } else {
      const response: user = (
        await axios.post('/api/validateUser', {
          username: user,
        })
      ).data

      sessionStorage.setItem('user', response.username)
      dispatch(signUp(response))
    }
  }

  useEffect(() => {
    handleIfTheInputIsEmpty()
  }, [user])

  return (
    <div className={styles.modal}>
      <h2>Welcome to CodeLeap network!</h2>

      <p>Please enter your username</p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSignUp()
          router.push('/app')
        }}
        className={styles.modal_form}
      >
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
