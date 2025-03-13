# Implementación de Validación de Formularios en MealMates

Este documento explica las mejoras realizadas en el formulario de creación de recetas de MealMates, implementando validación nativa de HTML5 y validación avanzada con JavaScript.

## Requisitos del Proyecto

El proyecto requería:
- Incluir al menos un formulario en el sitio web
- Realizar validación en el lado cliente usando el soporte nativo de HTML5
- Implementar un sistema de usuarios que permita mostrar contenido diferente según el estado de autenticación

## Validación Nativa HTML5

Se han implementado los siguientes atributos de validación HTML5:

### 1. Atributos Básicos de Validación

| Atributo | Descripción | Ejemplo |
|----------|-------------|---------|
| `required` | Campo obligatorio | `<input type="text" required>` |
| `minlength` | Longitud mínima | `<input type="text" minlength="5">` |
| `maxlength` | Longitud máxima | `<input type="text" maxlength="100">` |
| `min` | Valor mínimo (numérico) | `<input type="number" min="1">` |
| `max` | Valor máximo (numérico) | `<input type="number" max="1440">` |
| `pattern` | Patrón de expresión regular | `<input pattern="^[A-Za-z0-9\s\-\,\.]+$">` |
| `title` | Mensaje de ayuda | `<input title="Solo letras y números">` |

### 2. Tipos de Input Específicos

- `type="number"` - Para valores numéricos (tiempo de preparación)
- `type="file"` - Para la carga de imágenes con `accept="image/jpeg, image/png, image/webp"`
- `<select>` - Para opciones predefinidas (dificultad, categoría)
- `<textarea>` - Para texto largo (descripción, pasos)

### 3. Ejemplo de Implementación

```html
<input type="text" id="title" name="title" required 
       minlength="5" maxlength="100" 
       pattern="^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\,\.]+$"
       placeholder="Ej: Pasta Mediterránea"
       title="El título debe tener entre 5 y 100 caracteres y solo puede contener letras, números, espacios y algunos signos de puntuación">
```

## Validación Avanzada con JavaScript

Se ha implementado un sistema de validación avanzado con JavaScript que complementa la validación nativa de HTML5:

### 1. Funciones de Validación

- Validación de campos requeridos
- Validación de longitud mínima y máxima
- Validación de patrones con expresiones regulares
- Validación de valores mínimos y máximos para campos numéricos
- Validación de tipos de archivo y tamaño para imágenes
- Validación de elementos dinámicos (ingredientes y pasos)

### 2. Gestión de Errores

- Mensajes de error personalizados para cada tipo de validación
- Visualización de errores debajo de cada campo
- Estilización visual de campos con error
- Desplazamiento automático al primer error encontrado

### 3. Validación en Tiempo Real

- Validación al perder el foco (`blur`)
- Validación completa al enviar el formulario
- Prevención de envío si hay errores

### 4. Ejemplo de Código JavaScript

```javascript
// Validación de un campo individual
function validateField(field) {
    // Required validation
    if (field.required && !validators.required(field.value)) {
        showError(field, ERROR_MESSAGES.REQUIRED);
        return false;
    }

    // Minlength validation
    if (field.minLength && !validators.minLength(field.value, field.minLength)) {
        showError(field, ERROR_MESSAGES.MIN_LENGTH(field.minLength));
        return false;
    }

    // Pattern validation
    if (field.pattern && !validators.pattern(field.value, new RegExp(field.pattern))) {
        showError(field, field.title || ERROR_MESSAGES.PATTERN);
        return false;
    }

    // Si llegamos aquí, el campo es válido
    clearError(field);
    return true;
}
```

## Mejoras en la Experiencia de Usuario

### 1. Feedback Visual

- Indicadores de campos requeridos (asterisco rojo)
- Mensajes de error específicos y descriptivos
- Estilización visual de campos con error (borde rojo, fondo ligeramente rojo)

### 2. Interactividad

- Vista previa de imágenes
- Adición y eliminación dinámica de ingredientes y pasos
- Botón de cancelar para volver a la página anterior
- Validación en tiempo real para feedback inmediato

### 3. Accesibilidad

- Atributos `title` con descripciones detalladas
- Etiquetas asociadas a cada campo
- Mensajes de error claros y específicos
- Estructura semántica del formulario

## Almacenamiento de Datos

- Los datos del formulario se guardan en `localStorage`
- Cada receta tiene un ID único y fecha de creación
- Se implementa redirección automática tras guardar correctamente

## Conclusión

La implementación combina la validación nativa de HTML5 con validación avanzada de JavaScript para crear una experiencia de usuario robusta y amigable. El formulario cumple con los requisitos del proyecto al proporcionar validación del lado del cliente y se integra con el sistema de autenticación para mostrar contenido diferenciado según el estado del usuario.

El código está estructurado de manera modular y reutilizable, permitiendo extender fácilmente la funcionalidad a otros formularios del sitio web. 
