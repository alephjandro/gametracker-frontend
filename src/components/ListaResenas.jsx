import { useState } from 'react'
import api from '../services/api'

export default function ListaResenas({ resenas, onResenaActualizada, onResenaEliminada }) {
  const [editandoId, setEditandoId] = useState(null)
  const [form, setForm] = useState({
    textoResena: '',
    puntuacion: 0,
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: false
  })

  const handleEditClick = (resena) => {
    setEditandoId(resena._id)
    setForm({
      textoResena: resena.textoResena || '',
      puntuacion: resena.puntuacion || 0,
      horasJugadas: resena.horasJugadas || 0,
      dificultad: resena.dificultad || 'Normal',
      recomendaria: resena.recomendaria || false
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSave = async (id) => {
    try {
      const res = await api.put(`/reviews/${id}`, form)
      if (onResenaActualizada) onResenaActualizada(res.data)
      setEditandoId(null)
    } catch (err) {
      console.error('Error al actualizar la reseña', err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`)
      if (onResenaEliminada) onResenaEliminada(id)
    } catch (err) {
      console.error('Error al eliminar la reseña', err)
    }
  }

  if (!resenas) return null

  return (
    <div style={{ textAlign: 'left', marginTop: 10 }}>
      <h4 style={{ marginBottom: 5 }}>Reseñas</h4>
      {resenas.length > 0 ? (
        resenas.map(r => (
          <div key={r._id} style={{ borderBottom: '1px solid #ddd', padding: '5px 0', marginBottom: 5 }}>
            {editandoId === r._id ? (
              <>
                <textarea
                  name="textoResena"
                  value={form.textoResena}
                  onChange={handleChange}
                  style={{ width: '100%', marginBottom: 4 }}
                />
                <div>
                  <label>Puntuación: </label>
                  <input
                    type="number"
                    name="puntuacion"
                    value={form.puntuacion}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    style={{ width: 50 }}
                  />
                </div>
                <div>
                  <label>Horas jugadas: </label>
                  <input
                    type="number"
                    name="horasJugadas"
                    value={form.horasJugadas}
                    onChange={handleChange}
                    style={{ width: 70 }}
                  />
                </div>
                <div>
                  <label>Dificultad: </label>
                  <select name="dificultad" value={form.dificultad} onChange={handleChange}>
                    <option value="Fácil">Fácil</option>
                    <option value="Normal">Normal</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="recomendaria"
                      checked={form.recomendaria}
                      onChange={handleChange}
                    /> Recomendaría
                  </label>
                </div>
                <button onClick={() => handleSave(r._id)}>💾 Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <p style={{ margin: '3px 0' }}>{r.textoResena || '(Sin texto)'}</p>
                <p style={{ margin: '3px 0', color: '#f5c518' }}>{'⭐'.repeat(r.puntuacion || 0)}</p>
                <p style={{ margin: '3px 0' }}>Horas jugadas: {r.horasJugadas ?? 0}</p>
                <p style={{ margin: '3px 0' }}>Dificultad: {r.dificultad || 'Normal'}</p>
                <p style={{ margin: '3px 0' }}>Recomendaría: {r.recomendaria ? 'Sí' : 'No'}</p>
                <button onClick={() => handleEditClick(r)}>✏️ Editar</button>
                <button onClick={() => handleDelete(r._id)}>🗑 Eliminar</button>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No hay reseñas todavía.</p>
      )}
    </div>
  )
}
