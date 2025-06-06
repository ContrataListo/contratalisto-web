// pages/register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config"; // ✅ Ruta corregida

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("trabajador");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Usuarios", user.uid), {
        nombre,
        email,
        tipoCuenta,
        uid: user.uid,
      });

      alert("Registro exitoso");
    } catch (error) {
      console.error("Error registrando usuario:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1>Crear cuenta</h1>
      <form onSubmit={handleRegister} style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div>
          <label>Nombre completo:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Correo electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        </div>
        <div>
          <label>Tipo de cuenta:</label>
          <select
            value={tipoCuenta}
            onChange={(e) => setTipoCuenta(e.target.value)}
            style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          >
            <option value="trabajador">Trabajador</option>
            <option value="empresa">Empresa</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#2e7d32",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;