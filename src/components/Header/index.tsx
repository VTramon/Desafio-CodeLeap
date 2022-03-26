import axios from 'axios'
import { useAppSelector } from '../../redux/app/hooks'
import { DeleteIcon, EditIcon } from '../Icons'
import styles from './styles.module.scss'

type HeaderProps = {
  title: string
  location?: 'form'
  user?: string
  post: number
  deletedPost: (id: number) => void
}

export const Header: React.FC<HeaderProps> = ({
  title,
  location,
  user,
  post,
  deletedPost,
}) => {
  const userState = useAppSelector((state) => state.user)

  const handleDeletePost = async () => {
    const response = (await axios.post('/api/deletePost', { id: post })).data
    deletedPost(response)
  }

  return (
    <header data-location={location} className={styles.header}>
      <h2>{title}</h2>
      {user && user === userState.username && location === undefined && (
        <div>
          <button onClick={() => handleDeletePost()}>
            <DeleteIcon />
          </button>
          <button>
            <EditIcon />
          </button>
        </div>
      )}
    </header>
  )
}
