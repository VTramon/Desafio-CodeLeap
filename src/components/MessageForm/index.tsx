/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/CRUD'
import styles from './styles.module.scss'

type MessageFormProps = {
  role: 'create' | 'edit'
}

export const MessageForm: React.FC<MessageFormProps> = ({ role }) => {
  const [isTheButtonDisabled, setIsTheButtonDisabled] = useState(true)

  const {
    createPost,
    setContent,
    setTitle,
    content,
    title,
    updatePost,
    setIsUpdateModalOpen,
  } = useContext(AppContext)

  const handleIfTheButtonIsDisabled = () => {
    if (content !== '' && title !== '') {
      setIsTheButtonDisabled(false)
    } else {
      setIsTheButtonDisabled(true)
    }
  }

  useEffect(() => {
    handleIfTheButtonIsDisabled()
  }, [content, title])

  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.container}>
      {role === 'create' ? <h2>What's on your mind?</h2> : <h2>Edit item</h2>}

      <form
        onSubmit={(e) => {
          e.preventDefault()

          if (role === 'create') {
            createPost()
          } else {
            updatePost()
            setIsUpdateModalOpen(false)
          }

          setContent('')
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
            setContent(e.target.value)
          }}
          value={content}
          placeholder="Content here"
        />

        <button disabled={isTheButtonDisabled} type="submit">
          {role === 'create' ? 'CREATE' : 'SAVE'}
        </button>
      </form>
    </div>
  )
}
