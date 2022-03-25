import { DeleteIcon, EditIcon } from '../Icons'
import styles from './styles.module.scss'

type HeaderProps = {
  title: string
  location?: 'form'
}

export const Header: React.FC<HeaderProps> = ({ title, location }) => {
  return (
    <header data-location={location} className={styles.header}>
      <h2>{title}</h2>
      {location === undefined && (
        <div>
          <button>
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
