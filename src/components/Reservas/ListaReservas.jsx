import { useReservas } from '../../context/ReservasContext';

const ListaReservas = () => {
  const { reservas, cancelarReserva } = useReservas();

  if (reservas.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No hay reservas registradas todavía.</p>;
  }

  return (
    <div className="tabla-container">
      <h3>Listado de Reservas</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Servicio</th>
            <th>Fecha/Hora</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.id}</td>
              <td>{reserva.cliente_id}</td>
              <td>{reserva.servicio_id}</td>
              <td>{new Date(reserva.fecha_hora).toLocaleString()}</td>
              <td>
                <span className={reserva.estado === 'confirmada' ? 'estado-confirmada' : 'estado-cancelada'}>
                  {reserva.estado.toUpperCase()}
                </span>
              </td>
              <td>
                {reserva.estado === 'confirmada' && (
                  <button
                    className="btn-cancelar"
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
  );
};

export default ListaReservas;