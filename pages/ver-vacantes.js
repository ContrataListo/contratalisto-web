import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function VerVacantes() {
  const [vacantes, setVacantes] = useState([]);

  useEffect(() => {
    const obtenerVacantes = async () => {
      try {
        const q = collection(db, 'Vacantes'); // nombre exacto de tu colección en Firebase
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVacantes(lista);
      } catch (error) {
        console.error("Error al obtener vacantes:", error);
      }
    };

    obtenerVacantes();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vacantes Disponibles</h1>

      {vacantes.length === 0 ? (
        <p style={styles.noData}>No hay vacantes publicadas aún.</p>
      ) : (
        vacantes.map((vacante) => (
          <div key={vacante.id} style={styles.card}>
            <h2 style={styles.cardTitle}>{vacante.Titulo || vacante.titulo}</h2>
            <p><strong>Ubicación:</strong> {vacante.Ubicacion || vacante.ubicacion}</p>
            <p><strong>Tipo de contrato:</strong> {vacante.Tipo_contrato || vacante.tipo}</p>
            <p><strong>Salario:</strong> {vacante.Salario || vacante.salario || 'No especificado'}</p>
            <p style={styles.descripcion}>
              <strong>Descripción:</strong><br />{vacante.Descripcion || vacante.descripcion}
            </p>
            <button style={styles.btnPostular}>Postularme</button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '32px',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#0070f3',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '25px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  cardTitle: {
    fontSize: '22px',
    marginBottom: '10px',
    color: '#333',
  },
  descripcion: {
    marginTop: '10px',
    color: '#444',
    lineHeight: 1.5,
  },
  btnPostular: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  noData: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#777',
  }
};