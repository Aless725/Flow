export default function ServiceList({ services }) {
  return (
    <section className="services-card">
      <div className="services-card-titulo">
        <h3>Catálogo de Servicios</h3>
      </div>

      {services.length === 0 ? (
        <div className="services-vacio">
          <strong>No hay servicios registrados</strong>
          <span>Los servicios que agregues aparecerán en esta lista.</span>
        </div>
      ) : (
        <div className="services-tabla-contenedor">
          <table className="services-tabla">
            <thead>
              <tr>
                <th>Servicio</th>
                <th>Precio</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td className="service-nombre">{service.name}</td>
                  <td className="service-precio">
                    S/. {service.price.toFixed(2)}
                  </td>
                  <td>
                    <span className="service-badge">
                      {service.duration} min.
                    </span>
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