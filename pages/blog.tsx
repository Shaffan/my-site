import React from 'react'
import { useRouter } from 'next/router'
import Post from '../types/Post'
import Layout from '../components/Layout'
import { PostCard } from '../components/PostCard'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Blog.module.scss'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

// called at *build* time
export const getStaticProps = async () => {
  const posts = await getPosts()

  return {
    props: { posts }
  }
}

async function getPosts() {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/posts?key=${CONTENT_API_KEY}&fields=title,url,slug,custom_excerpt,reading_time,feature_image,html,created_at`
  )

  const json = await res.json()

  return json.posts
}

const Home: React.FC<{ posts: Post[] }> = (props) => {
  const { posts } = props

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
      <Header></Header>
      <main className={styles.main} role="content">
        {posts.map((post) => (
          <PostCard post={post}></PostCard>
        ))}
      </main>
      <Footer></Footer>
    </Layout>
  )
}

export default Home
