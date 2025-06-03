// pages/index.js
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        Bienvenido a <span>ContrataListo</span>
      </h1>
      <p className={styles.description}>
        Tu plataforma de empleo moderna, rápida y confiable.
      </p>
      <div className={styles.buttons}>
        <Link href="/login">
          <button className={styles.btn}>Iniciar sesión</button>
        </Link>
        <Link href="/register">
          <button className={styles.btnSecundario}>Registrarse</button>
        </Link>
      </div>
    </main>
  );
}