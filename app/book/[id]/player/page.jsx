import styles from "./page.module.css"
import PlayerClient from "./PlayerClient"
import Sidebar from "@/components/Sidebar"

async function getBookById(id) {
    const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
    if (!res.ok) throw new Error("Failed to fetch book")
    const text = await res.text()
    if (!text) throw new Error("No data for this book")
    return JSON.parse(text)
}

export default async function PlayerPage({ params }) {
    const { id } = await params
    const book = await getBookById(id)

    return <PlayerClient book={book} />
}
