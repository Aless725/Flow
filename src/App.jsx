import { useState } from 'react'
import { ReservasProvider } from './features/reservations/ReservasContext'
import Sidebar from './components/layout/Sidebar' // <-- Nuevo componente
import Footer from './components/layout/Footer'
import GestionClientes from './features/clients/GestionClientes'
import ServicesModule from './features/services/ServicesModule'
import FormularioReserva from './features/reservations/FormularioReserva'
import ListaReservas from './features/reservations/ListaReservas'
import './styles/App.css'

function App() {
const [activeTab, setActiveTab] = useState('clients')
const [collapsed, setCollapsed] = useState(false)

  return (
    <ReservasProvider>
      <div className="app-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={collapsed} setCollapsed={setCollapsed} />
        
        <div className={`app-content-wrapper ${collapsed ? 'collapsed' : ''}`}>
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
    </ReservasProvider>
  )
}

export default App