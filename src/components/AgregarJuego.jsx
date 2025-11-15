import FormularioJuego from './FormularioJuego'

export default function AgregarJuego({ onGameAdded }) {
  return (
    <div className="agregar-juego-section">
      <h2 className="seccion-titulo">Agregar Nuevo Juego</h2>
      <div className="form-container">
        <FormularioJuego onGameAdded={onGameAdded} />
      </div>
    </div>
  )
}

