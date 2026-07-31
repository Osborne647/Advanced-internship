import Image from "next/image"
import styles from "./FeaturedBook.module.css"

export default function FeaturedBook({ book }) {
    return (
        <div className={styles.featured}>
            <div className={styles.textBlock}>
                <p className={styles.subtitle}>{book.subTitle}</p>
            </div>
            <div className={styles.card}>
                <Image
                    src={book.imageLink}
                    alt={book.title}
                    width={100}
                    height={140}
                    className={styles.image}
                />
                <div className={styles.details}>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <button className={styles.playBtn}>▶</button>
                    <span>{book.duration}</span>
                </div>
            </div>
        </div>
    )
}