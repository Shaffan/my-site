import { useRouter } from 'next/router'
import NavLink from '../types/NavLink'
import Post from '../types/Post'

import Layout from '../components/Layout'
import Nav from '../components/Nav'

import styled from 'styled-components'
import { La_Belle_Aurore } from '@next/font/google'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

// called at *build* time
export const getStaticProps = async () => {
  const posts = await getPosts()
  const navLinks = await getNavLinks()

  return {
    props: { posts, navLinks }
  }
}

async function getPosts() {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/posts?key=${CONTENT_API_KEY}&fields=title,url,slug,custom_excerpt,reading_time,feature_image,html,created_at`
  )

  const json = await res.json()

  return json.posts
}

async function getNavLinks(): Promise<NavLink[]> {
  const links: NavLink[] = [
    { title: 'github', url: 'https://github.com/Shaffan', openInNewTab: true },
    { title: 'blog', url: '/blog', openInNewTab: false },
    { title: 'about me', url: '/about', openInNewTab: false },
    { title: 'contact', url: 'mailto:hello@stefanhorne.com', openInNewTab: true }
  ]

  return [...links]
}

const Home: React.FC<{ posts: Post[]; navLinks: NavLink[] }> = (props) => {
  const { navLinks } = props

  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <div className={'container'}>
          <h1>One moment...</h1>
        </div>
      </Layout>
    )
  }

  

  return (
    <Background className={''}>
    <Layout>
      <main className={'h-screen xs:w-3/5 text-center xs:text-left flex flex-col xs:justify-center items-left sm:items-center my-0 py-8 md:py-10 px-0'} role="content">
        <header className='w-[85%] xl:text-center mx-auto my-0 xs:m-0 md:w-10/12 border-[#B89F84] border-b sm:border-none'>
          <StefanHorne className={`m-0 text-[#504A2F] text-5xl xs:text-6xl xl:text-7xl ${la_belle_aurore.className}`}>Stefan Horne</StefanHorne>
        </header>
        <div className='xs:hidden h-[60%] xxs:min-h-[400px]'></div>
        <Nav navLinks={navLinks}></Nav>
      </main>
    </Layout>
    </Background>
  )
}

export default Home

const la_belle_aurore = La_Belle_Aurore({
  weight: '400',
  subsets: ['latin']
})

const StefanHorne = styled.span`
  text-shadow: 1px 5px 5px rgba(97, 93, 88, 0.25)
`

const Background = styled.div`
  background: url('/images/home-mobile.webp') no-repeat top;
  background-size: cover;

  @media (min-width: 500px) {
    background: url('/images/home.webp') no-repeat;
    background-size: cover;
    background-position: right -200px bottom
  }

  @media (min-width: 769px) {
    background: url('/images/home.webp') no-repeat center;
    background-size: cover;
  }
`