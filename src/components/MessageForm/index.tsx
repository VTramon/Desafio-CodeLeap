/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { PostProps } from '../MessageList'
import styles from './styles.module.scss'

type MessageFormProps = {
  id?: number
  title: string
  setTitle: (value: string) => void
  message: string
  setMessage: (value: string) => void
  newPost?: (value: PostProps) => void
  editedPost?: (value: PostProps) => void
  role: 'create' | 'edit'
}

export const MessageForm: React.FC<MessageFormProps> = ({
  id,
  message,
  setMessage,
  title,
  setTitle,
  newPost,
  editedPost,
  role,
}) => {
  const [isTheButtonDisabled, setIsTheButtonDisabled] = useState(true)
  const userState = useAppSelector((state) => state.user)

  const handleIfTheButtonIsDisabled = () => {
    if (message !== '' && title !== '') {
      setIsTheButtonDisabled(false)
    } else {
      setIsTheButtonDisabled(true)
    }
  }

  const handleCreatePost = async () => {
    const response = await axios.post('/api/createPost', {
      text: message,
      title: title,
      owner: userState.username,
    })
    if (newPost) {
      newPost(response.data)
    }
  }

  const handleEditPost = async () => {
    const response = await axios.post('/api/updatePost', {
      text: message,
      title: title,
      id: id,
    })
    console.log(response.data)
    if (editedPost) {
      editedPost(response.data)
    }
  }

  useEffect(() => {
    handleIfTheButtonIsDisabled()
  }, [message, title])

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.container}>
      {role === 'create' ? <h2>What's on your mind?</h2> : <h2>Edit item</h2>}

      <form
        onSubmit={(e) => {
          e.preventDefault()

          if (role === 'create') {
            handleCreatePost()
          } else {
            handleEditPost()
          }

          setMessage('')
          setTitle('')
        }}
        className={styles.form}
      >
        <h3>Title</h3>
        <input
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          value={title}
          type="text"
          placeholder="Hello world"
        />

        <h3>Content</h3>
        <textarea
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          value={message}
          placeholder="Content here"
        />

        <button disabled={isTheButtonDisabled} type="submit">
          {role === 'create' ? 'CREATE' : 'SAVE'}
        </button>
      </form>
    </div>
  )
}
