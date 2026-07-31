"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./SearchBar.module.css"

export default function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            setShowDropdown(false)
            return
        }

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
                setShowDropdown(true)
            } catch (err) {
                console.error(err)
            }
        }, 300)

        return () => clearTimeout(timeoutRef.current)
    }, [query])

    const handleSelect = (bookId) => {
        setQuery("")
        setShowDropdown(false)
        router.push(`/book/${bookId}`)
    }

    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="Search for books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => results.length > 0 && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className={styles.searchInput}
            />
            {showDropdown && results.length > 0 && (
                <ul className={styles.dropdown}>
                    {results.map((book) => (
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
                    ))}
                </ul>
            )}
        </div>
    )
}