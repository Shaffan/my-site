import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import styles from '../styles/Home.module.scss'
import NavLink from '../types/NavLink'
import Page from '../types/Page'
import Post from '../types/Post'

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
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/pages?key=${CONTENT_API_KEY}&fields=title,slug`
  )
  const json = await res.json()

  const pageLinks: NavLink[] = json.pages.map((page: Page) => {
    return { title: page.title, url: `/${page.slug}` }
  })
  const customLinks: NavLink[] = [
    { title: 'cv', url: '/stefan-horne.pdf', openInNewTab: true },
    { title: 'github', url: 'https://github.com/Shaffan', openInNewTab: true },
    { title: 'email', url: 'mailto:hello@stefanhorne.com', openInNewTab: false },
    { title: 'blog', url: '/blog', openInNewTab: false }
  ]

  return [...customLinks, ...pageLinks]
}

const Home: React.FC<{ posts: Post[]; navLinks: NavLink[] }> = (props) => {
  const { navLinks } = props

  const router = useRouter()

  // in production this only occurs the first time a user hits this post (SSG)
  // Nextjs saves a static html file upon receiving the first request and returns that static file on subsequent requests
  if (router.isFallback) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1>One moment...</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className={styles.main} role="content">
        <header className={styles.header}>
          <span className={styles.title}>Stefan Horne</span>
        </header>
        <Nav navLinks={navLinks}></Nav>
      </main>
    </Layout>
  )
}

export default Home
