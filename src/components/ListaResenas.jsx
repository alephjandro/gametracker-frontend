import { useState } from 'react'

export default function ListaResenas({ resenas, onDelete, onEdit }) {
  const [editando, setEditando] = useState(null)
  const [texto, setTexto] = useState('')
  const [horas, setHoras] = useState('')
  const [dificultad, setDificultad] = useState('')
  const [recomienda, setRecomienda] = useState(false)
  const [puntuacion, setPuntuacion] = useState(0)

  if (!resenas) return null

  const iniciarEdicion = (r) => {
    setEditando(r._id)
    setTexto(r.textoResena || '')
    setHoras(r.horasJugadas || '')
    setDificultad(r.dificultad || '')
    setRecomienda(Boolean(r.recomendaria))
    setPuntuacion(r.puntuacion || 0)
  }

  const guardarCambios = async () => {
    const nuevosDatos = {
      textoResena: texto,
      horasJugadas: Number(horas),
      dificultad,
      recomendaria: recomienda,
      puntuacion: Number(puntuacion)
    }

    await onEdit(editando, nuevosDatos)
    setEditando(null)
  }

  return (
    <div className="reviews-section">
      <h4 className="reviews-title">Reseñas</h4>
      {resenas.length > 0 ? (
        <div className="reviews-grid">
          {resenas.map(r => (
            <div key={r._id} className="review-card">
              {editando === r._id ? (
                <>
                  <div className="review-card-editing-field">
                    <textarea value={texto} onChange={e => setTexto(e.target.value)} />
                  </div>
                  <div className="review-card-editing-field">
                    <input
                      type="number"
                      placeholder="Horas jugadas"
                      value={horas}
                      onChange={e => setHoras(e.target.value)}
                    />
                  </div>
                  <div className="review-card-editing-field">
                    <select
                      value={dificultad}
                      onChange={e => setDificultad(e.target.value)}
                      className="select-dificultad"
                    >
                      <option value="">Dificultad</option>
                      <option value="Fácil">Fácil</option>
                      <option value="Normal">Normal</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>

                  <div className="recomendacion-container">
                    <span>Recomendarías este juego?</span>
                    <div className="recomendacion-botones">
                      <button
                        type="button"
                        className={`recomendacion-boton ${recomienda ? 'activo' : ''}`}
                        onClick={() => setRecomienda(true)}
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        className={`recomendacion-boton ${!recomienda ? 'activo' : ''}`}
                        onClick={() => setRecomienda(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="review-card-editing-field">
                    <label>Puntuación:</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={puntuacion}
                      onChange={e => setPuntuacion(e.target.value)}
                    />
                  </div>
                  <div className="review-card-actions">
                    <button className="primary" onClick={guardarCambios}>Guardar</button>
                    <button onClick={() => setEditando(null)}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="review-text">{r.textoResena || '(Sin texto)'}</p>
                  <p className="review-stars">{'⭐'.repeat(r.puntuacion || 0)}</p>
                  <p><strong>Horas:</strong> {r.horasJugadas || 0}</p>
                  <p><strong>Dificultad:</strong> {r.dificultad || 'N/A'}</p>
                  <p><strong>Recomienda:</strong> {r.recomendaria ? 'Sí' : 'No'}</p>
                  <div className="review-card-actions">
                    <button onClick={() => iniciarEdicion(r)}>Editar</button>
                    <button onClick={() => onDelete(r._id)}>Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-reviews">
          No hay reseñas todavía.
        </div>
      )}
    </div>
  )
}
