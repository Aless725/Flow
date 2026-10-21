import { ReservasProvider } from './context/ReservasContext';
import FormularioReserva from './components/Reservas/FormularioReserva';
import ListaReservas from './components/Reservas/ListaReservas';
import './App.css';

function App() {
  return (
    <ReservasProvider>
      <div className="contenedor-principal">
        <h1 className="titulo-principal">Sistema de Gestión - Módulo de Reservas</h1>
        <FormularioReserva />
        <ListaReservas />
      </div>
    </ReservasProvider>
  );
}

export default App;