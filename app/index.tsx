import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <h1>Welcome to Your Soccer Brand</h1>
      </header>
      <main>
        <p>Explore our products and become the star player of your team!</p>
        <Link href="/chatbot">
          <a>Chat with TekkAI</a>
        </Link>
      </main>
    </div>
  )
}