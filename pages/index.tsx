import Head from 'next/head'
import React from 'react'
import Layout from '../components/Layout'
import { Nav } from '../components/Nav'
import { PostCard } from '../components/PostCard'
import styles from '../styles/Home.module.scss'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

interface Post {
  slug: string
  url: string
  title: string
  reading_time: string
  feature_image: string
  html: string
  created_at: string
}

interface Page {
  title: string
  slug: string
}

// called at *build* time
export const getStaticProps = async () => {
  const posts = await getPosts()
  const pages = await getPages()

  return {
    props: { posts, pages }
  }
}

async function getPosts() {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/posts?key=${CONTENT_API_KEY}&fields=title,url,slug,custom_excerpt,reading_time,feature_image,html,created_at`
  )

  const json = await res.json()

  return json.posts
}

async function getPages(): Promise<Page[]> {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/pages?key=${CONTENT_API_KEY}&fields=title,slug`
  )

  const json = await res.json()

  return json.pages
}

const Home: React.FC<{ posts: Post[]; pages: Page[] }> = (props) => {
  const { posts, pages } = props

  const postCards = posts.map((post) => <PostCard post={post}></PostCard>)

  return (
    <Layout>
      {/* <Nav navLinks={pages}></Nav> */}
      <main className={styles.main} role="content">
        {postCards}
      </main>
    </Layout>
  )
}

export default Home
