import { useState } from 'react'
import { ReservasProvider } from './context/ReservasContext'
import GestionClientes from './Gestion-Clientes/GestionClientes'
import ServicesModule from './components/services/ServicesModule'
import FormularioReserva from './components/Reservas/FormularioReserva'
import ListaReservas from './components/Reservas/ListaReservas'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <ReservasProvider>
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
            <>
              <FormularioReserva />
              <ListaReservas />
            </>
          )}
        </main>

        <footer className="flow-footer">
          Flow · Sistema de gestión de servicios y reservas
        </footer>
      </div>
    </ReservasProvider>
  )
}

export default App