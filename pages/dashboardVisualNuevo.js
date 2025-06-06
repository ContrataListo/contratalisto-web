import React from 'react';
import styles from '../styles/dashboardNuevo.module.css';

export default function DashboardVisualNuevo() {
  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>Bienvenido a <span className={styles.logoText}>ContrataListo</span></h1>
        <p>Tu espacio profesional para encontrar empleo y oportunidades.</p>
      </header>

      <nav className={styles.dashboardNav}>
        <button>Mi Perfil</button>
        <button>Ofertas Recomendadas</button>
        <button>Mis Aplicaciones</button>
        <button>Notificaciones</button>
        <button>Configuración</button>
        <button>Cerrar sesión</button>
      </nav>

      <section className={styles.dashboardSection}>
        <h2>Resumen de Actividad</h2>
        <div className={styles.cardGrid}>
          <div className={styles.card}>Aplicaciones Enviadas: <strong>12</strong></div>
          <div className={styles.card}>Ofertas Guardadas: <strong>7</strong></div>
          <div className={styles.card}>Mensajes Recibidos: <strong>4</strong></div>
        </div>
      </section>
    </div>
  );
}