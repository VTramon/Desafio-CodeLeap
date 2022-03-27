import axios from 'axios'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { Header } from '../Header'
import styles from './styles.module.scss'

export type PostProps = {
  id: number
  title: string
  text: string
  createdAt: string
  owner: string
}

type MessageListProps = {
  newPost: PostProps
}

export const MessageList: React.FC<MessageListProps> = ({ newPost }) => {
  const [list, setList] = useState<PostProps[]>([])

  const handleList = async () => {
    const response: PostProps[] = (await axios.get('/api/getAllPosts')).data
    const result = response.reverse()
    setList(result)
  }

  const handleNewPost = () => {
    setList([newPost, ...list])
  }

  const handleDeletedPost = (id: number) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
  }

  // const handleUpdatedPost = (id:number) => {
  //   const newList = list.filter((item) => item.id !== id)
  //   setList(newList)
  // }

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
              <Header
                deletedPost={handleDeletedPost}
                post={item.id}
                user={item.owner}
                title={item.title}
              />

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
