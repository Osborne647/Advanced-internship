import Image from "next/image"
import Link from "next/link"
import styles from "./BookCard.module.css"

export default function BookCard({ book }) {
    return (
        <Link href={`/book/${book.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={140}
                    height={210}
                    className={styles.image}
                />
            </div>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>
            <div className={styles.meta}>
                <span>⏱ {book.duration ?? book.subscriptionRequired}</span>
                <span>⭐ {book.averageRating}</span>
            </div>
        </Link>
    )
}