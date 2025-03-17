# 🍳 MealMates

## Índice de Contenidos

- [🍳 MealMates](#-mealmates)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [🎯 Sobre el Proyecto](#-sobre-el-proyecto)
    - [🎓 Asignatura](#-asignatura)
  - [🚀 Empezando](#-empezando)
  - [🛠 Tecnologías](#-tecnologías)
  - [✨ Características](#-características)
  - [📁 Estructura](#-estructura)
  - [👥 Equipo](#-equipo)
    - [👨‍💻 Contribución](#-contribución)
  - [📊 Organización](#-organización)
    - [Metodología](#metodología)
    - [Documentación](#documentación)
    - [Herramientas de Gestión](#herramientas-de-gestión)
    - [Ramas Git](#ramas-git)
  - [📝 Licencia](#-licencia)
  - [Sprint 2: Carga Dinámica y Diseño Responsive](#sprint-2-carga-dinámica-y-diseño-responsive)
    - [1. Estructura de Datos (JSON Schema)](#1-estructura-de-datos-json-schema)
    - [2. Componetización con Web Components](#2-componetización-con-web-components)
    - [3. Carga Dinámica de Contenido](#3-carga-dinámica-de-contenido)
    - [4. Diseño Responsive](#4-diseño-responsive)
    - [Capturas de Pantalla](#capturas-de-pantalla)
      - [Vista de Escritorio](#vista-de-escritorio)
      - [Vista Móvil](#vista-móvil)
    - [Documentación Técnica](#documentación-técnica)
  - [Próximos pasos](#próximos-pasos)

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Responsive-025E8C?style=for-the-badge&logo=google-chrome&logoColor=white)](https://developer.mozilla.org/es/docs/Learn/CSS/CSS_layout/Responsive_Design)
[![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)](https://trello.com/b/your-board)

Tu compañero perfecto para la cocina 🥘

</div>

## 📋 Tabla de Contenidos

- [🍳 MealMates](#-mealmates)
  - [Índice de Contenidos](#índice-de-contenidos)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [🎯 Sobre el Proyecto](#-sobre-el-proyecto)
    - [🎓 Asignatura](#-asignatura)
  - [🚀 Empezando](#-empezando)
  - [🛠 Tecnologías](#-tecnologías)
  - [✨ Características](#-características)
  - [📁 Estructura](#-estructura)
  - [👥 Equipo](#-equipo)
    - [👨‍💻 Contribución](#-contribución)
  - [📊 Organización](#-organización)
    - [Metodología](#metodología)
    - [Documentación](#documentación)
    - [Herramientas de Gestión](#herramientas-de-gestión)
    - [Ramas Git](#ramas-git)
  - [📝 Licencia](#-licencia)
  - [Sprint 2: Carga Dinámica y Diseño Responsive](#sprint-2-carga-dinámica-y-diseño-responsive)
    - [1. Estructura de Datos (JSON Schema)](#1-estructura-de-datos-json-schema)
    - [2. Componetización con Web Components](#2-componetización-con-web-components)
    - [3. Carga Dinámica de Contenido](#3-carga-dinámica-de-contenido)
    - [4. Diseño Responsive](#4-diseño-responsive)
    - [Capturas de Pantalla](#capturas-de-pantalla)
      - [Vista de Escritorio](#vista-de-escritorio)
      - [Vista Móvil](#vista-móvil)
    - [Documentación Técnica](#documentación-técnica)
  - [Próximos pasos](#próximos-pasos)

## 🎯 Sobre el Proyecto

MealMates es una aplicación web desarrollada como parte de la asignatura de **Programación Web y Móvil** en la Universidad de Las Palmas de Gran Canaria. El proyecto se centra en crear una plataforma intuitiva para la gestión y descubrimiento de recetas culinarias, poniendo en práctica principios modernos de desarrollo web y diseño responsive.

Nuestro enfoque combina una experiencia de usuario atractiva con funcionalidades prácticas para ayudar a los usuarios a organizar, descubrir y compartir sus recetas favoritas.

### 🎓 Asignatura
- **Nombre**: Programación Web y Móvil
- **Curso**: 2024/2025
- **Grado**: Ingeniería Informática
- **Universidad**: Universidad de Las Palmas de Gran Canaria

## 🚀 Empezando

Para ejecutar este proyecto localmente:

```bash
# Clonar el repositorio
git clone https://github.com/Pablistenico/PWM.git

# Navegar al directorio
cd PWM

# Abrir en navegador (o usar Live Server en VSCode)
open index.html
```

## 🛠 Tecnologías

- **Frontend**:
  - HTML5 (Estructura semántica, SEO básico)
  - CSS3 (Custom Properties, Flexbox, Grid, Animaciones)
  - JavaScript (ES6+, Manipulación del DOM, Fetch API)
  - FontAwesome (iconografía)
  - Diseño Mobile-First

- **Herramientas de Desarrollo**:
  - Git & GitHub (Control de versiones)
  - Visual Studio Code (Editor)
  - Live Server (Servidor local)
  - Chrome DevTools (Depuración)

## ✨ Características

- 📱 Diseño responsive para todos los dispositivos
- 🎨 Interfaz moderna e intuitiva con animaciones fluidas
- 🔍 Búsqueda y filtrado avanzado de recetas por ingredientes, tiempo y dificultad
- 📝 Creación y edición de recetas con sistema de categorización
- 📅 Planificador semanal de menús con recordatorios
- 👤 Gestión de perfiles de usuario personalizable
- 💾 Guardado de recetas favoritas con sincronización
- 🌙 Modo oscuro para mejor experiencia nocturna
- 📊 Estadísticas de recetas más populares

## 📁 Estructura

```bash
mealmates/
├── assets/
│ ├── css/
│ │ ├── styles.css
│ │ ├── recipe.css
│ │ └── ...
│ ├── js/
│ │ ├── script.js
│ │ └── ...
│ └── img/
├── src/
│ ├── recipe.html
│ ├── profile.html
│ └── ...
└── index.html
```


## 👥 Equipo

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Pablistenico">
        <img src="https://github.com/Pablistenico.png" width="100px;" alt="Pablo Monzón"/>
        <br />
        <sub><b>Pablo Monzón Toca</b></sub>
      </a>
      <!--div>Frontend & UI</div-->
    </td>
    <td align="center">
      <a href="https://github.com/gitfrandu4">
        <img src="https://github.com/gitfrandu4.png" width="100px;" alt="Francisco Javier López-Dufour"/>
        <br />
        <sub><b>Francisco Javier López-Dufour Morales</b></sub>
      </a>
      <!--div>JavaScript & UX</div-->
    </td>
    <td align="center">
      <a href="https://github.com/ElenaArtiles">
        <img src="https://github.com/ElenaArtiles.png" width="100px;" alt="Elena Artiles"/>
        <br />
        <sub><b>Elena Artiles Morales</b></sub>
      </a>
      <!--div>Diseño & CSS</div-->
    </td>
  </tr>
</table>

### 👨‍💻 Contribución

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu función (`git checkout -b feature/NuevaFuncion`)
3. Haz commit de tus cambios (`git commit -m 'Añadir: Nueva función'`)
4. Pushea a la rama (`git push origin feature/NuevaFuncion`)
5. Abre un Pull Request

## 📊 Organización

### Metodología
- Desarrollo iterativo e incremental
- Reuniones semanales de seguimiento
- Control de versiones con Git

### Documentación
- [Requisitos del proyecto PWM](./Requisitos%20del%20proyecto%20PWM.pdf): Documento de requisitos y especificaciones del proyecto
- [Meal Mates Mockups](./Meal%20Mates%20Mockups.pdf): Diseños y mockups de la interfaz de usuario
- [Presentación Sprint 1](./presentation-sprint-1.pdf): Primera presentación del proyecto con avances iniciales y planificación
  
### Herramientas de Gestión
- **Trello**: [Enlace al tablero](https://trello.com/b/A9OGJGil/pwm)
  - Seguimiento de tareas
  - Distribución de trabajo
  - Planificación de sprints

### Ramas Git
- `main`: Código en producción
- `develop`: Desarrollo activo
- `feature/*`: Nuevas características
- `hotfix/*`: Correcciones urgentes

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

<div align="center">
Hecho con ❤️ por el equipo de MealMates
</div>

## Sprint 2: Carga Dinámica y Diseño Responsive

Durante el Sprint 2, hemos implementado las siguientes funcionalidades y mejoras técnicas:

### 1. Estructura de Datos (JSON Schema)

Hemos definido un esquema de datos robusto para la aplicación, que incluye las siguientes colecciones:

```json
{
  "database": "my_database",
  "collections": [
    {
      "name": "categories",
      "fields": {
        "id": { "type": "integer", "unique": true, "primary": true },
        "name": { "type": "string"},
        "count": { "type": "integer"},
        "subcategories": { "type": "array", "items": { "type": "string"} }
      }
    },
    {
      "name": "recipes",
      "fields": {
        "id": { "type": "string", "unique": true, "primary": true },
        "title": { "type": "string" },
        "time": { "type": "string" },
        "difficulty": { "type": "string", "enum": ["Fácil", "Medio", "Difícil"] },
        "categories": { "type": "string" },
        "image": { "type": "string" },
        "alt": { "type": "string" }
      }
    },
    {
      "name": "weeklyPlan",
      "fields": {
        "day": { "type": "string", "enum": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], "unique": true, "primary": true },
        "recipeId": { "type": "string", "reference": "recipes.id" }
      }
    }
  ]
}
```

Este esquema permite organizar la información de las recetas, categorías y el plan semanal de manera estructurada y con validaciones apropiadas.

### 2. Componetización con Web Components

Hemos implementado Web Components para encapsular la lógica y presentación de elementos reutilizables, como las tarjetas de recetas:

```javascript
// Ejemplo simplificado de nuestro componente RecipeCard
class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    static get observedAttributes() {
        return ["option", "title", "time", "difficulty", "categories", "image"];
    }
    
    connectedCallback() {
        this.render();
    }
    
    render() {
        // Lógica de renderizado aquí
    }
}

customElements.define("recipe-card", RecipeCard);
```

### 3. Carga Dinámica de Contenido

Implementamos la carga dinámica de recetas desde archivos JSON utilizando la API Fetch:

```javascript
class WeeklyPlanner {
    constructor() {
        this.planner = {};
        this.recipes = [];
        this.daysGrid = document.querySelector('.days-grid');
        this.init();
    }

    async init() {
        await this.loadRecipesData();
        this.render();
    }

    async loadRecipesData() {
        try {
            const response = await fetch('../data/recipes.json');
            const data = await response.json();
            this.recipes = data.recipes;
            this.planner = data.weeklyPlan;
        } catch (error) {
            console.error('Error loading recipes:', error);
        }
    }
    
    // Método para renderizar el contenido
    render() {
        // Lógica de renderizado
    }
}
```

### 4. Diseño Responsive

Hemos implementado un diseño completamente responsive utilizando Grid Layout y Media Queries:

```css
/* Grid Layout para la cuadrícula de días */
.days-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

/* Media queries para adaptación a diferentes dispositivos */
@media (max-width: 768px) {
    .planner-container {
        padding: 1rem;
    }
    
    .filters-grid {
        grid-template-columns: 1fr;
    }
}
```

### Capturas de Pantalla

#### Vista de Escritorio
![Vista de Escritorio](https://via.placeholder.com/800x450?text=Vista+de+Escritorio)

#### Vista Móvil
![Vista Móvil](https://via.placeholder.com/300x600?text=Vista+Móvil)

### Documentación Técnica

Se ha creado documentación técnica detallada sobre los componentes web, carga dinámica y diseño responsive en el archivo [webcomponents-docs.md](docs/webcomponents-docs.md).

## Próximos pasos

Para el Sprint 3, nos enfocaremos en:

- Implementación de filtros avanzados para las recetas
- Funcionalidad de búsqueda
- Persistencia de datos en el navegador
- Mejoras en la interfaz de usuario

---

© 2023 MealMates - Proyecto Desarrollado para la Asignatura de Programación Web y Móvil
