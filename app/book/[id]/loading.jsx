import styles from "./page.module.css"
import Sidebar from "@/components/Sidebar"
import Skeleton from "@/components/Skeleton"

export default function Loading() {
    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <Skeleton width="70px" height="1.4rem" borderRadius="20px" />
                <div className={styles.bookHeader}>
                    <div className={styles.bookInfo}>
                        <Skeleton width="60%" height="2rem" />
                        <Skeleton width="30%" height="1rem" />
                        <Skeleton width="80%" height="1rem" />
                        <div className={styles.meta}>
                            <Skeleton width="100%" height="1rem" />
                        </div>
                        <div className={styles.buttons}>
                            <Skeleton width="100px" height="2.5rem" borderRadius="4px" />
                            <Skeleton width="100px" height="2.5rem" borderRadius="4px" />
                        </div>
                        <Skeleton width="140px" height="2rem" borderRadius="4px" />
                    </div>
                    <div className={styles.coverWrapper}>
                        <Skeleton width="200px" height="300px" borderRadius="4px" />
                    </div>
                </div>

                <section className={styles.aboutSection}>
                    <Skeleton width="180px" height="1.5rem" />
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                        <Skeleton width="80px" height="1.5rem" borderRadius="20px" />
                        <Skeleton width="100px" height="1.5rem" borderRadius="20px" />
                    </div>
                    <Skeleton width="100%" height="0.9rem" count={4} />
                </section>

                <section className={styles.aboutSection}>
                    <Skeleton width="200px" height="1.5rem" />
                    <Skeleton width="100%" height="0.9rem" count={3} />
                </section>
            </main>
        </div>
    )
}