import { useState, useEffect } from 'react'
import api from '../services/api'
import ModalJuego from './ModalJuego'

export default function TarjetaJuego({ juego = {}, onDeleteById, onLocalUpdate }) {
  const [completado, setCompletado] = useState(Boolean(juego?.completado))
  const [resenas, setResenas] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)

  useEffect(() => {
    if (juego && typeof juego === 'object') {
      setCompletado(Boolean(juego.completado))
    }
  }, [juego])

  useEffect(() => {
    const cargarResenas = async () => {
      if (!juego._id) return
      try {
        const res = await api.get(`/reviews/juego/${juego._id}`)
        setResenas(res.data || [])
      } catch {
        setResenas([])
      }
    }
    cargarResenas()
  }, [juego._id])

  const agregarResenaLocal = (nuevaResena) => {
    setResenas(prev => [nuevaResena, ...prev])
  }

  const actualizarResenaLocal = (resenaActualizada) => {
    setResenas(prev =>
      prev.map(r => (r._id === resenaActualizada._id ? resenaActualizada : r))
    )
  }

  const eliminarResenaLocal = async (id) => {
    try {
      await api.delete(`/reviews/${id}`)
      setResenas(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.error('Error al eliminar reseña:', err)
    }
  }

  const handleDelete = async () => {
    try {
      if (onDeleteById && juego._id) {
        await onDeleteById(juego._id)
      } else if (juego._id) {
        await api.delete(`/juegos/${juego._id}`)
      }
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  const handleToggle = async () => {
    try {
      const nuevo = !completado
      setCompletado(nuevo)
      if (juego._id) {
        const res = await api.put(`/juegos/${juego._id}`, { completado: nuevo })
        const updated = res.data && typeof res.data === 'object' ? res.data : { ...juego, completado: nuevo }
        if (onLocalUpdate) onLocalUpdate(updated)
      }
    } catch (err) {
      console.error('Error al alternar completado:', err)
      setCompletado(prev => !prev)
    }
  }

  const handleToggleModal = () => {
    setMostrarModal(!mostrarModal)
  }

  const handleToggleEnModal = async () => {
    await handleToggle()
  }

  const handleDeleteEnModal = async () => {
    await handleDelete()
    setMostrarModal(false)
  }

  const handleResenaEditada = async (id, nuevosDatos) => {
    try {
      const res = await api.put(`/reviews/${id}`, nuevosDatos)
      if (res.data && res.data._id) {
        actualizarResenaLocal(res.data)
      }
    } catch (err) {
      console.error('Error al editar reseña:', err)
    }
  }

  const handleJuegoEditado = async (id, nuevosDatos) => {
    try {
      const res = await api.put(`/juegos/${id}`, nuevosDatos)
      if (res.data && res.data._id) {
        const updated = res.data
        if (onLocalUpdate) onLocalUpdate(updated)
        setCompletado(Boolean(updated.completado))
      }
    } catch (err) {
      console.error('Error al editar juego:', err)
    }
  }

  if (!juego || !juego._id) return null

  const cardClasses = `game-card ${completado ? 'completed' : ''}`
  const juegoActualizado = { ...juego, completado }

  return (
    <>
      <div className={cardClasses} onClick={handleToggleModal}>
        <img
          src={juego.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen'}
          alt={juego.titulo || 'Juego'}
          className="game-card-img"
        />
        <div className="game-card-content">
          <h3 className="game-title">{juego.titulo}</h3>
          <div className="game-meta">
            <span className="meta-item">{juego.genero}</span>
            <span className="meta-item">{juego.plataforma}</span>
            {juego.añolanzamiento && (
              <span className="meta-item">{juego.añolanzamiento}</span>
            )}
          </div>
          {resenas.length > 0 && (
            <div className="game-resenas-count">
              {resenas.length} {resenas.length === 1 ? 'reseña' : 'reseñas'}
            </div>
          )}
        </div>
      </div>
      {mostrarModal && (
        <ModalJuego
          juego={juegoActualizado}
          resenas={resenas}
          onClose={handleToggleModal}
          onToggleCompletado={handleToggleEnModal}
          onDelete={handleDeleteEnModal}
          onResenaAgregada={agregarResenaLocal}
          onResenaEditada={handleResenaEditada}
          onResenaEliminada={eliminarResenaLocal}
          onJuegoEditado={handleJuegoEditado}
        />
      )}
    </>
  )
}
