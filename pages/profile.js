import { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config'; // ✅ ruta corregida
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState({
    nombre: '',
    nacionalidad: '',
    edad: '',
    fechaNacimiento: '',
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        const docRef = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setPerfil(snap.data());
        }
      }
    });
    return () => unsub();
  }, []);

  const guardarPerfil = async () => {
    if (!usuario) return;
    const docRef = doc(db, 'usuarios', usuario.uid);
    await setDoc(docRef, perfil);
    alert('✅ Perfil actualizado correctamente');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>Mi Perfil</h2>

      <label>Nombre completo:</label>
      <input
        type="text"
        value={perfil.nombre}
        onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
        style={styles.input}
      />

      <label>Fecha de nacimiento:</label>
      <input
        type="date"
        value={perfil.fechaNacimiento}
        onChange={(e) => {
          const fecha = e.target.value;
          const edad = calcularEdad(fecha);
          setPerfil({ ...perfil, fechaNacimiento: fecha, edad });
        }}
        style={styles.input}
      />

      <label>Nacionalidad:</label>
      <input
        type="text"
        value={perfil.nacionalidad}
        onChange={(e) => setPerfil({ ...perfil, nacionalidad: e.target.value })}
        style={styles.input}
      />

      <button onClick={guardarPerfil} style={styles.boton}>
        Guardar cambios
      </button>
    </div>
  );
}

function calcularEdad(fecha) {
  const hoy = new Date();
  const cumple = new Date(fecha);
  let edad = hoy.getFullYear() - cumple.getFullYear();
  const m = hoy.getMonth() - cumple.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumple.getDate())) {
    edad--;
  }
  return edad;
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  titulo: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#0070f3',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '15px',
  },
  boton: {
    padding: '12px 20px',
    width: '100%',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};