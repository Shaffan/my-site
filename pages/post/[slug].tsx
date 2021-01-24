import { useRouter } from 'next/router'
import styles from '../../styles/Post.module.scss'
import Layout from '../../components/Layout'
import Post from '../../types/Post'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { format } from 'date-fns'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

async function getPost(slug): Promise<Post> {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html,created_at,reading_time`
  )

  const json = await res.json()

  return json.posts[0]
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug)

  return {
    props: { post }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

const PostPage: React.FC<{ post: Post }> = (props) => {
  console.log(props)

  const { post } = props

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
      <main className={styles.container} role="content">
        <h1 className={styles.heading}>{post.title}</h1>

        <span className={styles.createdAt}>
          {format(new Date(post.created_at), 'do LLLL, yyyy')}
        </span>
        <span className={styles.readingTime}>reading time: {post.reading_time}m</span>

        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </main>
      <Footer></Footer>
    </Layout>
  )
}

export default PostPage
