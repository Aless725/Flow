import { ReservasProvider } from './context/ReservasContext';
import FormularioReserva from './components/Reservas/FormularioReserva';
import ListaReservas from './components/Reservas/ListaReservas';
// (Aquí podrían estar los imports de tu compañero)

function App() {
  return (
    // (Pon el Provider de tu compañero si lo tiene, o deja el tuyo)
    <ReservasProvider>
      <div className="contenedor-principal">
        <h1 className="titulo-principal">Sistema de Gestión</h1>
        {/* Componentes de tu compañero si los hay */}
        
        <FormularioReserva />
        <ListaReservas />
      </div>
    </ReservasProvider>
  );
}

export default App;