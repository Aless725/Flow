import { useState } from 'react'

export default function ServiceForm({ onAddService }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !price || !duration) {
      setError('Todos los campos son obligatorios.')
      return
    }

    const numericPrice = parseFloat(price)
    const numericDuration = parseInt(duration, 10)

    if (numericPrice <= 0) {
      setError('El precio debe ser mayor a S/. 0.')
      return
    }

    if (numericDuration <= 0) {
      setError('La duración debe ser mayor a 0 minutos.')
      return
    }

    setError('')

    onAddService({
      id: crypto.randomUUID(),
      name: name.trim(),
      price: numericPrice,
      duration: numericDuration,
    })

    setName('')
    setPrice('')
    setDuration('')
  }

  const handleNumberChange = (setValue) => (e) => {
    const val = e.target.value
    if (val === '' || parseFloat(val) >= 0) {
      setValue(val)
    }
  }

  return (
    <section className="services-card">
      <div className="services-card-titulo">
        <h3>Registrar Nuevo Servicio</h3>
      </div>

      {error && <div className="services-mensaje error">{error}</div>}

      <form onSubmit={handleSubmit} className="services-form">
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
            step="0.01"
            min="0.01"
            value={price}
            onChange={handleNumberChange(setPrice)}
            placeholder="Ej. 100"
          />
        </div>

        <div className="form-group">
          <label>Duración (min)</label>
          <input
            type="number"
            min="1"
            value={duration}
            onChange={handleNumberChange(setDuration)}
            placeholder="Ej. 45"
          />
        </div>

        <div className="form-action">
          <button type="submit" className="services-boton-principal">
            Guardar Servicio
          </button>
        </div>
      </form>
    </section>
  )
}