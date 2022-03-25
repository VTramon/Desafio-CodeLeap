import { useState } from 'react'
import { CreateMessage } from '../CreateMessage'
import { Header } from '../Header'
import styles from './styles.module.scss'

export const MainScreen = () => {
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  return (
    <main className={styles.main_container}>
      <Header title="CodeLeap Network" />
      <CreateMessage
        setMessage={setMessage}
        setTitle={setTitle}
        message={message}
        title={title}
      />
    </main>
  )
}
