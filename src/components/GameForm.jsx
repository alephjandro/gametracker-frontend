import { useState } from "react";

function GameForm({ onCreate }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onCreate(title);
    setTitle("");
  }

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del nuevo juego..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default GameForm;