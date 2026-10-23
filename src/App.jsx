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

import { useState } from 'react'
import GestionClientes from './Gestion-Clientes/GestionClientes'
import ServicesModule from './components/services/ServicesModule'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className="app-title">
            <img className="title-img" src="/flow.png" alt="Flow" />
            <h1 className="title-name">Flow</h1>
          </div>
          <span>Panel Principal</span>
        </div>

        <nav className="header-nav" aria-label="Navegación principal">
          <button
            className={`nav-btn ${activeTab === 'clients' ? 'active' : ''}`}
            onClick={() => setActiveTab('clients')}
          >
            Clientes
          </button>

          <button
            className={`nav-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            Servicios
          </button>

          <button
            className={`nav-btn ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            Reservas
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'clients' && <GestionClientes />}

        {activeTab === 'services' && <ServicesModule />}

        {activeTab === 'reservations' && (
          <div className="placeholder-module">
            <h2>Módulo de Reservas</h2>
            <p>
              Este espacio está reservado para gestionar las citas
              utilizando el catálogo de servicios guardado.
            </p>
          </div>
        )}
      </main>

      <footer className="flow-footer">
        Flow · Sistema de gestión de servicios y reservas
      </footer>
    </div>
  )
}

export default App
