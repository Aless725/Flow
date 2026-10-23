import { useState } from 'react'
import { useReservas } from '../../context/ReservasContext'
import './Reservas.css'

export default function FormularioReserva() {
  const { agregarReserva } = useReservas()
  
  // Leemos los datos para los selectores
  const [clientes] = useState(() => JSON.parse(localStorage.getItem('flow_clientes')) || [])
  const [servicios] = useState(() => JSON.parse(localStorage.getItem('flow_services')) || [])
  
  const [formData, setFormData] = useState({
    cliente_id: '',
    servicio_id: '',
    fecha_hora: '',
  })
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setMensaje({ texto: '', tipo: '' }) // Limpiar mensaje al escribir
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.cliente_id || !formData.servicio_id || !formData.fecha_hora) {
      setMensaje({ texto: 'Por favor, complete todos los campos.', tipo: 'error' })
      return
    }

    const resultado = agregarReserva(formData)
    
    if (!resultado.ok) {
      setMensaje({ texto: resultado.error, tipo: 'error' })
      return
    }

    setMensaje({ texto: 'Reserva registrada con éxito.', tipo: 'exito' })
    setFormData({ cliente_id: '', servicio_id: '', fecha_hora: '' })
  }

  const sinDatos = clientes.length === 0 || servicios.length === 0

  return (
    <section className="reservas-card">
      <div className="reservas-card-titulo">
        <h3>Registrar Nueva Reserva</h3>
        <p>Selecciona un cliente, un servicio y la fecha de la cita.</p>
      </div>

      {sinDatos && (
        <div className="reservas-mensaje error">
          Asegúrate de tener al menos un <strong>cliente</strong> y un <strong>servicio</strong> registrados para poder agendar.
        </div>
      )}

      {mensaje.texto && (
        <div className={`reservas-mensaje ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="reservas-form">
        <div className="form-group">
          <label>Cliente</label>
          <select name="cliente_id" value={formData.cliente_id} onChange={handleChange} disabled={clientes.length === 0}>
            <option value="">Selecciona un cliente</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Servicio</label>
          <select name="servicio_id" value={formData.servicio_id} onChange={handleChange} disabled={servicios.length === 0}>
            <option value="">Selecciona un servicio</option>
            {servicios.map(s => (
              <option key={s.id} value={s.id}>{s.name} (S/. {s.price})</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fecha y Hora</label>
          <input
            type="datetime-local"
            name="fecha_hora"
            value={formData.fecha_hora}
            onChange={handleChange}
            disabled={sinDatos}
          />
        </div>

        <div className="form-action">
          <button type="submit" className="reservas-boton-principal" disabled={sinDatos}>
            Guardar Reserva
          </button>
        </div>
      </form>
    </section>
  )
}