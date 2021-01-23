import styles from '../styles/Layout.module.scss'
import { Footer } from './Footer'
import { Header } from './Header'

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </div>
  )
}
