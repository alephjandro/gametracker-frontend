import { useEffect, useState } from 'react'
import api from '../services/api'
import TarjetaJuego from './TarjetaJuego'
import FormularioJuego from './FormularioJuego'

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([])

  const cargarJuegos = async () => {
    try {
      const res = await api.get('/juegos')
      setJuegos(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error('Error al cargar juegos', err)
      setJuegos([])
    }
  }

  useEffect(() => {
    cargarJuegos()
  }, [])

  const eliminarJuego = async (id) => {
    try {
      await api.delete(`/juegos/${id}`)
      setJuegos(prev => prev.filter(j => j._id !== id)) 
    } catch (err) {
      console.error('Error al eliminar juego', err)
    }
  }

  const actualizarJuegoLocal = (updated) => {
    setJuegos(prev => prev.map(j => (j._id === updated._id ? updated : j)))
  }

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>Biblioteca de Juegos</h2>
      <FormularioJuego onGameAdded={cargarJuegos} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginTop: 20 }}>
        {juegos.length > 0 ? (
          juegos.map(j => (
            <TarjetaJuego
              key={j._id}
              juego={j}
              onDeleteById={eliminarJuego} 
              onLocalUpdate={actualizarJuegoLocal}
            />
          ))
        ) : (
          <p>No hay juegos registrados.</p>
        )}
      </div>
    </div>
  )
}
