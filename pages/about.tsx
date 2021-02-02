import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import styles from '../styles/About.module.scss'
import Page from '../types/Page'
import Header from '../components/Header'

const { CONTENT_API_URL, CONTENT_API_KEY } = process.env

async function getPage(): Promise<Page> {
  const res = await fetch(
    `${CONTENT_API_URL}/ghost/api/v3/content/pages/slug/about?key=${CONTENT_API_KEY}&fields=title,html`
  )

  const json = await res.json()

  return json.pages[0]
}

export const getStaticProps = async () => {
  const page = await getPage()

  return {
    props: { page }
  }
}

const SitePage: React.FC<{ page: Page }> = (props) => {
  const { page } = props

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
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>
            <Link href="/">Stefan Horne</Link>
          </span>
        </header>
        <div className={styles.containerInner}>
          <div className={styles.picContainer}>
            <img className={styles.pic} src="images/me.jpg"></img>
            <span className={styles.picCaption}>
              (get a load of discount Justin Bieber over here--yes, that is a cheap wig btw)
            </span>
          </div>
          <h1 className={styles.heading}>{page.title}</h1>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: page.html }}></div>
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  )
}

export default SitePage
