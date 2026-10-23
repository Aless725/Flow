import { createContext, useState, useEffect, useContext } from 'react'

const ReservasContext = createContext()

export const useReservas = () => useContext(ReservasContext)

export const ReservasProvider = ({ children }) => {
  const [reservas, setReservas] = useState(() => {
    const saved = localStorage.getItem('flow_reservas')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Error al cargar reservas', error)
      }
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('flow_reservas', JSON.stringify(reservas))
  }, [reservas])

  const agregarReserva = (nuevaReserva) => {
    const hayConflicto = reservas.some(
      (r) =>
        r.servicio_id === nuevaReserva.servicio_id &&
        r.fecha_hora === nuevaReserva.fecha_hora &&
        r.estado !== 'cancelada'
    )

    if (hayConflicto) {
      return { ok: false, error: 'Ya existe una reserva activa para este servicio en esta fecha y hora.' }
    }

    const reservaConId = {
      ...nuevaReserva,
      id: crypto.randomUUID(), 
      estado: 'confirmada',
    }

    setReservas((prev) => [...prev, reservaConId])
    return { ok: true }
  }

  const cancelarReserva = (id) => {
    setReservas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, estado: 'cancelada' } : r
      )
    )
  }

  return (
    <ReservasContext.Provider value={{ reservas, agregarReserva, cancelarReserva }}>
      {children}
    </ReservasContext.Provider>
  )
}