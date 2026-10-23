import { useState } from 'react'
import { ReservasProvider } from './context/ReservasContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import GestionClientes from './Gestion-Clientes/GestionClientes'
import ServicesModule from './components/services/ServicesModule'
import FormularioReserva from './components/Reservas/FormularioReserva'
import ListaReservas from './components/Reservas/ListaReservas'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <ReservasProvider >
      <div className="app-container">
        <header className="app-header">
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
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

        <Footer />
      </div>
    </ReservasProvider >
  )
}

export default App