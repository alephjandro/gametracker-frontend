import { useEffect, useState } from 'react'
import api from '../services/api'
import TarjetaJuego from './TarjetaJuego'
import FormularioJuego from './FormularioJuego'

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([])

  const cargarJuegos = () => {
    api
      .get('/juegos')
      .then(res => setJuegos(res.data))
      .catch(error => console.error('Error al cargar los juegos:', error))
  }

  useEffect(() => {
    cargarJuegos()
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Biblioteca de Juegos</h2>

      <FormularioJuego onGameAdded={cargarJuegos} />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '20px'
      }}>
        {juegos.length > 0 ? (
          juegos.map(juego => (
            <TarjetaJuego key={juego._id} juego={juego} onUpdate={cargarJuegos} />
          ))
        ) : (
          <p>No hay juegos registrados.</p>
        )}
      </div>
    </div>
  )
}

export default BibliotecaJuegos
