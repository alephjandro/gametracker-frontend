import { useEffect, useState } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  async function fetchGames() {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
  }

  async function createGame(e) {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (res.ok) {
      setTitle("");
      fetchGames();
    }
  }

  async function deleteGame(id) {
    if (!confirm("¿Seguro que deseas eliminar este juego?")) return;
    const res = await fetch(`/api/games/${id}`, { method: "DELETE" });
    if (res.ok) fetchGames();
  }

  async function updateGame(e) {
    e.preventDefault();
    const res = await fetch(`/api/games/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editTitle })
    });
    if (res.ok) {
      setEditId(null);
      setEditTitle("");
      fetchGames();
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>🎮 GameTracker</h1>

      <form onSubmit={createGame} style={{ marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título del nuevo juego"
        />
        <button type="submit" style={{ marginLeft: 8 }}>Agregar</button>
      </form>

      <ul>
        {games.map((g) => (
          <li key={g._id} style={{ marginBottom: 8 }}>
            {editId === g._id ? (
              <form onSubmit={updateGame} style={{ display: "inline" }}>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Nuevo título"
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setEditId(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <strong>{g.title}</strong>{" "}
                <button onClick={() => { setEditId(g._id); setEditTitle(g.title); }}>Editar</button>
                <button onClick={() => deleteGame(g._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
