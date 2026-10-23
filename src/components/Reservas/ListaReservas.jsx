import { useState } from 'react'
import { useReservas } from '../../context/ReservasContext'
import './Reservas.css'

const CLAVE_CLIENTES = 'flow_clientes'
const CLAVE_SERVICIOS = 'flow_servicios' // ← misma que arriba

function leerLista(clave) {
  try {
    const datos = localStorage.getItem(clave)
    const lista = datos ? JSON.parse(datos) : []
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

function nombreVisible(item, prefijo, id) {
  return item?.nombre || item?.titulo || item?.name || `${prefijo} #${id}`
}

function formatearFecha(iso) {
  if (!iso) return '—'
  const fecha = new Date(iso)
  if (Number.isNaN(fecha.getTime())) return iso
  return fecha.toLocaleString('es-PE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function ListaReservas() {
  const { reservas, cancelarReserva } = useReservas()
  const [clientes] = useState(() => leerLista(CLAVE_CLIENTES))
  const [servicios] = useState(() => leerLista(CLAVE_SERVICIOS))

  const clientesPorId = new Map(clientes.map((c) => [c.id, c]))
  const serviciosPorId = new Map(servicios.map((s) => [s.id, s]))

  // Orden cronológico
  const reservasOrdenadas = [...reservas].sort(
    (a, b) => new Date(a.fecha_hora) - new Date(b.fecha_hora),
  )

  return (
    <section className="reservas-panel">
      <div className="reservas-panel-titulo">
        <h2>Listado de reservas</h2>
        <p>Consulta y cancela las reservas agendadas.</p>
      </div>

      <div className="reservas-tabla-contenedor">
        <table className="reservas-tabla">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Fecha y hora</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reservasOrdenadas.length > 0 ? (
              reservasOrdenadas.map((reserva) => {
                const cliente = clientesPorId.get(reserva.cliente_id)
                const servicio = serviciosPorId.get(reserva.servicio_id)
                const confirmada = reserva.estado === 'confirmada'

                return (
                  <tr key={reserva.id}>
                    <td className="reservas-nombre">
                      {nombreVisible(cliente, 'Cliente', reserva.cliente_id)}
                    </td>
                    <td>
                      {nombreVisible(servicio, 'Servicio', reserva.servicio_id)}
                    </td>
                    <td>{formatearFecha(reserva.fecha_hora)}</td>
                    <td>
                      <span className={`reservas-estado ${reserva.estado}`}>
                        {confirmada ? 'Confirmada' : 'Cancelada'}
                      </span>
                    </td>
                    <td>
                      {confirmada ? (
                        <button
                          type="button"
                          className="reservas-boton-cancelar"
                          onClick={() => cancelarReserva(reserva.id)}
                        >
                          Cancelar
                        </button>
                      ) : (
                        <span className="reservas-sin-accion">—</span>
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={5} className="reservas-tabla-vacia">
                  <strong>Todavía no hay reservas registradas</strong>
                  <span>
                    Las reservas que agendes aparecerán aquí en orden
                    cronológico.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="reservas-pie-tabla">
        Mostrando {reservasOrdenadas.length} reserva
        {reservasOrdenadas.length === 1 ? '' : 's'}
      </p>
    </section>
  )
}

export default ListaReservas