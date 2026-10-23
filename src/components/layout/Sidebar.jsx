import './Sidebar.css'

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="flow-sidebar">
      <div className="sidebar-brand">
        <img className="flow-logo" src="/flow.png" alt="Flow Logo" />
        <h1>Flow</h1>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-btn ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          <span className="material-symbols-outlined">group</span>
          Clientes
        </button>

        <button
          className={`sidebar-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <span className="material-symbols-outlined">handyman</span>
          Servicios
        </button>

        <button
          className={`sidebar-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          Reservas
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar