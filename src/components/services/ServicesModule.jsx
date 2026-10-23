import React, { useState, useEffect } from 'react';
import ServiceForm from './ServiceForm';
import ServiceList from './ServiceList';
import './ServicesModule.css';

export default function ServicesModule() {
    const [services, setServices] = useState(() => {
        const savedServices = localStorage.getItem('flow_services');
        if (savedServices) {
            try {
                return JSON.parse(savedServices);
            } catch (error) {
                console.error("Error al cargar los servicios de localStorage", error);
            }
        }
        return [
        ];
    });

    useEffect(() => {
        localStorage.setItem('flow_services', JSON.stringify(services));
    }, [services]);

    const handleAddService = (newService) => {
        setServices([...services, newService]);
    };

    return (
        <div className="services-container">
            <div className="services-header">
                <h2>Módulo de Servicios</h2>
                <p>Gestión de precios, tiempos y catálogo general de servicios (Persistente).</p>
            </div>

            <ServiceForm onAddService={handleAddService} />
            <ServiceList services={services} />
        </div>
    );
}