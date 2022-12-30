import React from 'react'
import Link from 'next/link'
import NavLink from '../types/NavLink'

import styled from 'styled-components'
import { Caveat } from '@next/font/google'

const Nav: React.FC<{ navLinks: NavLink[] }> = (props) => {
  const { navLinks } = props

  const className = 'hover:border-b border-[#504A2F]'

  const links = navLinks.map((link, i) => {
    const hideDivider = i+1 === navLinks.length

    const divider = !hideDivider && <span className='hidden xl:inline'>-</span>

    return (
      <li className={`my-1 md:my-0 md:mx-2.5 ${caveat.className}`} key={link.url}>
        {link.openInNewTab ? 
        <StyledLink href={link.url} className={className} target='_blank'>{link.title} {divider}</StyledLink> : 
        <StyledLink className={className} href={link.url}>{link.title} {divider}</StyledLink>}
      </li>
    )
  })

  return (
    <nav className={'text-[#504A2F] text-4xl xs:text-4xl leading-[3rem] sm:border-t border-solid border-[#504A2F] sm:pt-4'} role="navigation">
      <ul className={'text-center xs:text-left list-none p-0 mt-1.5 mx-0 mb-0 flex flex-col xl:flex-row xs:justify-evenly'}>{links}</ul>
    </nav>
  )
}

export default Nav


const caveat = Caveat({
  weight: '600',
  subsets: ['latin']
})

const StyledLink = styled(Link)`
  text-shadow: 1px 5px 5px rgba(97, 93, 88, 0.25)
`