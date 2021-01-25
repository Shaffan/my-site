import styles from '../styles/BackToTop.module.scss'

export default function BackToTop() {
  return (
    <span className={styles.container}>
      <a
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        }}
      >
        <img src={'/images/up-caret.png'} alt='Back to top'></img>
      </a>
    </span>
  )
}
