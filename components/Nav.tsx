import React from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.scss'

interface NavLink {
  title: string
  slug: string
}

export const Nav: React.FC<{ navLinks: NavLink[] }> = (props) => {
  const { navLinks } = props

  const links = navLinks.map((link) => (
    <li className={styles.listItem} key={link.slug}>
      <Link href={`/${link.slug}`}>
        <a>{link.title}</a>
      </Link>
    </li>
  ))

  return (
    <nav className={styles.navigation} role="navigation">
      <ul className={styles.list}>{links}</ul>
    </nav>
  )
}
