import { useEffect, useState } from 'react'
import ListaResenas from './ListaResenas'
import FormularioResena from './FormularioResena'

export default function ModalJuego({ juego, resenas, onClose, onToggleCompletado, onDelete, onResenaAgregada, onResenaEditada, onResenaEliminada, onJuegoEditado }) {
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añolanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false
  })

  useEffect(() => {
    if (juego) {
      setForm({
        titulo: juego.titulo || '',
        genero: juego.genero || '',
        plataforma: juego.plataforma || '',
        añolanzamiento: juego.añolanzamiento || '',
        desarrollador: juego.desarrollador || '',
        imagenPortada: juego.imagenPortada || '',
        descripcion: juego.descripcion || '',
        completado: juego.completado || false
      })
    }
  }, [juego])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (editando) {
          setEditando(false)
        } else {
          onClose()
        }
      }
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, editando])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (onJuegoEditado && juego._id) {
      await onJuegoEditado(juego._id, form)
      setEditando(false)
    }
  }

  if (!juego) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="modal-header">
          <img
            src={editando ? form.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen' : juego.imagenPortada || 'https://via.placeholder.com/200x250?text=Sin+Imagen'}
            alt={editando ? form.titulo : juego.titulo}
            className="modal-juego-img"
          />
          <div className="modal-juego-info">
            {editando ? (
              <form onSubmit={handleSubmit} className="modal-edit-form">
                <div className="campo">
                  <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <input name="añolanzamiento" type="number" placeholder="Año de lanzamiento" value={form.añolanzamiento} onChange={handleChange} required />
                </div>
                <div className="campo">
                  <input name="desarrollador" placeholder="Desarrollador" value={form.desarrollador} onChange={handleChange} />
                </div>
                <div className="campo">
                  <input name="imagenPortada" placeholder="URL de la imagen" value={form.imagenPortada} onChange={handleChange} />
                </div>
                <div className="campo">
                  <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
                </div>
                <label className="checkbox">
                  <input name="completado" type="checkbox" checked={form.completado} onChange={handleChange} />
                  Completado
                </label>
                <div className="modal-juego-actions">
                  <button type="submit" className="primary">Guardar</button>
                  <button type="button" onClick={() => setEditando(false)}>Cancelar</button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="modal-juego-titulo">{juego.titulo}</h2>
                <div className="modal-juego-meta">
                  <span>{juego.genero}</span>
                  <span>•</span>
                  <span>{juego.plataforma}</span>
                  <span>•</span>
                  <span>{juego.añolanzamiento}</span>
                </div>
                {juego.desarrollador && (
                  <p className="modal-juego-desarrollador">Desarrollador: {juego.desarrollador}</p>
                )}
                {juego.descripcion && (
                  <p className="modal-juego-descripcion">{juego.descripcion}</p>
                )}
                <div className="modal-juego-actions">
                  <button onClick={() => setEditando(true)}>Editar</button>
                  <button onClick={onToggleCompletado} className={juego.completado ? 'primary' : ''}>
                    {juego.completado ? '✓ Completado' : 'Marcar como completado'}
                  </button>
                  <button onClick={onDelete} className="delete-btn">
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="modal-resenas">
          <ListaResenas
            resenas={resenas}
            onDelete={onResenaEliminada}
            onEdit={onResenaEditada}
          />
          <FormularioResena
            juegoId={juego._id}
            onResenaAgregada={onResenaAgregada}
          />
        </div>
      </div>
    </div>
  )
}

