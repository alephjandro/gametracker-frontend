import api from '../services/api'

function TarjetaJuego({ juego, onDelete, onToggle }) {
  if (!juego) return null

  const handleDelete = async () => {
    try {
      await api.delete(`/juegos/${juego._id}`)
      if (onDelete) onDelete()
    } catch (error) {
      console.error('Error al eliminar el juego:', error)
    }
  }

  const handleToggle = async () => {
    try {
      await api.put(`/juegos/${juego._id}`, { completado: !juego.completado })
      if (onToggle) onToggle()
    } catch (error) {
      console.error('Error al actualizar el estado del juego:', error)
    }
  }

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '10px',
        margin: '10px',
        width: '230px',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        backgroundColor: juego.completado ? '#d1ffd6' : '#fff'
      }}
    >
      <div>
        <img
          src={juego.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen'}
          alt={juego.titulo}
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <h3>{juego.titulo}</h3>
        <p>{juego.genero}</p>
        <p>{juego.plataforma}</p>
        <p>{juego.añolanzamiento}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
        <button
          onClick={handleToggle}
          style={{
            backgroundColor: juego.completado ? '#ffcc00' : '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          {juego.completado ? 'Marcar como no completado' : 'Marcar como completado'}
        </button>

        <button
          onClick={handleDelete}
          style={{
            backgroundColor: '#ff5c5c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default TarjetaJuego
