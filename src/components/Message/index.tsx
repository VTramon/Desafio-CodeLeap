import moment from 'moment'
import { Header } from '../Header'
import styles from './styles.module.scss'

export type MessageProps = {
  message: {
    id: number
    title: string
    text: string
    createdAt: string
    owner: string
  }
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const parseUserId = () => {}

  return (
    <div className={styles.message}>
      <Header title={message.title} />

      <div className={styles.details}>
        <p>{`@${message.owner}`}</p>
        <p>{moment(message.createdAt).fromNow()}</p>
      </div>

      <p>{message.text}</p>
    </div>
  )
}
