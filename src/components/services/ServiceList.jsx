import React from 'react';

export default function ServiceList({ services }) {
    return (
        <div className="service-card">
            <h3>Catálogo de Servicios</h3>

            {services.length === 0 ? (
                <div className="empty-state">
                    <p style={{ margin: 0 }}>No hay servicios registrados actualmente.</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="service-table">
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
                                    <td style={{ color: '#1e293b', fontWeight: '500' }}>{service.name}</td>
                                    <td style={{ color: '#059669', fontWeight: '600' }}>S/. {service.price.toFixed(2)}</td>
                                    <td>
                                        <span className="duration-badge">
                                            {service.duration} min.
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}