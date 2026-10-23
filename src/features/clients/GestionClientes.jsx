import { useEffect, useState } from 'react'
import './GestionClientes.css'

const CLAVE_ALMACENAMIENTO = 'flow_clientes'

const formularioInicial = {
  nombre: '',
  telefono: '',
  correo: '',
}

function obtenerClientes() {
  try {
    const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO)
    const clientes = datos ? JSON.parse(datos) : []

    return Array.isArray(clientes) ? clientes : []
  } catch {
    return []
  }
}

function GestionClientes() {
  const [clientes, setClientes] = useState(obtenerClientes)
  const [formulario, setFormulario] = useState(formularioInicial)
  const [clienteEditando, setClienteEditando] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        JSON.stringify(clientes),
      )
    } catch {
      // La aplicación sigue funcionando aunque el almacenamiento falle.
    }
  }, [clientes])

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  function mostrarMensaje(texto, tipo = 'error') {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  function limpiarFormulario() {
    setFormulario({ ...formularioInicial })
    setClienteEditando(null)
  }

  function guardarCliente(evento) {
    evento.preventDefault()
    setMensaje('')

    const nombre = formulario.nombre.trim()
    const telefono = formulario.telefono.trim()
    const correo = formulario.correo.trim().toLowerCase()

    if (!nombre || !telefono || !correo) {
      mostrarMensaje('Todos los campos son obligatorios.')
      return
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+$/.test(nombre)) {
      mostrarMensaje('Ingresa un nombre válido.')
      return
    }

    if (!/^\d{9}$/.test(telefono)) {
      mostrarMensaje('El teléfono debe tener exactamente 9 dígitos.')
      return
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|pe|edu|gob|co|info)$/.test(correo)) {
      mostrarMensaje('Ingresa un correo electrónico válida (ejem: .com, .pe).')
     return
    }

    if (/@gm[a-z]l?\.com$/.test(correo) && !correo.endsWith('@gmail.com')) {
      mostrarMensaje('Correo inválido, te comiste una letra. Ejem: @gmail.com');
      return;
    }

    if (correo.includes('@outloo.com') || correo.includes('@hotmai.com')) {
      mostrarMensaje('  Correo inválido, te comiste una letra. Ejem: @outlook.com o @hotmail.com');
      return;
    }

    const correoDuplicado = clientes.some(
      (cliente) =>
        cliente.correo.toLowerCase() === correo &&
        cliente.id !== clienteEditando,
    )

    if (correoDuplicado) {
      mostrarMensaje(
        'Ya existe un cliente con ese correo electrónico.',
      )
      return
    }

    if (clienteEditando !== null) {
      setClientes((anteriores) =>
        anteriores.map((cliente) =>
          cliente.id === clienteEditando
            ? { ...cliente, nombre, telefono, correo }
            : cliente,
        ),
      )

      mostrarMensaje('Cliente actualizado correctamente.', 'exito')
    } else {
      const nuevoCliente = {
        id: crypto.randomUUID(),
        nombre,
        telefono,
        correo,
      }

      setClientes((anteriores) => [...anteriores, nuevoCliente])

      mostrarMensaje('Cliente registrado correctamente.', 'exito')
    }

    limpiarFormulario()
  }

  function prepararEdicion(cliente) {
    setFormulario({
      nombre: cliente.nombre,
      telefono: cliente.telefono,
      correo: cliente.correo,
    })

    setClienteEditando(cliente.id)
    setMensaje('')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelarEdicion() {
    limpiarFormulario()
    setMensaje('')
  }

  const termino = busqueda.trim().toLowerCase()

  const clientesFiltrados = clientes.filter((cliente) =>
    [cliente.nombre, cliente.telefono, cliente.correo].some((dato) =>
      dato.toLowerCase().includes(termino),
    ),
  )

  return (
    <main className="gestion-clientes">
      <header className="gc-encabezado">
        <div className="gc-encabezado-contenido">
          <h1>Gestión de clientes</h1>

          <p>
            Registra, consulta y actualiza la información de tus clientes.
          </p>

          <div className="gc-linea-decorativa" />
        </div>
      </header>

      <section className="gc-panel">
        <div className="gc-panel-titulo gc-titulo-centrado">
          <h2>
            {clienteEditando !== null
              ? 'Modificar cliente'
              : 'Registrar clientes'}
          </h2>

          <p>
            {clienteEditando !== null
              ? 'Actualiza los datos del cliente seleccionado.'
              : 'Completa los siguientes campos para registrar un cliente.'}
          </p>
        </div>

        <form onSubmit={guardarCliente} noValidate>
          <div className="gc-formulario">
            <label>
              Nombres completos
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                placeholder="Ej. Leslie Cabello"
                maxLength={100}
                autoComplete="name"
              />
            </label>

            <label>
              Teléfono
              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                onChange={manejarCambio}
                placeholder="Ej. 987654321"
                maxLength={9}
                inputMode="numeric"
                autoComplete="tel"
              />
            </label>

            <label className="gc-campo-correo">
              Correo electrónico
              <input
                type="email"
                name="correo"
                value={formulario.correo}
                onChange={manejarCambio}
                placeholder="Ej. leslie@gmail.com"
                maxLength={150}
                autoComplete="email"
              />
            </label>
          </div>

          {mensaje && (
            <div
              className={`gc-mensaje ${tipoMensaje}`}
              role="status"
              aria-live="polite"
            >
              {mensaje}
            </div>
          )}

          <div className="gc-acciones">
            <button type="submit" className="gc-boton-principal">
              {clienteEditando !== null
                ? 'Guardar cambios'
                : 'Registrar'}
            </button>

            {(clienteEditando !== null ||
              formulario.nombre ||
              formulario.telefono ||
              formulario.correo) && (
              <button
                type="button"
                className="gc-boton-secundario"
                onClick={cancelarEdicion}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="gc-panel">
        <div className="gc-listado-encabezado">
          <div className="gc-panel-titulo">
            <h2>Listado de clientes</h2>
            <p>Consulta y modifica los clientes registrados.</p>
          </div>

          <div className="gc-busqueda-contenedor">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              className="gc-busqueda"
              placeholder="Buscar cliente..."
              aria-label="Buscar clientes"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
          </div>
        </div>

        <div className="gc-tabla-contenedor">
          <table className="gc-tabla">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Teléfono</th>
                <th>Correo electrónico</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((cliente) => (
                  <tr key={cliente.id}>
                    <td className="gc-nombre">{cliente.nombre}</td>
                    <td>{cliente.telefono}</td>
                    <td className="gc-correo-tabla">
                      {cliente.correo}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="gc-boton-editar"
                        onClick={() => prepararEdicion(cliente)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="gc-tabla-vacia">
                    <strong>
                      {busqueda
                        ? 'No se encontraron clientes'
                        : 'Todavía no hay clientes registrados'}
                    </strong>

                    <span>
                      {busqueda
                        ? 'Prueba con otro nombre, teléfono o correo.'
                        : 'Los clientes que registres aparecerán aquí.'}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="gc-pie-tabla">
          Mostrando {clientesFiltrados.length} de {clientes.length} clientes
        </p>
      </section>
    </main>
  )
}

export default GestionClientes