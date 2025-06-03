// pages/profile.js
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [hojaVida, setHojaVida] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Cargar datos del usuario si existen
        const docRef = doc(db, "usuarios", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNombreCompleto(data.nombreCompleto || "");
          setFechaNacimiento(data.fechaNacimiento || "");
          setNacionalidad(data.nacionalidad || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(fechaNacimiento);
      const edadCalculada =
        hoy.getFullYear() -
        nacimiento.getFullYear() -
        (hoy.getMonth() < nacimiento.getMonth() ||
        (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())
          ? 1
          : 0);
      setEdad(edadCalculada);
    }
  }, [fechaNacimiento]);

  const handleGuardar = async () => {
    if (!user) return;

    try {
      await setDoc(doc(db, "usuarios", user.uid), {
        nombreCompleto,
        fechaNacimiento,
        nacionalidad,
        email: user.email,
      });
      alert("Datos guardados correctamente.");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Hubo un error al guardar los datos.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Perfil del Usuario</h2>

      <p><strong>Nombre completo:</strong></p>
      <input
        type="text"
        value={nombreCompleto}
        onChange={(e) => setNombreCompleto(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <p><strong>Correo electrónico:</strong> {user?.email}</p>

      <p><strong>Fecha de nacimiento:</strong></p>
      <input
        type="date"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <p><strong>Edad:</strong> {edad || "(no calculada)"}</p>

      <p><strong>Nacionalidad:</strong></p>
      <input
        type="text"
        value={nacionalidad}
        onChange={(e) => setNacionalidad(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <p><strong>Foto de perfil:</strong></p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFotoPerfil(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />
      {fotoPerfil && (
        <img
          src={URL.createObjectURL(fotoPerfil)}
          alt="Foto de perfil"
          style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginTop: "1rem" }}
        />
      )}

      <p><strong>Subir hoja de vida (PDF o Word):</strong></p>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setHojaVida(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />

      <br />
      <button onClick={handleGuardar}>Guardar</button>
    </div>
  );
}