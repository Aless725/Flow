import { useState } from 'react'
import { ReservasProvider } from './features/reservations/ReservasContext'
import Sidebar from './components/layout/Sidebar'
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
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="app-content-wrapper">
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
          <Footer />
        </div>
      </div>
    </ReservasProvider >
  )
}

export default App