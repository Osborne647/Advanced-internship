import styles from "./page.module.css"
import Sidebar from "@/components/Sidebar"
import BookCard from "@/components/BookCard"
import Link from "next/link"
import SearchBar from "@/components/SearchBar"

async function getBooks(status) {
    const res = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooks?status=${status}`
    )
    if (!res.ok) throw new Error(`Failed to fetch ${status} books`)
    const text = await res.text()
    if (!text) return []
    await new Promise((resolve) => setTimeout(resolve, 800))
    return JSON.parse(text)
}

export default async function ForYouPage() {
    const [selected, recommended, suggested] = await Promise.all([
        getBooks("selected"),
        getBooks("recommended"),
        getBooks("suggested"),
    ])

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <section className={styles.section}>
                    <SearchBar />
    <h2 className={styles.sectionTitle}>Selected just for you</h2>
    {selected.length > 0 && (
        <Link href={`/book/${selected[0].id}`} className={styles.featured}>
            <div className={styles.featuredContent}>
                <p className={styles.featuredSub}>{selected[0].subTitle}</p>
                <hr className={styles.divider} />
                <div className={styles.featuredMeta}>
                    <img src={selected[0].imageLink} alt={selected[0].title} className={styles.featuredImg} />
                    <div>
                        <h3>{selected[0].title}</h3>
                        <p>{selected[0].author}</p>
                    </div>
                </div>
                <div className={styles.featuredDuration}>
                    <span>▶</span>
                    <span>{selected[0].duration}</span>
                </div>
            </div>
        </Link>
    )}
</section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Recommended For You</h2>
                    <p className={styles.sectionSub}>We think you'll like these</p>
                    <div className={styles.bookRow}>
                        {recommended.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Suggested Books</h2>
                    <p className={styles.sectionSub}>Browse those books</p>
                    <div className={styles.bookRow}>
                        {suggested.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}