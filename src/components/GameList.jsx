function GameList({
  games,
  onEdit,
  onDelete,
  editId,
  editTitle,
  setEditTitle,
  updateGame,
  cancelEdit,
}) {
  return (
    <ul className="game-list">
      {games.map((g) => (
        <li key={g._id} className="game-card">
          {editId === g._id ? (
            <form onSubmit={updateGame} className="edit-form">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button type="submit">Guardar</button>
              <button type="button" onClick={cancelEdit}>
                Cancelar
              </button>
            </form>
          ) : (
            <>
              {}
              {g.coverImage && (
                <img
                  src={g.coverImage}
                  alt={g.title}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                    border: "2px solid #1f1f1f",
                  }}
                />
              )}

              {}
              <strong style={{ display: "block", marginBottom: "6px" }}>
                {g.title}
              </strong>

              {}
              <div className="actions">
                <button onClick={() => onEdit(g._id, g.title)}>Editar</button>
                <button onClick={() => onDelete(g._id)}>Eliminar</button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default GameList;
