import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function PublicarVacante() {
  const [formData, setFormData] = useState({
    Titulo: '',
    Descripcion: '',
    Tipo_contrato: '',
    Salario: '',
    Ubicacion: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'Vacantes'), {
        ...formData,
        Estado: 'Activa',
        Empresa_id: 'Empresa1',
        fechaPublicacion: Timestamp.now(),
      });
      setMensaje('✅ Vacante publicada con éxito');
      setFormData({
        Titulo: '',
        Descripcion: '',
        Tipo_contrato: '',
        Salario: '',
        Ubicacion: '',
      });
    } catch (error) {
      console.error('Error al publicar vacante:', error);
      setMensaje('❌ Error al publicar la vacante.');
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()} style={styles.backButton}>← Volver</button>
      <h1 style={styles.title}>Publicar Vacante</h1>
      {mensaje && <p style={styles.mensaje}>{mensaje}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="Titulo"
          placeholder="Título del cargo"
          value={formData.Titulo}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="Descripcion"
          placeholder="Descripción del cargo"
          value={formData.Descripcion}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <input
          type="text"
          name="Tipo_contrato"
          placeholder="Tipo de contrato (Ej: Término fijo)"
          value={formData.Tipo_contrato}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="Salario"
          placeholder="Salario (Ej: $2.000.000)"
          value={formData.Salario}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="Ubicacion"
          placeholder="Ubicación"
          value={formData.Ubicacion}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Publicar Vacante</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '100px',
  },
  button: {
    padding: '14px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  backButton: {
    marginBottom: '20px',
    backgroundColor: '#f2f2f2',
    border: 'none',
    padding: '10px 15px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '5px',
    color: '#333'
  },
  mensaje: {
    textAlign: 'center',
    color: '#0070f3',
    marginBottom: '10px',
    fontWeight: 'bold'
  }
};