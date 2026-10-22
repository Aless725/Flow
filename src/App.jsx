
import GestionClientes from './Gestion-Clientes/GestionClientes'
import './App.css'

function App() {
  return (
    <div className="flow-app">
      <header className="flow-navbar">
        <a className="flow-logo" href="#inicio" aria-label="Flow, inicio">
          <span className="flow-logo-icon">F</span>
          <span>Flow</span>
        </a>

        <nav aria-label="Navegación principal">
          <a className="nav-activo" href="#clientes">
            Clientes
          </a>
          <a href="#servicios">Servicios</a>
          <a href="#reservas">Reservas</a>
        </nav>
      </header>

      <div id="inicio" />

      <div id="clientes">
        <GestionClientes />
      </div>

      <footer className="flow-footer">
        Flow · Sistema de gestión de servicios y reservas
      </footer>
    </div>
  )
}

export default App

