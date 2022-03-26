import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/app/hooks'
import { signUp } from '../../redux/features/user/userSlice'
import { CreateMessage } from '../CreateMessage'
import { Header } from '../Header'
import { MessageList, PostProps } from '../MessageList'
import styles from './styles.module.scss'

export const MainScreen = () => {
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [newPost, setNewPost] = useState<PostProps>()

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

  const handleNewPost = (value: PostProps) => {
    setNewPost(value)
  }

  useEffect(() => {
    handleUser()
  }, [])

  return (
    <div className={styles.main_container}>
      <Header location="form" title="CodeLeap Network" />
      <CreateMessage
        newPost={handleNewPost}
        setMessage={setMessage}
        setTitle={setTitle}
        message={message}
        title={title}
      />

      <MessageList newPost={newPost!} />
    </div>
  )
}
