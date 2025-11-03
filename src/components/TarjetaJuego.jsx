import { useState } from 'react'
import api from '../services/api'

function TarjetaJuego({ juego, onUpdate }) {
  if (!juego || typeof juego !== 'object') {
    return null
  }

  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({
    titulo: juego.titulo ?? '',
    genero: juego.genero ?? '',
    plataforma: juego.plataforma ?? '',
    añolanzamiento: juego.añolanzamiento ?? '',
    descripcion: juego.descripcion ?? '',
    imagenPortada: juego.imagenPortada ?? ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleGuardar = async () => {
    try {
      await api.put(`/juegos/${juego._id}`, form)
      setEditando(false)
      if (onUpdate) onUpdate()
    } catch (err) {
      console.error('Error al actualizar el juego', err)
    }
  }

  const handleEliminar = async () => {
    try {
      await api.delete(`/juegos/${juego._id}`)
      if (onUpdate) onUpdate()
    } catch (err) {
      console.error('Error al eliminar el juego', err)
    }
  }

  if (!juego || !juego._id) return null
return (
  <div
    style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px',
      width: '280px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
      boxSizing: 'border-box'
    }}
  >
    {editando ? (
      <form
        onSubmit={e => {
          e.preventDefault()
          handleGuardar()
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          padding: '10px 5px'
        }}
      >
        <input
          name="titulo"
          placeholder="Título"
          value={form.titulo}
          onChange={handleChange}
          required
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          name="genero"
          placeholder="Género"
          value={form.genero}
          onChange={handleChange}
          required
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          name="plataforma"
          placeholder="Plataforma"
          value={form.plataforma}
          onChange={handleChange}
          required
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          name="añolanzamiento"
          type="number"
          placeholder="Año de lanzamiento"
          value={form.añolanzamiento}
          onChange={handleChange}
          required
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
        />
        <input
          name="imagenPortada"
          placeholder="URL de la imagen"
          value={form.imagenPortada}
          onChange={handleChange}
          style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#4caf50',
              color: '#fff',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={() => setEditando(false)}
            style={{
              backgroundColor: '#999',
              color: '#fff',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    ) : (
      <>
        <img
          src={form.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen'}
          alt={form.titulo || 'Juego sin título'}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
        />
        <h3>{form.titulo}</h3>
        <p>{form.genero}</p>
        <p>{form.plataforma}</p>
        <p>{form.añolanzamiento}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={() => setEditando(true)}
            style={{
              padding: '6px 12px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#2196f3',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            Editar
          </button>
          <button
            onClick={handleEliminar}
            style={{
              backgroundColor: '#ff5c5c',
              color: '#fff',
              padding: '6px 12px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Eliminar
          </button>
        </div>
      </>
    )}
  </div>
)
}

export default TarjetaJuego
