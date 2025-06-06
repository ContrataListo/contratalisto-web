// pages/ver-vacantesVisual.js
import React, { useEffect, useState } from "react";
import styles from "../styles/verVacantes.module.css";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const VerVacantesVisual = () => {
  const [vacantes, setVacantes] = useState([]);

  useEffect(() => {
    const fetchVacantes = async () => {
      const vacantesRef = collection(db, "vacantes");
      const snapshot = await getDocs(vacantesRef);
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVacantes(lista);
    };

    fetchVacantes();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vacantes disponibles</h1>
      <div className={styles.grid}>
        {vacantes.length === 0 ? (
          <p>No hay vacantes disponibles por ahora.</p>
        ) : (
          vacantes.map((vacante) => (
            <div key={vacante.id} className={styles.card}>
              <h2>{vacante.cargo}</h2>
              <p><strong>Empresa:</strong> {vacante.empresa}</p>
              <p><strong>Ubicación:</strong> {vacante.ubicacion}</p>
              <p><strong>Salario:</strong> {vacante.salario}</p>
              <p><strong>Descripción:</strong> {vacante.descripcion}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerVacantesVisual;