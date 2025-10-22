import { useEffect, useState } from "react";

function App() {
  const [games, setGames] = useState([]);
  const [title, setTitle] = useState("");

  async function fetchGames() {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
  }

  async function createGame(e) {
    e.preventDefault();
    if (!title) return;
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    if (res.ok) {
      setTitle("");
      fetchGames();
    } else {
      console.error("Error al crear juego");
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h1>GameTracker — Frontend</h1>

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
          <li key={g._id}>
            <strong>{g.title}</strong> — {g.platform || "Sin plataforma"} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
