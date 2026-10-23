import { useState } from 'react'
import { ReservasProvider } from './features/reservations/ReservasContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import GestionClientes from './features/clients/GestionClientes'
import ServicesModule from './features/services/ServicesModule'
import FormularioReserva from './features/reservations/FormularioReserva'
import ListaReservas from './features/reservations/ListaReservas'
import './styles/App.css'

function App() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <ReservasProvider >
      <div className="app-container">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

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