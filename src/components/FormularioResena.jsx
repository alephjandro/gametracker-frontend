import { useState } from 'react'
import api from '../services/api'

export default function FormularioResena({ juegoId, onResenaAgregada }) {
  const [nuevaResena, setNuevaResena] = useState({
    textoResena: '',
    puntuacion: '',
    horasJugadas: '',
    dificultad: 'Normal',
    recomendar: true
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!juegoId) return
    try {
      const datosEnvio = {
        textoResena: nuevaResena.textoResena,
        puntuacion: nuevaResena.puntuacion,
        horasJugadas: nuevaResena.horasJugadas,
        dificultad: nuevaResena.dificultad,
        recomendaria: nuevaResena.recomendar,
        juegoId
      }
      const res = await api.post('/reviews', datosEnvio)
      if (onResenaAgregada) onResenaAgregada(res.data)
      setNuevaResena({
        textoResena: '',
        puntuacion: '',
        horasJugadas: '',
        dificultad: 'Normal',
        recomendar: true
      })
    } catch (error) {
      console.error('Error al agregar reseña:', error)
    }
  }

  return (
    <div className="formulario-container">
      <h4 className="formulario-titulo">Publicar reseña</h4>
      <form onSubmit={handleSubmit} className="formulario">
        {}
        <div className="campo">
          <textarea
            placeholder="Escribe tu reseña..."
            value={nuevaResena.textoResena}
            onChange={(e) => setNuevaResena({ ...nuevaResena, textoResena: e.target.value })}
          />
        </div>

        {}
        <div className="campos-horizontal">
          <div className="campo">
            <label>Puntuación:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={nuevaResena.puntuacion}
              onChange={(e) => setNuevaResena({ ...nuevaResena, puntuacion: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Horas jugadas:</label>
            <input
              type="number"
              min="0"
              value={nuevaResena.horasJugadas}
              onChange={(e) => setNuevaResena({ ...nuevaResena, horasJugadas: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Dificultad:</label>
            <select
              value={nuevaResena.dificultad}
              onChange={(e) => setNuevaResena({ ...nuevaResena, dificultad: e.target.value })}
            >
              <option value="Fácil">Fácil</option>
              <option value="Normal">Normal</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>

        {}
        <div className="recomendacion-container">
          <label className="recomendacion-label">¿Recomendarías este juego?</label>
          <div className="recomendacion-botones">
            <button
              type="button"
              className={`recomendacion-boton ${nuevaResena.recomendar ? 'activo' : ''}`}
              onClick={() => setNuevaResena({ ...nuevaResena, recomendar: true })}
            >
              Sí
            </button>
            <button
              type="button"
              className={`recomendacion-boton ${!nuevaResena.recomendar ? 'activo' : ''}`}
              onClick={() => setNuevaResena({ ...nuevaResena, recomendar: false })}
            >
              No
            </button>
          </div>
        </div>

        {}
        <div className="boton-container">
          <button type="submit" className="boton-enviar">Publicar reseña</button>
        </div>
      </form>
    </div>
  )
}








