import {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react'

/* ============================================================
   FLOW · Contexto de Reservas
   - Persiste en localStorage (misma estrategia que Clientes)
   - Sin alert(): devuelve { ok, error, reserva } para que el UI
     renderice el mensaje con la identidad Flow.
   - Guarda referencias (cliente_id, servicio_id) para que en el
     futuro los módulos puedan cruzarse sin acoplarse.
   ============================================================ */

const CLAVE_ALMACENAMIENTO = 'flow_reservas'

const ReservasContext = createContext()

/** Esquema de una reserva (referencia):
 *  {
 *    id: string (UUID),
 *    cliente_id: string,
 *    servicio_id: string,
 *    fecha_hora: string (ISO),
 *    notas?: string,
 *    estado: 'confirmada' | 'cancelada',
 *    creada_en: string (ISO),
 *  }
 */

function obtenerReservas() {
  try {
    const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO)
    const reservas = datos ? JSON.parse(datos) : []

    return Array.isArray(reservas) ? reservas : []
  } catch {
    return []
  }
}

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState(obtenerReservas)

  useEffect(() => {
    try {
      localStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        JSON.stringify(reservas),
      )
    } catch {
      // La app sigue funcionando aunque el almacenamiento falle.
    }
  }, [reservas])

  // --- Helpers internos -------------------------------------

  function hayConflicto({ servicio_id, fecha_hora }, excluirId = null) {
    return reservas.some(
      (r) =>
        r.servicio_id === servicio_id &&
        r.fecha_hora === fecha_hora &&
        r.estado !== 'cancelada' &&
        r.id !== excluirId,
    )
  }

  function validar(reserva, excluirId = null) {
    const { cliente_id, servicio_id, fecha_hora } = reserva

    if (!cliente_id || !servicio_id || !fecha_hora) {
      return 'Todos los campos son obligatorios.'
    }

    if (hayConflicto({ servicio_id, fecha_hora }, excluirId)) {
      return 'Ya existe una reserva activa para este servicio en esta fecha y hora.'
    }

    return null
  }

  // --- API pública ------------------------------------------

  function agregarReserva(nuevaReserva) {
    const error = validar(nuevaReserva)

    if (error) {
      return { ok: false, error }
    }

    const reserva = {
      ...nuevaReserva,
      id: crypto.randomUUID(),
      estado: 'confirmada',
      creada_en: new Date().toISOString(),
    }

    setReservas((prev) => [...prev, reserva])

    return { ok: true, reserva }
  }

  function actualizarReserva(id, cambios) {
    const actual = reservas.find((r) => r.id === id)

    if (!actual) {
      return { ok: false, error: 'Reserva no encontrada.' }
    }

    const fusionada = { ...actual, ...cambios }
    const error = validar(fusionada, id)

    if (error) {
      return { ok: false, error }
    }

    setReservas((prev) =>
      prev.map((r) => (r.id === id ? fusionada : r)),
    )

    return { ok: true, reserva: fusionada }
  }

  function cancelarReserva(id) {
    setReservas((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, estado: 'cancelada' } : r,
      ),
    )
  }

  function eliminarReserva(id) {
    setReservas((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <ReservasContext.Provider
      value={{
        reservas,
        agregarReserva,
        actualizarReserva,
        cancelarReserva,
        eliminarReserva,
      }}
    >
      {children}
    </ReservasContext.Provider>
  )
}

export function useReservas() {
  const ctx = useContext(ReservasContext)

  if (!ctx) {
    throw new Error(
      'useReservas debe usarse dentro de <ReservasProvider>',
    )
  }

  return ctx
}