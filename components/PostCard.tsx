import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/PostCard.module.scss'
import Post from '../types/Post'

export const PostCard: React.FC<{ post: Post }> = (props) => {
  const { post } = props

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h2>
        <span className={styles.createdAt}>
          {format(new Date(post.created_at), 'do LLLL, yyyy')}
        </span>
        <span className={styles.readingTime}>Reading time: {post.reading_time}m</span>
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </div>
  )
}
