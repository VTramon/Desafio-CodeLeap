import moment from 'moment'
import { useCallback, useContext } from 'react'
import { AppContext, ResponsePostProps } from '../../context/CRUD'
import { Header } from '../Header'
import styles from './styles.module.scss'

type MessageListProps = {
  newPost: ResponsePostProps
}

export const MessageList: React.FC<MessageListProps> = ({ newPost }) => {
  const { postList, setPostList } = useContext(AppContext)

  const handleNewPost = () => {
    setPostList([newPost, ...postList])
  }

  useCallback(() => {
    handleNewPost()
  }, [newPost])

  return (
    <section className={styles.list}>
      {postList &&
        postList.map((item, index) => {
          return (
            <div className={styles.message}>
              <Header post={item.id} user={item.username} title={item.title} />

              <div className={styles.details}>
                <p>{`@${item.username}`}</p>
                <p>{moment(item.created_datetime).fromNow()}</p>
              </div>

              <p>{item.content}</p>
            </div>
          )
        })}
    </section>
  )
}
