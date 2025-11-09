import { useState } from 'react'
import api from '../services/api'

export default function FormularioResena({ juegoId, onReviewAdded }) {
  const [form, setForm] = useState({
    textoResena: '',
    puntuacion: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleStarClick = (value) => {
    setForm(prev => ({ ...prev, puntuacion: value }))
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  if (!juegoId) return
  if (!form.textoResena.trim() || form.puntuacion === 0) return
  try {
    const data = {
      textoResena: form.textoResena.trim(),
      puntuacion: form.puntuacion,
      juegoId
    }
    const res = await api.post('/reviews', data) 
    setForm({ textoResena: '', puntuacion: 0 })
    if (onReviewAdded && res.data) onReviewAdded(res.data)
  } catch (err) {
    console.error(err)
  }
}


  if (!juegoId) return null

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        marginTop: 10,
        borderTop: '1px solid #ddd',
        paddingTop: 10
      }}
    >
      <textarea
        name="textoResena"
        placeholder="Escribe tu reseña..."
        value={form.textoResena}
        onChange={handleChange}
        required
      />
      <div style={{ display: 'flex', gap: 5 }}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            style={{
              cursor: 'pointer',
              fontSize: 20,
              color: star <= form.puntuacion ? '#f5c518' : '#ccc'
            }}
          >
            ★
          </span>
        ))}
      </div>
      <button type="submit">Agregar Reseña</button>
    </form>
  )
}
