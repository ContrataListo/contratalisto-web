import React from 'react';

const DashboardVisual = () => {
  return (
    <div style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2rem', color: '#1a202c' }}>
        Bienvenido al Panel Visual de <span style={{ color: '#0070f3' }}>ContrataListo</span>
      </h1>
      <p style={{ fontSize: '1rem', color: '#4b5563' }}>
        Aquí verás tus accesos rápidos y resumen de actividad.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {[
          'Mis Aplicaciones',
          'Ofertas Recomendadas',
          'Editar Perfil',
          'Notificaciones',
          'Configuración',
          'Cerrar sesión'
        ].map((item, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            padding: '1.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardVisual;