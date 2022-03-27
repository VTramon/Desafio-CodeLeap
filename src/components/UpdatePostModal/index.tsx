import { useContext } from 'react'
import { AppContext } from '../../context/CRUD'
import { MessageForm } from '../MessageForm'
import styles from './styles.module.scss'

type UpdatePostModalProps = {
  update: () => void
}
export const UpdatePostModal: React.FC<UpdatePostModalProps> = ({ update }) => {
  const { setIsUpdateModalOpen } = useContext(AppContext)

  return (
    <section
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsUpdateModalOpen(false)
        }
      }}
      onClick={() => setIsUpdateModalOpen(false)}
      className={styles.background}
    >
      <MessageForm role="edit" />
    </section>
  )
}
