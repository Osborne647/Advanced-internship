import styles from "./page.module.css"
import Sidebar from "@/components/Sidebar"
import BookCardSkeleton from "@/components/BookCardSkeleton"
import Skeleton from "@/components/Skeleton"

export default function Loading() {
    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <section className={styles.section}>
                    <Skeleton width="100%" height="200px" borderRadius="8px" />
                </section>

                <section className={styles.section}>
                    <Skeleton width="200px" height="1.5rem" />
                    <Skeleton width="150px" height="1rem" />
                    <div className={styles.bookRow}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <BookCardSkeleton key={i} />
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <Skeleton width="180px" height="1.5rem" />
                    <Skeleton width="140px" height="1rem" />
                    <div className={styles.bookRow}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <BookCardSkeleton key={i} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}