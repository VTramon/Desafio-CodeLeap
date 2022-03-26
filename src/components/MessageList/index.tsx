import axios from 'axios'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { Header } from '../Header'
import styles from './styles.module.scss'

export type ListProps = {
  id: number
  title: string
  text: string
  createdAt: string
  owner: string
}

type MessageListProps = {
  newPost: ListProps
}

export const MessageList: React.FC<MessageListProps> = ({ newPost }) => {
  const [list, setList] = useState<ListProps[]>([])

  const handleList = async () => {
    const response: ListProps[] = (await axios.get('/api/getAllPosts')).data
    setList(response.reverse())
  }

  const handleNewPost = () => {
    setList([newPost, ...list])
  }

  useCallback(() => {
    handleNewPost()
  }, [newPost])

  useEffect(() => {
    handleList()
  }, [list])

  return (
    <section className={styles.list}>
      {list &&
        list.map((item, index) => {
          return (
            <div className={styles.message}>
              <Header title={item.title} />

              <div className={styles.details}>
                <p>{`@${item.owner}`}</p>
                <p>{moment(item.createdAt).fromNow()}</p>
              </div>

              <p>{item.text}</p>
            </div>
          )
        })}
    </section>
  )
}
