"use client"

import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase/config"
import { useAuth } from "@/hooks/useAuth"
import Sidebar from "@/components/Sidebar"
import BookCard from "@/components/BookCard"
import styles from "./page.module.css"

export default function LibraryPage() {
    const { user } = useAuth()
    const [savedBooks, setSavedBooks] = useState([])
    const [finishedBooks, setFinishedBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        const fetchLibrary = async () => {
            const snapshot = await getDocs(collection(db, "users", user.uid, "library"))
            const allBooks = snapshot.docs.map((doc) => doc.data())
            setSavedBooks(allBooks.filter((book) => !book.finished))
            setFinishedBooks(allBooks.filter((book) => book.finished))
            setLoading(false)
        }

        fetchLibrary()
    }, [user])

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <main className={styles.main}>
                <h1 className={styles.heading}>My Library</h1>

                {loading ? (
                    <p className={styles.message}>Loading...</p>
                ) : !user ? (
                    <p className={styles.message}>Please log in to see your library.</p>
                ) : (
                    <>
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Saved Books</h2>
                            {savedBooks.length === 0 ? (
                                <p className={styles.message}>No saved books yet. Add some from the book page!</p>
                            ) : (
                                <div className={styles.grid}>
                                    {savedBooks.map((book) => (
                                        <BookCard key={book.id} book={book} />
                                    ))}
                                </div>
                            )}
                        </section>

                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Finished</h2>
                            {finishedBooks.length === 0 ? (
                                <p className={styles.message}>No finished books yet.</p>
                            ) : (
                                <div className={styles.grid}>
                                    {finishedBooks.map((book) => (
                                        <BookCard key={book.id} book={book} />
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>
        </div>
    )
}