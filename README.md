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