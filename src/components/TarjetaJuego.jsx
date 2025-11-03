function TarjetaJuego({ juego }) {
  if (!juego) {
    return null
  }

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '10px',
      margin: '10px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <img
        src={juego.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen'}
        alt={juego.titulo || 'Juego sin título'}
        style={{ width: '100%', borderRadius: '8px' }}
      />
      <h3>{juego.titulo}</h3>
      <p>{juego.genero}</p>
      <p>{juego.plataforma}</p>
      <p>{juego.añolanzamiento}</p>
    </div>
  )
}

export default TarjetaJuego
