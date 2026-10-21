import { useState } from 'react';
import { useReservas } from '../../context/ReservasContext';

const FormularioReserva = () => {
  const { agregarReserva } = useReservas();
  const [formData, setFormData] = useState({
    cliente_id: '',
    servicio_id: '',
    fecha_hora: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.cliente_id || !formData.servicio_id || !formData.fecha_hora) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const exito = agregarReserva(formData);
    if (exito) {
      setFormData({ cliente_id: '', servicio_id: '', fecha_hora: '' });
    }
  };

  return (
    <div className="formulario-container">
      <h3>Registrar Nueva Reserva</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="cliente_id"
          placeholder="ID del Cliente"
          value={formData.cliente_id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="servicio_id"
          placeholder="ID del Servicio"
          value={formData.servicio_id}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="fecha_hora"
          value={formData.fecha_hora}
          onChange={handleChange}
        />
        <button type="submit">
          Guardar Reserva
        </button>
      </form>
    </div>
  );
};

export default FormularioReserva;