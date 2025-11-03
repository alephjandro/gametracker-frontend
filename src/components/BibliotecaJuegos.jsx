import { useEffect, useState } from 'react'
import api from '../services/api'
import TarjetaJuego from './TarjetaJuego'
import FormularioJuego from './FormularioJuego'

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([])

  const cargarJuegos = () => {
    api.get('/juegos')
      .then(res => setJuegos(res.data))
      .catch(() => console.error('Error al conectar con la API'))
  }

  useEffect(() => {
    cargarJuegos()
  }, [])

  return (
    <div>
      <h2>Biblioteca de Juegos</h2>
      <FormularioJuego onGameAdded={cargarJuegos} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {juegos.length > 0 ? (
          juegos.map(j => <TarjetaJuego key={j._id} juego={j} />)
        ) : (
          <p>No hay juegos registrados.</p>
        )}
      </div>
    </div>
  )
}

export default BibliotecaJuegos
