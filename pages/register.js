import { useState } from 'react';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const registerUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={registerUser}>Crear cuenta</button>
    </div>
  );
}
