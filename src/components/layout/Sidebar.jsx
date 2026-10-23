import './Sidebar.css'

function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, }) {

  return (
    <aside className={`flow-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <img className="flow-logo" src="/flow.png" alt="Flow Logo" />

        {!collapsed && <h1>Flow</h1>}

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-btn ${activeTab === 'clients' ? 'active' : ''}`}
          onClick={() => setActiveTab('clients')}
        >
          <span className="material-symbols-outlined">group</span>
          {!collapsed && <span className="nav-text">Clientes</span>}
        </button>

        <button
          className={`sidebar-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <span className="material-symbols-outlined">handyman</span>
          {!collapsed && <span className="nav-text">Servicios</span>}
        </button>

        <button
          className={`sidebar-btn ${activeTab === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveTab('reservations')}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          {!collapsed && <span className="nav-text">Reservas</span>}
        </button>
      </nav>
    </aside>
  )
}

export default Sidebar