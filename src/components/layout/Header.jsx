import './Header.css'

function Header({ activeTab, setActiveTab }) {
  return (
    <header className="flow-header">
      <div className="flow-header-brand">
        <img className="flow-logo" src="/flow.png" alt="Flow Logo" />
        <div className="flow-brand-text">
          <h1>Flow</h1>
          <span>Panel Principal</span>
        </div>
      </div>

      <nav className="flow-nav" aria-label="Navegación principal">
        <button
          className={`flow-nav-btn ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          Clientes
        </button>

        <button
          className={`flow-nav-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Servicios
        </button>

        <button
          className={`flow-nav-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          Reservas
        </button>
      </nav>
    </header>
  )
}

export default Header