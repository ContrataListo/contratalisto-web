import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase-config'; // ✅ Ruta corregida
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function MisPostulaciones() {
  const [postulaciones, setPostulaciones] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const verificarUsuario = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsuario(user);
          obtenerPostulaciones(user.uid);
        } else {
          setUsuario(null);
          setMensaje('⚠️ Debes iniciar sesión para ver tus postulaciones.');
        }
      });
    };

    const obtenerPostulaciones = async (uid) => {
      try {
        const q = query(collection(db, 'Postulaciones'), where('usuarioId', '==', uid));
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPostulaciones(lista);
      } catch (error) {
        console.error('Error al obtener postulaciones:', error);
        setMensaje('❌ Error al cargar las postulaciones.');
      }
    };

    verificarUsuario();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mis Postulaciones</h1>
      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}

      {postulaciones.length === 0 && usuario ? (
        <p style={styles.noData}>No has postulado a ninguna vacante aún.</p>
      ) : (
        postulaciones.map((p) => (
          <div key={p.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{p.tituloVacante || 'Vacante sin título'}</h3>
            <p><strong>Estado:</strong> {p.Estado || 'Pendiente'}</p>
            <p><strong>Fecha de postulación:</strong> {p.fecha?.toDate().toLocaleString() || 'Desconocida'}</p>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
    textAlign: 'center',
    color: '#0070f3',
  },
  card: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  mensaje: {
    textAlign: 'center',
    color: '#0070f3',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  noData: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
  },
};