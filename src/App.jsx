import React, { useState } from 'react';
import ServicesModule from './components/services/ServicesModule';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <div className='app-title'>
            <img className='title-img' src="/flow.png" alt="Flow" />
            <h1 className='title-name'>Flow</h1>
          </div>
          <span>Panel Principal</span>
        </div>

        <nav className="header-nav">
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
        {activeTab === 'clients' && (
          <div className="placeholder-module">
            <h2>Módulo de Clientes</h2>
            <p>Este espacio está reservado para el registro y gestión de clientes.</p>
          </div>
        )}

        {activeTab === 'services' && <ServicesModule />}

        {activeTab === 'reservations' && (
          <div className="placeholder-module">
            <h2>Módulo de Reservas</h2>
            <p>Este espacio está reservado para gestionar las citas utilizando el catálogo de servicios guardado.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;