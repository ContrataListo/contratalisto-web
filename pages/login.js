import { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={loginUser}>Ingresar</button>
    </div>
  );
}
