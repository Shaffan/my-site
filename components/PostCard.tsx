import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import styles from '../styles/PostCard.module.scss'

interface Post {
  title: string
  slug: string
  html: string
  created_at: string
}

export const PostCard: React.FC<{ post: Post }> = (props) => {
  const { post } = props

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <span className={styles.createdAt}>{format(new Date(post.created_at), 'do LLLL, yyyy')}</span>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  )
}
