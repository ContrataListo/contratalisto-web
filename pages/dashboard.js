import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const goToProfile = () => {
    router.push('/profile');
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Bienvenido al Panel de Usuario</h1>
      {user && <p>Sesión iniciada con: <strong>{user.email}</strong></p>}

      <button onClick={goToProfile} style={{
        marginRight: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Ver Perfil
      </button>

      <button onClick={handleLogout} style={{
        padding: '0.5rem 1rem',
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        Cerrar sesión
      </button>
    </div>
  );
}