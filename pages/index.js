import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/styles.module.sass'
import 'next-pagination/dist/index.css'
import Pagination from 'next-pagination'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Home({ data }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('1')
  const [totalPages, setTotalPage] = useState(data.length)
  const [postPerPage, setPostPerPage] = useState('3')
  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = data.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    setCurrentPage(router.query.page)
  }, [router.query.page])

  if (!data) return <p>Loading ...</p>

  return (
    <div className={styles.container}>
      <Head>
        <title>News page | Test task</title>
      </Head>
      <main className={styles.main}>
        <h1>News site</h1>
        {currentPosts.map(post => (
          <div className={styles.post_wrapper} key={post.id}>
            <div className={styles.post_wrapper__thumb}>
              <img src={post.imageUrl} />
            </div>
            <div className={styles.post_wrapper__content}>
              <h3 className={styles.post_wrapper__tittle}>{post.title}</h3>
              <p className={styles.post_wrapper__text}>{post.summary.substring(0, 200) + "..."}</p>
              <Link href={`/post/${post.id}`}><a className={styles.post_wrapper__reed_more_btn} > Reed more... </a></Link>
            </div>
          </div>
        ))}
        <Pagination total={data.length} sizes={[3,3]}  />
      </main>
    </div>
  )
}


export async function getServerSideProps() {

  const res = await fetch(`https://test.spaceflightnewsapi.net/api/v2/articles`)
  const data = await res.json()

  return { props: { data } }
}