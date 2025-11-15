import { useEffect, useState } from 'react'
import api from '../services/api'

export default function TodasResenas() {
  const [resenas, setResenas] = useState([])
  const [juegos, setJuegos] = useState([])

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resResenas, resJuegos] = await Promise.all([
          api.get('/reviews'),
          api.get('/juegos')
        ])
        setResenas(resResenas.data || [])
        setJuegos(resJuegos.data || [])
      } catch (err) {
        console.error('Error al cargar reseñas:', err)
        setResenas([])
        setJuegos([])
      }
    }
    cargarDatos()
  }, [])

  const obtenerJuego = (juegoId) => {
    return juegos.find(j => j._id === juegoId) || null
  }

  return (
    <div className="todas-resenas-section">
      <h2 className="seccion-titulo">Todas las Reseñas</h2>
      {resenas.length > 0 ? (
        <div className="resenas-lista">
          {resenas.map(resena => {
            const juego = obtenerJuego(resena.juegoId)
            return (
              <div key={resena._id} className="resena-item">
                {juego && (
                  <div className="resena-juego-info">
                    <img
                      src={juego.imagenPortada || 'https://via.placeholder.com/80x120?text=Sin+Imagen'}
                      alt={juego.titulo}
                      className="resena-juego-img"
                    />
                    <div className="resena-juego-details">
                      <h3>{juego.titulo}</h3>
                      <p className="resena-meta">{juego.genero} • {juego.plataforma}</p>
                    </div>
                  </div>
                )}
                <div className="resena-contenido">
                  <div className="resena-header">
                    <span className="resena-stars">{'⭐'.repeat(resena.puntuacion || 0)}</span>
                    <span className="resena-fecha">{new Date(resena.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <p className="resena-texto">{resena.textoResena || '(Sin texto)'}</p>
                  <div className="resena-datos">
                    <span>Horas: {resena.horasJugadas || 0}</span>
                    <span>Dificultad: {resena.dificultad || 'N/A'}</span>
                    <span>Recomienda: {resena.recomendaria ? 'Sí' : 'No'}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="no-reviews">
          No hay reseñas todavía.
        </div>
      )}
    </div>
  )
}

