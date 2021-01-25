import { format } from 'date-fns'
import { useRouter } from 'next/router'
import BackToTop from '../../components/BackToTop'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import styles from '../../styles/Post.module.scss'
import Post from '../../types/Post'

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
  const { post } = props

  const router = useRouter()

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
      <BackToTop></BackToTop>
      <Footer></Footer>
    </Layout>
  )
}

export default PostPage
