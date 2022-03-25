/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type CreateMessageProps = {
  title: string
  setTitle: (value: string) => void
  message: string
  setMessage: (value: string) => void
}

export const CreateMessage: React.FC<CreateMessageProps> = ({
  message,
  setMessage,
  title,
  setTitle,
}) => {
  const [isTheButtonDisabled, setIsTheButtonDisabled] = useState(true)
  const handleIfTheButtonIsDisabled = () => {
    if (message !== '' && title !== '') {
      setIsTheButtonDisabled(false)
    } else {
      setIsTheButtonDisabled(true)
    }
  }

  useEffect(() => {
    handleIfTheButtonIsDisabled()
  }, [message, title])
  return (
    <div className={styles.container}>
      <h2>What's on your mind?</h2>

      <form className={styles.form}>
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
          CREATE
        </button>
      </form>
    </div>
  )
}
