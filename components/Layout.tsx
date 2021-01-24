import styles from '../styles/Layout.module.scss'

export default function Layout(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  )
}
