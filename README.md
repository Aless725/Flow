## Módulo de Gestión de Clientes

### Descripción

Este módulo nos permite administrar la información de los clientes dentro de la aplicación web, facilitando su registro, consulta, edición y búsqueda.

### Funcionalidades Implementadas

1. **Registro de Clientes:** Permite registrar nuevos clientes ingresando sus datos personales y de contacto.
2. **Consulta de Clientes:** Visualización de los clientes registrados en la aplicación.
3. **Edición de Clientes:** Permite modificar y actualizar la información de los clientes existentes.
4. **Búsqueda de Clientes:** Facilita la localización de clientes mediante consultas en los registros disponibles.
5. **Validaciones de Datos:**
   - Verificación de campos obligatorios.
   - Validación del nombre y número de teléfono.
   - Validación del formato del correo electrónico.
   - Restricción de correos electrónicos duplicados.

### Componentes Principales

- `GestionClientes.jsx`: Componente principal que administra el registro, consulta, búsqueda, edición y validación de los datos de clientes.
- `GestionClientes.css`: Archivo que contiene los estilos visuales del módulo de gestión de clientes.




# Módulo de Servicios

## Descripción
Este módulo permite la administración completa del catálogo de servicios dentro de la aplicación web corporativa.

## Funcionalidades Implementadas
1. **Registro de Servicios:** Permite dar de alta nuevos servicios especificando nombre, precio y duración.
2. **Consulta de Catálogo:** Visualización estructurada en tabla de todos los servicios disponibles.
3. **Validaciones de Negocio:** 
   - Campos obligatorios completos.
   - Restricción de precios y duraciones mayores estricts a 0 min.

## Componentes Principales
- `ServicesModule.jsx`: Contenedor principal de estados.
- `ServiceForm.jsx`: Formulario con lógica de validación de datos.
- `ServiceList.jsx`: Tabla interactiva para la consulta de registros.