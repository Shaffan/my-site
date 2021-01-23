import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/Post.module.scss'
import { Nav } from '../../components/Nav'
import Layout from '../../components/Layout'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

async function getPost(slug): Promise<Post> {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
  )

  const json = await res.json()

  return json.posts[0]
}

// SSG
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

type Post = {
  title: string
  html: string
  slug: string
}

const Post: React.FC<{ post: Post }> = (props) => {
  console.log(props)

  const { post } = props

  const router = useRouter()

  // in production this only occurs the first time a user hits this post (SSG)
  // Nextjs saves a static html file upon receiving the first request and returns that static file on subsequent requests
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }

  const navLinks = [{ title: 'Go back', slug: '' }]

  return (
    <Layout>
      <div className={styles.container}>
        <Nav navLinks={navLinks}></Nav>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </Layout>
  )
}

export default Post
