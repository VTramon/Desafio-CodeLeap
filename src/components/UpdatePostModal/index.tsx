import { useState } from 'react'
import { MessageForm } from '../MessageForm'
import styles from './styles.module.scss'

type UpdatePostModalProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  postId: number
}
export const UpdatePostModal: React.FC<UpdatePostModalProps> = ({
  isOpen,
  setIsOpen,
  postId,
}) => {
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')

  return (
    <section
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }}
      onClick={() => setIsOpen(false)}
      className={styles.background}
    >
      <MessageForm
        role="edit"
        id={postId}
        setMessage={setMessage}
        setTitle={setTitle}
        message={message}
        title={title}
      />
    </section>
  )
}
