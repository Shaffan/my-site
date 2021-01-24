import React from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'

const Header: React.FC<{}> = () => {
  return (
    <header className={styles.container}>
      <span className={styles.title}>
        <Link href='/'>Stefan Horne</Link>
      </span>
    </header>
  )
}

export default Header
