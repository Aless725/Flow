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
    <ReservasProvider>
      <div className="app-container">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
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
    </ReservasProvider>
  )
}

export default App