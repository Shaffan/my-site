import styles from '../styles/Layout.module.scss'
import Gtag from './gtag'

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Gtag></Gtag>
      {props.children}
    </div>
  )
}
