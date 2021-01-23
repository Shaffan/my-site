import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Nav } from '../components/Nav'
import Layout from '../components/Layout'
import styles from '../styles/Page.module.scss'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

async function getPage(slug) {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/pages/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`
  )

  const json = await res.json()

  return json.pages[0]
}

// SSG
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

type Page = {
  title: string
  html: string
  slug: string
}

const Page: React.FC<{ page: Page }> = (props) => {
  console.log(props)

  const { page } = props

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
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.html }}></div>
      </div>
    </Layout>
  )
}

export default Page
