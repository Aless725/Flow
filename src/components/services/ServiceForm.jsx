import React, { useState } from 'react';

export default function ServiceForm({ onAddService }) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !price || !duration) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        const numericPrice = parseFloat(price);
        const numericDuration = parseInt(duration, 10);

        if (numericPrice <= 0) {
            setError('El precio debe ser mayor a S/. 0.');
            return;
        }

        if (numericDuration <= 0) {
            setError('La duración debe ser mayor a 0 minutos.');
            return;
        }

        setError('');

        onAddService({
            id: Date.now(),
            name: name.trim(),
            price: numericPrice,
            duration: numericDuration,
        });

        setName('');
        setPrice('');
        setDuration('');
    };

    return (
        <div className="service-card">
            <h3>Registrar Nuevo Servicio</h3>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="service-form">
                <div className="form-group">
                    <label>Nombre del Servicio</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Formateo de laptop"
                    />
                </div>

                <div className="form-group">
                    <label>Precio (S/.)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ej. S/. 100"
                    />
                </div>

                <div className="form-group">
                    <label>Duración (min)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Ej. 45 min."
                    />
                </div>

                <div>
                    <button type="submit" className="submit-btn">
                        Guardar Servicio
                    </button>
                </div>
            </form>
        </div>
    );
}