import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ResponsePostProps } from '../../context/CRUD'
import { useAppSelector } from '../../redux/app/hooks'
import { signUp } from '../../redux/features/user/userSlice'
import { Header } from '../Header'
import { MessageForm } from '../MessageForm'
import { MessageList } from '../MessageList'
import styles from './styles.module.scss'

export const MainScreen = () => {
  const [newPost, setNewPost] = useState<ResponsePostProps>()

  const router = useRouter()

  const dispatch = useDispatch()

  const userState = useAppSelector((state) => state.user.username)

  const handleUser = async () => {
    const session = sessionStorage.getItem('user')

    if (session !== null) {
      const response = (
        await axios.post('/api/validateUser', {
          username: session,
        })
      ).data

      dispatch(signUp(response))
    }
  }

  const handleNewPost = (value: ResponsePostProps) => {
    setNewPost(value)
  }

  useEffect(() => {
    handleUser()
  }, [])

  return (
    <div className={styles.main_container}>
      <Header location="form" title="CodeLeap Network" />
      <MessageForm role="create" />

      <MessageList newPost={newPost!} />
    </div>
  )
}
