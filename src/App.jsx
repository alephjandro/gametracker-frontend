import BibliotecaJuegos from './components/BibliotecaJuegos'
import TarjetaJuego from './components/TarjetaJuego'
import FormularioJuego from './components/FormularioJuego'
import ListaResenas from './components/ListaResenas'
import FormularioResena from './components/FormularioResena'
import EstadisticasPersonales from './components/EstadisticasPersonales'


function App() {
  return (
    <div>
      <h1>GameTracker</h1>
      <BibliotecaJuegos/>
      <TarjetaJuego/>
      <FormularioJuego/>
      <ListaResenas/>
      <FormularioResena/>
      <EstadisticasPersonales/>
  </div>
)
}

export default App