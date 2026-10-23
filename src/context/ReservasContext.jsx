import { createContext, useState, useContext } from 'react';

const ReservasContext = createContext();

export const useReservas = () => useContext(ReservasContext);

export const ReservasProvider = ({ children }) => {
  const [reservas, setReservas] = useState([]);

  const agregarReserva = (nuevaReserva) => {
    const hayConflicto = reservas.some(
      (r) =>
        r.servicio_id === nuevaReserva.servicio_id &&
        r.fecha_hora === nuevaReserva.fecha_hora &&
        r.estado !== 'cancelada'
    );

    if (hayConflicto) {
      alert('Error: Ya existe una reserva activa para este servicio en esta fecha y hora.');
      return false;
    }

    const reservaConId = {
      ...nuevaReserva,
      id: Date.now(), 
      estado: 'confirmada',
    };

    setReservas([...reservas, reservaConId]);
    alert('Reserva registrada con éxito');
    return true;
  };

  const cancelarReserva = (id) => {
    setReservas(
      reservas.map((r) =>
        r.id === id ? { ...r, estado: 'cancelada' } : r
      )
    );
  };

  return (
    <ReservasContext.Provider value={{ reservas, agregarReserva, cancelarReserva }}>
      {children}
    </ReservasContext.Provider>
  );
};
