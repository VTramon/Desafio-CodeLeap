import { useContext } from 'react'
import { AppContext } from '../../context/CRUD'
import { useAppSelector } from '../../redux/app/hooks'
import { DeleteModal } from '../DeleteModal'
import { DeleteIcon, EditIcon } from '../Icons'
import { UpdatePostModal } from '../UpdatePostModal'
import styles from './styles.module.scss'

type HeaderProps = {
  title: string
  location?: 'form'
  user?: string
  post?: number
}

export const Header: React.FC<HeaderProps> = ({
  title,
  location,
  user,
  post,
}) => {
  const userState = useAppSelector((state) => state.user)

  const {
    deletePost,
    setSelectedPost,
    isDeleteModalOpen,
    isUpdateModalOpen,
    setIsDeleteModalOpen,
    setIsUpdateModalOpen,
    updatePost,
  } = useContext(AppContext)

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          cancel={() => setIsDeleteModalOpen(false)}
          delete={() => {
            deletePost()
            setIsDeleteModalOpen(false)
            setSelectedPost(null)
          }}
        />
      )}
      {isUpdateModalOpen && <UpdatePostModal update={() => updatePost} />}
      <header data-location={location} className={styles.header}>
        <h2>{title}</h2>
        {user && user === userState.username && location === undefined && (
          <div>
            <button
              onClick={() => {
                setSelectedPost(post!)
                setIsDeleteModalOpen(true)
              }}
            >
              <DeleteIcon />
            </button>
            <button
              onClick={() => {
                setSelectedPost(post!)
                setIsUpdateModalOpen(true)
              }}
            >
              <EditIcon />
            </button>
          </div>
        )}
      </header>
    </>
  )
}
