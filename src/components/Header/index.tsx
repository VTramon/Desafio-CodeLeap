import axios from 'axios'
import { useState } from 'react'
import { useAppSelector } from '../../redux/app/hooks'
import { DeleteModal } from '../DeleteModal'
import { DeleteIcon, EditIcon } from '../Icons'
import styles from './styles.module.scss'

type HeaderProps = {
  title: string
  location?: 'form'
  user?: string
  post?: number
  deletedPost?: (id: number) => void
}

export const Header: React.FC<HeaderProps> = ({
  title,
  location,
  user,
  post,
  deletedPost,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const userState = useAppSelector((state) => state.user)

  const handleDeletePost = async () => {
    const response = (await axios.post('/api/deletePost', { id: post })).data
    if (deletedPost) {
      deletedPost(response)
    }
    setIsDeleteModalOpen(false)
  }

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          cancel={() => setIsDeleteModalOpen(false)}
          delete={() => handleDeletePost()}
        />
      )}
      <header data-location={location} className={styles.header}>
        <h2>{title}</h2>
        {user && user === userState.username && location === undefined && (
          <div>
            <button onClick={() => setIsDeleteModalOpen(true)}>
              <DeleteIcon />
            </button>
            <button>
              <EditIcon />
            </button>
          </div>
        )}
      </header>
    </>
  )
}
