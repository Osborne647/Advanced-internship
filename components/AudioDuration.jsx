"use client"

import { useState, useRef } from "react"

export default function AudioDuration({ audioLink }) {
    const [duration, setDuration] = useState(null)
    const audioRef = useRef(null)

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60)
        const s = Math.floor(secs % 60).toString().padStart(2, "0")
        return `${m}:${s}`
    }

    return (
        <>
            <audio
                ref={audioRef}
                src={audioLink}
                preload="metadata"
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                style={{ display: "none" }}
            />
            <span>⏱ {duration ? formatTime(duration) : "Loading..."}</span>
        </>
    )
}