"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import BookCard from "@/components/BookCard"
import styles from "./page.module.css"
import SearchBar from "@/components/SearchBar"

export default function SearchPage() {
    const searchParams = useSearchParams()
    const query = searchParams.get("q") || ""
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query.trim()) return

        const fetchResults = async () => {
            setLoading(true)
            try {
                const res = await fetch(
                    `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
                )
                if (!res.ok) return
                const text = await res.text()
                if (!text) return setResults([])
                const data = JSON.parse(text)
                setResults(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchResults()
    }, [query])

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <main className={styles.main}>
                <SearchBar />
                <h1 className={styles.heading}>Results for "{query}"</h1>
                {loading && <p>Loading...</p>}
                {!loading && results.length === 0 && query && (
                    <p>No books found for "{query}"</p>
                )}
                <div className={styles.grid}>
                    {results.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </main>
        </div>
    )
}