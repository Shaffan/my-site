import Head from 'next/head'

const { GTAG_ID } = process.env

export default function Gtag() {
  if (process.env.NODE_ENV !== 'production') return null

  const gtagScript = (
    <script async src={'https://www.googletagmanager.com/gtag/js?id=' + GTAG_ID}></script>
  )
  return (
    <Head>
      {gtagScript}
      <script
        dangerouslySetInnerHTML={{
          __html: `<!-- Global site tag (gtag.js) - Google Analytics -->
          window.dataLayer = window.dataLayer || []
          function gtag() {
            dataLayer.push(arguments)
          }
          gtag('js', new Date())
        
          gtag('config', 'G-7BXQZGTBPN')`
        }}
      ></script>
    </Head>
  )
}
