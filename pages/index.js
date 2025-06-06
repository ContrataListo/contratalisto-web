// pages/index.js
import React, { useEffect, useState } from "react";
import styles from "../styles/landing.module.css";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Home = () => {
  const [estadisticas, setEstadisticas] = useState({
    empleos: 0,
    empresas: 0,
    cvs: 0,
    postulaciones: 0,
  });

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const vacantesSnap = await getDocs(collection(db, "Vacantes"));
        const empresasSnap = await getDocs(collection(db, "Empresas"));
        const usuariosSnap = await getDocs(
          query(collection(db, "Usuarios"), where("tipoCuenta", "==", "trabajador"))
        );
        const postulacionesSnap = await getDocs(collection(db, "Postulaciones"));

        setEstadisticas({
          empleos: vacantesSnap.size,
          empresas: empresasSnap.size,
          cvs: usuariosSnap.size,
          postulaciones: postulacionesSnap.size,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      }
    };

    cargarEstadisticas();
  }, []);

  return (
    <div className={styles.landingContainer}>
      <header className={styles.landingHeader}>
        <div className={styles.logo}>✔ ContrataListo</div>
        <nav className={styles.navLinks}>
          <a href="/ver-vacantesVisual">Buscar empleos</a>
          <a href="/login">Iniciar sesión</a>
          <a href="/register">Registrarse</a>
        </nav>
      </header>

      <main className={styles.landingMain}>
        <h1>Encuentra el empleo ideal en segundos</h1>
        <p>Publica tu hoja de vida, postula a vacantes y conéctate con miles de empresas.</p>

        <div className={styles.searchBar}>
          <input type="text" placeholder="¿Qué empleo estás buscando?" />
          <input type="text" placeholder="¿En qué ciudad?" />
          <button>Buscar</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <h2>{estadisticas.empleos}</h2>
            <p>Empleos activos</p>
          </div>
          <div className={styles.statBox}>
            <h2>{estadisticas.empresas}</h2>
            <p>Empresas registradas</p>
          </div>
          <div className={styles.statBox}>
            <h2>{estadisticas.cvs}</h2>
            <p>Hojas de vida</p>
          </div>
          <div className={styles.statBox}>
            <h2>{estadisticas.postulaciones}</h2>
            <p>Postulaciones</p>
          </div>
        </div>

        <section className={styles.benefits}>
          <h2>¿Por qué usar ContrataListo?</h2>
          <ul>
            <li>✔ Plataforma moderna, rápida y segura.</li>
            <li>✔ Miles de empresas buscando talento como el tuyo.</li>
            <li>✔ Postula fácil y haz seguimiento a tus vacantes.</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;