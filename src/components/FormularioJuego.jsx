import { useState } from 'react'
import api from '../services/api'

function FormularioJuego({ onGameAdded }) {
  const [form, setForm] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añolanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      console.log('Datos a enviar:', form)
      await api.post('/juegos', form)
      if (onGameAdded) onGameAdded()
      setForm({
        titulo: '',
        genero: '',
        plataforma: '',
        añolanzamiento: '',
        desarrollador: '',
        imagenPortada: '',
        descripcion: '',
        completado: false
      })
    } catch (error) {
      console.error('Error al crear el juego:', error)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '300px',
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}
      >
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
        <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
        <input name="añolanzamiento" type="number" placeholder="Año de lanzamiento" value={form.añolanzamiento} onChange={handleChange} required />
        <input name="desarrollador" placeholder="Desarrollador" value={form.desarrollador} onChange={handleChange} required />
        <input name="imagenPortada" placeholder="URL de la imagen" value={form.imagenPortada} onChange={handleChange} />
        <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        <label>
          <input name="completado" type="checkbox" checked={form.completado} onChange={handleChange} /> Completado
        </label>
        <button type="submit">Agregar Juego</button>
      </form>
    </div>
  )
}

export default FormularioJuego

