import { useState } from "react";

function GameForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // no crear si el título está vacío
    if (!title.trim()) return;

    // envía ambos datos al componente padre (App)
    await onCreate({ title, coverImage });

    // limpia los campos después de crear
    setTitle("");
    setCoverImage("");
  }

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título del nuevo juego..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="URL de la imagen..."
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

export default GameForm;
