import { useState, useEffect } from 'react'
import api from '../services/api'
import ListaResenas from './ListaResenas'
import FormularioResena from './FormularioResena'

export default function TarjetaJuego({ juego = {}, onDeleteById, onLocalUpdate }) {
  const [completado, setCompletado] = useState(Boolean(juego?.completado))
  const [resenas, setResenas] = useState([])

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

  
  const eliminarResenaLocal = (id) => {
    setResenas(prev => prev.filter(r => r._id !== id))
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

  if (!juego || !juego._id) return null

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 10,
        padding: 12,
        margin: 12,
        width: 280,
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: completado ? '#d1ffd6' : '#fff',
        boxSizing: 'border-box'
      }}
    >
      <img
        src={juego.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen'}
        alt={juego.titulo || 'Juego'}
        style={{ width: '100%', borderRadius: 8, marginBottom: 8, objectFit: 'cover' }}
      />
      <h3 style={{ margin: '6px 0' }}>{juego.titulo}</h3>
      <p style={{ margin: '4px 0' }}>{juego.genero}</p>
      <p style={{ margin: '4px 0' }}>{juego.plataforma}</p>
      <p style={{ margin: '4px 0' }}>{juego.añolanzamiento}</p>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 10 }}>
        <button onClick={handleToggle} style={{ padding: '6px 10px' }}>
          {completado ? 'Marcar como no completado' : 'Marcar como completado'}
        </button>

        <button
          onClick={handleDelete}
          style={{
            backgroundColor: '#ff5c5c',
            color: '#fff',
            border: 'none',
            padding: '6px 10px',
            borderRadius: 4
          }}
        >
          Eliminar
        </button>
      </div>

      <div style={{ marginTop: 12, width: '100%', textAlign: 'left' }}>
        {}
        <ListaResenas
          resenas={resenas}
          onResenaActualizada={actualizarResenaLocal}
          onResenaEliminada={eliminarResenaLocal}
        />
        <FormularioResena juegoId={juego._id} onReviewAdded={agregarResenaLocal} />
      </div>
    </div>
  )
}
