import React from 'react'
import styles from '../styles/Footer.module.scss'

export function Footer () {
  return (
    <footer className={styles.footer}>&copy; Stefan Horne {new Date().getFullYear()}</footer>
  )
}
