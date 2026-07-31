import styles from "./page.module.css"
import Sidebar from "@/components/Sidebar"
import AddToLibrary from "@/components/AddToLibrary"
import Link from "next/link"
import AudioDuration from "@/components/AudioDuration"
import SubscriptionPill from "@/components/SubscriptionPill"

async function getBookById(id) {
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
    if (!res.ok) throw new Error("Failed to fetch book")
    const text = await res.text()
    if (!text) throw new Error("No data for this book")
    await new Promise((resolve) => setTimeout(resolve, 800))
    return JSON.parse(text)
}

export default async function BookPage({ params }) {
    const { id } = await params
    const book = await getBookById(id)

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <SubscriptionPill subscriptionRequired={book.subscriptionRequired} />
                <div className={styles.bookHeader}>
                    <div className={styles.bookInfo}>
                        <h1 className={styles.title}>{book.title}</h1>
                        <p className={styles.author}>{book.author}</p>
                        <p className={styles.subtitle}>{book.subTitle}</p>
                        <div className={styles.meta}>
                            <span>⭐ {book.averageRating} ({book.totalRating} ratings)</span>
                            <AudioDuration audioLink={book.audioLink} />
                            <span>🎧 Audio & font</span>
                            <span>💡 {book.keyIdeas} key ideas</span>
                        </div>
                        <div className={styles.buttons}>
                            <Link href={`/book/${id}/player`} className={styles.readBtn}>📖 Read</Link>
                            <Link href={`/book/${id}/player`} className={styles.listenBtn}>🎧 Listen</Link>
                        </div>
                        <AddToLibrary book={{ id, title: book.title, author: book.author, imageLink: book.imageLink }} />
                    </div>
                    <div className={styles.coverWrapper}>
                        <img src={book.imageLink} alt={book.title} className={styles.cover} />
                    </div>
                </div>

                <section className={styles.aboutSection}>
                    <h2>What's it about?</h2>
                    {book.tags && (
                        <div className={styles.tags}>
                            {book.tags.map((tag, i) => (
                                <span key={i} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                    <p className={styles.description}>{book.bookDescription}</p>
                </section>

                <section className={styles.aboutSection}>
                    <h2>About the author</h2>
                    <p className={styles.description}>{book.authorDescription}</p>
                </section>
            </main>
        </div>
    )
}
