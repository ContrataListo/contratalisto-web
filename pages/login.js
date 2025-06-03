import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); // Redirige al dashboard
    } catch (error) {
      console.error(error);
      alert(`Error al iniciar sesión: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin} style={{ display: 'inline-block', marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '0.5rem', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '0.5rem', width: '250px' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1.5rem' }}>
          Ingresar
        </button>
      </form>
    </div>
  );
}