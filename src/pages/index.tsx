import axios from 'axios'
import { useEffect, useState } from 'react'
import { SignUpModal } from '../components/SignUpModal'
import { useAppSelector } from '../redux/app/hooks'
import { store } from '../redux/app/store'
import { signUp } from '../redux/features/user/userSlice'

type userProps = {
  username?: string
  id?: number
}
export default function Home() {
  const [isOpen, setIsOpen] = useState(true)

  const userState = useAppSelector((state) => state.user)

  const [user, setUser] = useState<userProps>(userState)

  const onInitialRender = async () => {
    const session = sessionStorage.getItem('user')

    if (session !== null) {
      const response: userProps = (
        await axios.post('/api/validateUser', {
          username: session,
        })
      ).data

      store.dispatch(signUp(response))
      setIsOpen(false)
    }
  }

  useEffect(() => {
    onInitialRender()
  }, [])

  useEffect(() => {
    if (userState.username) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
    setUser(userState)
  }, [userState.username])

  return (
    <main>
      <SignUpModal />
    </main>
  )
}
