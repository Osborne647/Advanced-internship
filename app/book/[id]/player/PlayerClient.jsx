"use client"

import { useState, useRef } from "react"
import styles from "./page.module.css"
import Sidebar from "@/components/Sidebar"
import { useAuth } from "@/hooks/useAuth"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/config"

export default function PlayerClient({ book }) {
    const { user } = useAuth()
    const [mode, setMode] = useState("read")
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [finished, setFinished] = useState(false)
    const audioRef = useRef(null)

    const togglePlay = () => {
        if (!audioRef.current) return
        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value)
        audioRef.current.currentTime = time
        setCurrentTime(time)
    }

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60)
        const s = Math.floor(secs % 60).toString().padStart(2, "0")
        return `${m}:${s}`
    }

    const markAsFinished = async () => {
        if (!user) return alert("Please log in first")
        try {
            await updateDoc(doc(db, "users", user.uid, "library", book.id), {
                finished: true,
            })
            setFinished(true)
        } catch (err) {
            console.error(err)
            alert("Add this book to your library first!")
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <div className={styles.playerPage}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${mode === "read" ? styles.active : ""}`}
                        onClick={() => setMode("read")}
                    >
                        📖 Read
                    </button>
                    <button
                        className={`${styles.tab} ${mode === "listen" ? styles.active : ""}`}
                        onClick={() => setMode("listen")}
                    >
                        🎧 Listen
                    </button>
                </div>

                <div className={styles.bookMeta}>
                    <h1 className={styles.title}>{book.title}</h1>
                    <p className={styles.author}>{book.author}</p>
                </div>

                {mode === "read" ? (
                    <div className={styles.readContent}>
                        <div className={styles.textBody}>
                            {book.summary || book.bookDescription || "No text content available."}
                        </div>
                    </div>
                ) : (
                    <div className={styles.listenContent}>
                        <img src={book.imageLink} alt={book.title} className={styles.coverArt} />

                        {book.audioLink ? (
                            <>
                                <audio
                                    ref={audioRef}
                                    src={book.audioLink}
                                    onTimeUpdate={handleTimeUpdate}
                                    onLoadedMetadata={handleLoadedMetadata}
                                    onEnded={() => {
                                        setIsPlaying(false)
                                        markAsFinished()
                                    }}
                                />
                                <div className={styles.controls}>
                                    <span className={styles.time}>{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        className={styles.seekBar}
                                        min={0}
                                        max={duration || 0}
                                        value={currentTime}
                                        onChange={handleSeek}
                                    />
                                    <span className={styles.time}>{formatTime(duration)}</span>
                                </div>
                                <button className={styles.playBtn} onClick={togglePlay}>
                                    {isPlaying ? "⏸ Pause" : "▶ Play"}
                                </button>
                            </>
                        ) : (
                            <p className={styles.noAudio}>No audio available for this book.</p>
                        )}
                    </div>
                )}

                <button
                    className={styles.finishedBtn}
                    onClick={markAsFinished}
                    disabled={finished}
                >
                    {finished ? "✅ Marked as Finished" : "✔ Mark as Finished"}
                </button>
            </div>
        </div>
    )
}