"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import styles from "./SearchBar.module.css"
import Skeleton from "./Skeleton"

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            setShowDropdown(false)
            setLoading(false)
            return
        }

        setLoading(true)
        setShowDropdown(true)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
                )
                if (!res.ok) return
                const text = await res.text()
                if (!text) return setResults([])
                const data = JSON.parse(text)
                setResults(data.slice(0, 5))
            } catch (err) {
                console.error(err)
            } finally {
                setTimeout(() => setLoading(false), 500)
            }
        }, 300)

        return () => clearTimeout(timeoutRef.current)
    }, [query])

    const handleSelect = (bookId) => {
        setQuery("")
        setShowDropdown(false)
        router.push(`/book/${bookId}`)
    }

    const handleSearch = () => {
        if (query.trim()) {
            setShowDropdown(false)
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Search for books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => (results.length > 0 || loading) && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={styles.searchInput}
            />
            <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
            {showDropdown && (loading || results.length > 0) && (
                <ul className={styles.dropdown}>
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <li key={i} className={styles.dropdownItem}>
                                <Skeleton width="36px" height="54px" borderRadius="3px" />
                                <div style={{ flex: 1 }}>
                                    <Skeleton width="70%" height="0.85rem" />
                                    <Skeleton width="40%" height="0.75rem" />
                                </div>
                            </li>
                        ))
                    ) : (
                        results.map((book) => (
                            <li
                                key={book.id}
                                className={styles.dropdownItem}
                                onMouseDown={() => handleSelect(book.id)}
                            >
                                <img src={book.imageLink} alt={book.title} className={styles.thumb} />
                                <div>
                                    <p className={styles.bookTitle}>{book.title}</p>
                                    <p className={styles.bookAuthor}>{book.author}</p>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    )
}