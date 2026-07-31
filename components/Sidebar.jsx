"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import styles from "./Sidebar.module.css"
import Link from "next/link"
import logo from "@/assets/logo.png"
import SearchBar from "@/components/SearchBar"
import Image from "next/image"

export default function Sidebar() {
    const { logout } = useAuth()
    const router = useRouter()
    const [search, setSearch] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim()) {
            router.push(`/search?q=${encodeURIComponent(search.trim())}`)
            setSearch("")
        }
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarTop}>
                <Image className={styles.logo} src={logo} alt="logo" />
                <SearchBar />
                <Link href="/for-you" className={styles.navItem}><span>📖</span> For you</Link>
                <Link href="/library" className={styles.navItem}><span>📚</span> My Library</Link>
                <a className={styles.navItem}><span>✏️</span> Highlights</a>
            </div>
            <div className={styles.sidebarBottom}>
                <Link href="/settings" className={styles.navItem}><span>⚙️</span> Settings</Link>
                <a className={styles.navItem}><span>❓</span> Help & Support</a>
                <button onClick={logout} className={styles.navItem}><span>🚪</span> Logout</button>
            </div>
        </aside>
    )
}