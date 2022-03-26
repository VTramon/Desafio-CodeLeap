import React from 'react'
import styles from './styles.module.scss'

type DeleteModalProps = {
  delete: () => void
  cancel: () => void
}
export const DeleteModal: React.FC<DeleteModalProps> = (props) => {
  return (
    <section className={styles.background}>
      <div className={styles.modal}>
        <p>Are you sure you want to delete this item?</p>

        <div className={styles.buttons}>
          <button onClick={props.cancel}>Cancel</button>
          <button onClick={props.delete}>OK</button>
        </div>
      </div>
    </section>
  )
}
