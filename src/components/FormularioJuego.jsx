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
    console.log('handleSubmit ejecutado', form)

    try {
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
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="game-form-layout">
        <div className="campo">
          <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
        </div>
        <div className="campo">
          <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
        </div>
        <div className="campo">
          <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
        </div>
        <div className="campo">
          <input name="añolanzamiento" type="number" placeholder="Año de lanzamiento" value={form.añolanzamiento} onChange={handleChange} required />
        </div>
        <div className="campo">
          <input name="desarrollador" placeholder="Desarrollador" value={form.desarrollador} onChange={handleChange} required />
        </div>
        <div className="campo">
          <input name="imagenPortada" placeholder="URL de la imagen" value={form.imagenPortada} onChange={handleChange} />
        </div>

        {form.imagenPortada && (
          <img
            src={form.imagenPortada}
            alt="Preview portada"
            className="preview-portada"
          />
        )}

        <div className="campo">
          <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
        </div>

        <label className="checkbox">
          <input name="completado" type="checkbox" checked={form.completado} onChange={handleChange} />
          Completado
        </label>

        <button type="submit" className="primary boton-enviar">Agregar Juego</button>
      </form>
    </div>
  )
}

export default FormularioJuego
