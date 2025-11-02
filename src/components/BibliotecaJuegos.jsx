import { useEffect, useState } from 'react'
import api from '../services/api'

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([])

  useEffect(() => {
    api.get('/juegos')
      .then(res => setJuegos(res.data))
      .catch(err => console.error('Error al conectar con la API', err))
  }, [])

  return (
    <div>
      <h2>Biblioteca de Juegos</h2>
      {juegos.length > 0 ? (
        <ul>
          {juegos.map(j => (
            <li key={j._id}>{j.titulo}</li>
          ))}
        </ul>
      ) : (
        <p>No hay juegos registrados.</p>
      )}
    </div>
  )
}

export default BibliotecaJuegos
