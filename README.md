# Flow - Sistema de Gestión de Servicios y Reservas

## Descripción General

Flow es una aplicación web desarrollada para la gestión integral de servicios, clientes y agendamiento de citas. El sistema implementa una arquitectura frontend escalable, persistencia de datos local y una interfaz de usuario moderna, limpia y minimalista.

## Arquitectura del Proyecto

El proyecto utiliza una arquitectura basada en características (Feature-Sliced Design), lo que permite separar la lógica de negocio por dominios y facilita el mantenimiento y la escalabilidad del código.

Estructura principal de directorios:

```text
src/
├── components/
│   └── layout/          # Componentes estructurales globales (Header, Footer)
├── features/            # Módulos de negocio independientes
│   ├── clients/         # Gestión de clientes
│   ├── reservations/    # Gestión de reservas y contexto global
│   └── services/        # Gestión de servicios
├── styles/              # Estilos globales y variables de diseño (Design Tokens)
├── App.jsx              # Enrutador principal por estados (Tabs)
└── main.jsx             # Punto de entrada de React
Identidad Visual (Flow 1.0)
La interfaz gráfica fue rediseñada bajo los siguientes lineamientos:

Tipografía: Titillium Web.

Paleta de colores: Diseño basado en colores planos (sin degradados), utilizando Blanco como fondo principal, Morado (violeta) como color de acento y Gris Oscuro para textos y bordes.

Estilo: Inspirado en herramientas de productividad modernas (estilo Notion/Superhuman), priorizando la limpieza visual, bordes sutiles y sombras casi imperceptibles.

Módulos del Sistema
1. Módulo de Gestión de Clientes
Descripción
Permite administrar la información de los clientes dentro de la aplicación web, facilitando su registro, consulta, edición y búsqueda.

Funcionalidades Implementadas

Registro de Clientes: Permite registrar nuevos clientes ingresando sus datos personales y de contacto.

Consulta de Clientes: Visualización de los clientes registrados en la aplicación.

Edición de Clientes: Permite modificar y actualizar la información de los clientes existentes.

Búsqueda de Clientes: Facilita la localización de clientes mediante consultas filtradas.

Validaciones de Datos:

Verificación de campos obligatorios.

Validación del nombre y número de teléfono.

Validación del formato del correo electrónico.

Restricción de correos electrónicos duplicados.

Persistencia: Los datos se almacenan de forma local (localStorage).

Componentes Principales

src/features/clients/GestionClientes.jsx: Componente principal que administra el registro, consulta, búsqueda, edición y validación.

src/features/clients/GestionClientes.css: Estilos visuales del módulo.

2. Módulo de Servicios
Descripción
Permite la administración completa del catálogo de servicios ofrecidos dentro de la aplicación web.

Funcionalidades Implementadas

Registro de Servicios: Permite dar de alta nuevos servicios especificando nombre, precio y duración.

Consulta de Catálogo: Visualización estructurada en tabla de todos los servicios disponibles.

Validaciones de Negocio:

Campos obligatorios completos.

Restricción de precios y duraciones mayores a 0.

Persistencia: Los datos se almacenan de forma local (localStorage).

Componentes Principales

src/features/services/ServicesModule.jsx: Contenedor principal de estados y persistencia.

src/features/services/ServiceForm.jsx: Formulario con lógica de validación de datos.

src/features/services/ServiceList.jsx: Tabla interactiva para la consulta de registros.

3. Módulo de Reservas
Descripción
Permite el agendamiento de citas, vinculando los clientes y servicios previamente registrados en el sistema.

Funcionalidades Implementadas

Registro de Reservas: Agendamiento mediante selectores dinámicos de clientes y servicios (cruce de datos).

Control de Conflictos: Validación lógica que impide agendar dos reservas para el mismo servicio en la misma fecha y hora.

Gestión de Estados: Permite cancelar reservas activas y muestra el historial con su estado actual.

Visualización Cruzada: El listado de reservas traduce automáticamente los identificadores (UUIDs) en los nombres reales de los clientes y servicios.

Persistencia: Contexto global con almacenamiento local (localStorage).

Componentes Principales

src/features/reservations/ReservasContext.jsx: Proveedor de estado global y lógica de validación de negocio.

src/features/reservations/FormularioReserva.jsx: Formulario de agendamiento con menús desplegables.

src/features/reservations/ListaReservas.jsx: Tabla de visualización y cancelación de citas.

src/features/reservations/Reservas.css: Estilos visuales del módulo.

Requisitos de Ejecución
Para iniciar el proyecto en un entorno local, ejecute los siguientes comandos:

bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
text

### Pasos finales:
1. Abre tu archivo `README.md` en VS Code, borra lo que tiene actualmente y pega el bloque de arriba.
2. Guarda el archivo.
3. Abre la terminal y haz el commit con el mensaje que acordamos:

```powershell
git add README.md
git commit -m "docs(readme): actualizar documentación general del proyecto v1.0.1

- Se documenta la nueva arquitectura Feature-Sliced.
- Se añade la sección de identidad visual (Flow 1.0).
- Se detalla el funcionamiento y componentes del nuevo módulo de Reservas.
- Se corrigen errores tipográficos en el módulo de servicios y se estandarizan las rutas."
git push origin main