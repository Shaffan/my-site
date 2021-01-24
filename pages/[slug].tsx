import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Page.module.scss'
import Page from '../types/Page'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

async function getPage(slug): Promise<Page> {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/pages/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
  )

  const json = await res.json()

  return json.pages[0]
}

export const getStaticProps = async ({ params }) => {
  const page = await getPage(params.slug)

  return {
    props: { page }
  }
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

const SitePage: React.FC<{ page: Page }> = (props) => {
  const { page } = props

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
      <div className={styles.container}>
        <h1 className={styles.heading}>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }}></div>
      </div>
      <Footer></Footer>
    </Layout>
  )
}

export default SitePage
