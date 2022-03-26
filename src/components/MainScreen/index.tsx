import { useState } from 'react'
import { CreateMessage } from '../CreateMessage'
import { Header } from '../Header'
import styles from './styles.module.scss'

export const MainScreen = () => {
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  return (
    <div className={styles.main_container}>
      <Header location="form" title="CodeLeap Network" />
      <CreateMessage
        setMessage={setMessage}
        setTitle={setTitle}
        message={message}
        title={title}
      />
    </div>
  )
}
