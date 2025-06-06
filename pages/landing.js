// pages/landing.js
import React, { useEffect, useState } from "react";
import styles from "../styles/landing.module.css";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Landing = () => {
  const [estadisticas, setEstadisticas] = useState({
    empleos: 0,
    empresas: 0,
    cvs: 0,
    postulaciones: 0,
  });

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        // Usamos los nombres exactos con mayúsculas
        const vacantesSnap = await getDocs(collection(db, "Vacantes"));
        console.log("Vacantes encontradas:", vacantesSnap.size);

        const empresasSnap = await getDocs(collection(db, "Empresas"));
        console.log("Empresas encontradas:", empresasSnap.size);

        const usuariosSnap = await getDocs(
          query(collection(db, "Usuarios"), where("tipoCuenta", "==", "trabajador"))
        );
        console.log("CVs encontrados (Usuarios):", usuariosSnap.size);

        const postulacionesSnap = await getDocs(collection(db, "Postulaciones"));
        console.log("Postulaciones encontradas:", postulacionesSnap.size);

        setEstadisticas({
          empleos: vacantesSnap.size,
          empresas: empresasSnap.size,
          cvs: usuariosSnap.size,
          postulaciones: postulacionesSnap.size,
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    cargarEstadisticas();
  }, []);

  return (
    <div className={styles.landingContainer}>
      <header className={styles.landingHeader}>
        <div className={styles.logo}>✔ ContrataListo</div>
        <nav className={styles.navLinks}>
          <a href="#">Buscar empleos</a>
          <a href="#">Empresas</a>
          <a href="/login">Iniciar sesión</a>
        </nav>
      </header>

      <main className={styles.landingMain}>
        <h1>Encuentra el empleo ideal</h1>
        <p>Busca entre miles de ofertas de trabajo y aplica fácilmente.</p>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Cargo, palabra clave o empresa" />
          <input type="text" placeholder="Ciudad o departamento" />
          <button>Buscar</button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statBox}>
            <h2>{estadisticas.empleos}</h2>
            <p>Empleos disponibles</p>
          </div>
          <div className={styles.statBox}>
            <h2>{estadisticas.empresas}</h2>
            <p>Empresas</p>
          </div>
          <div className={styles.statBox}>
            <h2>{estadisticas.cvs}</h2>
            <p>CV registrados</p>
          </div>
          <div className={styles.statBox}>
            <h2>{estadisticas.postulaciones}</h2>
            <p>Postulaciones</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;