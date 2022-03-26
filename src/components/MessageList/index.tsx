import axios from 'axios'
import { useEffect, useState } from 'react'
import { Message } from '../Message'
import styles from './styles.module.scss'

type MessageListProps = {
  id: number
  title: string
  text: string
  createdAt: string
  owner: string
}

export const MessageList = () => {
  const [list, setList] = useState<MessageListProps[]>()

  const handleList = async () => {
    const response: MessageListProps[] = (await axios.get('/api/getAllPosts'))
      .data
    setList(response)
  }

  useEffect(() => {
    // console.log()
    handleList()
  }, [])

  return (
    <div className={styles.list}>
      {list &&
        list.map((item) => {
          return <Message message={item} />
        })}
    </div>
  )
}
