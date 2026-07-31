"use client"

import { useAuth } from "@/hooks/useAuth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/config"
import { useState } from "react"
import styles from "./AddToLibrary.module.css"

export default function AddToLibrary({ book }) {
    const { user } = useAuth()
    const [added, setAdded] = useState(false)

    const handleAdd = async () => {
        if (!user) return alert("Please log in first")
        await setDoc(doc(db, "users", user.uid, "library", book.id), {
    id: book.id,
    title: book.title,
    author: book.author,
    imageLink: book.imageLink,
    addedAt: new Date().toISOString(),
})
        setAdded(true)
    }

    return (
        <button onClick={handleAdd} className={styles.addBtn} disabled={added}>
            {added ? "✅ Added to Library" : "🔖 Add title to My Library"}
        </button>
    )
}