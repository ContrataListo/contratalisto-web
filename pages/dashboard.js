import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const irAVacantes = () => router.push('/ver-vacantes');
  const irAPostulaciones = () => router.push('/mis-postulaciones');
  const irAEditarPerfil = () => router.push('/profile');

  return (
    <div style={styles.fondo}>
      <div style={styles.contenedor}>
        <h1 style={styles.titulo}>👋 Bienvenido a ContrataListo</h1>
        {usuario && (
          <p style={styles.subtitulo}>
            Sesión iniciada como <strong>{usuario.email}</strong>
          </p>
        )}

        <div style={styles.botones}>
          <button onClick={irAVacantes} style={styles.botonSecundario}>🔍 Ver Vacantes</button>
          <button onClick={irAPostulaciones} style={styles.botonSecundario}>📄 Mis Postulaciones</button>
          <button onClick={irAEditarPerfil} style={styles.botonSecundario}>🧑 Editar Perfil</button>
        </div>

        <button onClick={handleLogout} style={styles.botonCerrar}>🚪 Cerrar sesión</button>
      </div>
    </div>
  );
}

const styles = {
  fondo: {
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
    padding: '60px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contenedor: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  titulo: {
    fontSize: '26px',
    marginBottom: '15px',
    color: '#0070f3',
  },
  subtitulo: {
    fontSize: '16px',
    marginBottom: '30px',
    color: '#333',
  },
  botones: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '25px',
  },
  botonSecundario: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  botonCerrar: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};