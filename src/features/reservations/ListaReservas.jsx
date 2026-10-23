import { useState } from 'react'
import { useReservas } from './ReservasContext'
import './Reservas.css'

export default function ListaReservas() {
  const { reservas, cancelarReserva } = useReservas()

  // Leemos los datos para traducir los IDs a nombres
  const [clientes] = useState(() => JSON.parse(localStorage.getItem('flow_clientes')) || [])
  const [servicios] = useState(() => JSON.parse(localStorage.getItem('flow_services')) || [])

  const getNombreCliente = (id) => clientes.find(c => c.id === id)?.nombre || 'Cliente no encontrado'
  const getNombreServicio = (id) => servicios.find(s => s.id === id)?.name || 'Servicio no encontrado'

  return (
    <section className="reservas-card">
      <div className="reservas-card-titulo">
        <h3>Historial de Reservas</h3>
        <p>Consulta y gestiona el estado de las citas agendadas.</p>
      </div>

      {reservas.length === 0 ? (
        <div className="reservas-vacio">
          <strong>No hay reservas registradas</strong>
          <span>Las citas que agendes aparecerán en esta lista.</span>
        </div>
      ) : (
        <div className="reservas-tabla-contenedor">
          <table className="reservas-tabla">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td className="reserva-nombre">{getNombreCliente(reserva.cliente_id)}</td>
                  <td>{getNombreServicio(reserva.servicio_id)}</td>
                  <td>{new Date(reserva.fecha_hora).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                  <td>
                    <span className={`reserva-badge ${reserva.estado}`}>
                      {reserva.estado}
                    </span>
                  </td>
                  <td>
                    {reserva.estado === 'confirmada' && (
                      <button
                        className="reservas-boton-cancelar"
                        onClick={() => cancelarReserva(reserva.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}