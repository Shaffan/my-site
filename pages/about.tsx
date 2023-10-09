import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Footer from '../components/Footer'
import styles from '../styles/About.module.scss'
import Page from '../types/Page'

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
      <div className={styles.container}>
        <h1>One moment...</h1>
      </div>
    )
  }

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.headerTitle}>
            <Link href="/">Stefan Horne</Link>
          </span>
        </header>
        <div>
          <div className={styles.picContainer}>
            <img className={styles.pic} src="images/me.jpg"></img>
          </div>
          <h1 className={styles.heading}>{page.title}</h1>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: page.html }}></div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default SitePage
