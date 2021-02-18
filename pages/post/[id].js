import styles from '../../styles/styles.module.sass'
import { useRouter } from 'next/router'

export default function Post({ data }) {
    const router = useRouter();
    console.log(router)
    if (!data) {
        return <p>Loading ...</p>
    }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.post_content_wrapper}>
                    <h1 className={styles.post_content_wrapper__title}>{data.title}</h1>
                    <hr/>
                    <img src={data.imageUrl} className={styles.post_content_wrapper__img} />
                    <hr/>
                    <div className={styles.post_content_wrapper__summary}>
                        <p >{data.summary}</p>
                    </div>
                    <a className={styles.post_content_wrapper__back_btn} onClick={()=>{router.back()}}>Back to List</a>
                </div>
            </main>
        </div>
    );
}
export async function getServerSideProps(context) {
    const res = await fetch(`https://test.spaceflightnewsapi.net/api/v2/articles/${context.query.id}`)
    const data = await res.json()

    return { props: { data } }
}