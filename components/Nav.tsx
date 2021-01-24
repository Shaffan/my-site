import React from 'react'
import Link from 'next/link'
import styles from '../styles/Nav.module.scss'
import NavLink from '../types/NavLink'

const Nav: React.FC<{ navLinks: NavLink[] }> = (props) => {
  const { navLinks } = props

  const links = navLinks.map((link) => {
    let a = (<a>{link.title}</a>)
    if (link.openInNewTab) a = (<a target="_blank">{link.title}</a>)

    return (
      <li className={styles.listItem} key={link.url}>
        <Link href={link.url}>{a}</Link>
      </li>
    )
  })

  return (
    <nav className={styles.container} role="navigation">
      <ul className={styles.list}>{links}</ul>
    </nav>
  )
}

export default Nav
