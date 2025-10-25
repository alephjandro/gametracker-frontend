
import { useState, useEffect } from "react";
import GameForm from "./components/GameForm";
import GameList from "./components/GameList";
import "./App.css";

function App() {
  const [games, setGames] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  async function fetchGames() {
    const res = await fetch("/api/games");
    const data = await res.json();
    setGames(data);
  }

  async function createGame(title) {
    const res = await fetch("/api/games", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) fetchGames();
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
      body: JSON.stringify({ title: editTitle }),
    });
    if (res.ok) {
      setEditId(null);
      setEditTitle("");
      fetchGames();
    }
  }

  function handleEdit(id, title) {
    setEditId(id);
    setEditTitle(title);
  }

  function cancelEdit() {
    setEditId(null);
    setEditTitle("");
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">GameTracker</h1>
      <GameForm onCreate={createGame} />
      <GameList
        games={games}
        onEdit={handleEdit}
        onDelete={deleteGame}
        editId={editId}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        updateGame={updateGame}
        cancelEdit={cancelEdit}
      />
    </div>
  );
}

export default App;
