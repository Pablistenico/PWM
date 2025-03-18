# Documentación Técnica: Componentes Web, Carga Dinámica y Diseño Responsive

## 1. Componetización con HTMLElement

### Introducción a los Web Components

Los Web Components son un conjunto de tecnologías que permiten crear elementos HTML personalizados, reutilizables y encapsulados. Están basados en estándares web existentes y se componen principalmente de:

- **Custom Elements**: API para definir nuevos elementos HTML
- **Shadow DOM**: Sistema de encapsulamiento para el HTML y CSS
- **HTML Templates**: Fragmentos de HTML que no se renderizan pero pueden ser instanciados posteriormente

### Creación de un Componente Web Personalizado

Para crear un componente web, extendemos la clase `HTMLElement` y definimos su comportamiento. A continuación se muestra el proceso básico:

```javascript
class MiComponente extends HTMLElement {
    constructor() {
        super(); // Siempre llamar primero a super()
        
        // Crear Shadow DOM para encapsular el componente
        this.attachShadow({ mode: "open" });
    }
    
    // Ciclo de vida: componente conectado al DOM
    connectedCallback() {
        this.render();
    }
    
    // Ciclo de vida: observar cambios en atributos
    static get observedAttributes() {
        return ["atributo1", "atributo2"];
    }
    
    // Ciclo de vida: reacción a cambios en atributos
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    
    // Método para renderizar el componente
    render() {
        const atributo1 = this.getAttribute("atributo1") || "valor-por-defecto";
        
        this.shadowRoot.innerHTML = `
            <style>
                /* Estilos encapsulados */
                .contenedor {
                    border: 1px solid #ccc;
                    padding: 10px;
                }
            </style>
            <div class="contenedor">
                <h2>${atributo1}</h2>
                <slot></slot> <!-- Permite insertar contenido -->
            </div>
        `;
    }
}

// Registrar el componente para usarlo como una etiqueta HTML
customElements.define("mi-componente", MiComponente);
```

### Ciclo de Vida de un Componente Web

Los componentes web tienen métodos del ciclo de vida que se ejecutan en momentos específicos:

1. **constructor()**: Se llama cuando se crea una instancia del elemento
2. **connectedCallback()**: Se invoca cuando el elemento se agrega al DOM
3. **disconnectedCallback()**: Se invoca cuando el elemento se elimina del DOM
4. **attributeChangedCallback(name, oldValue, newValue)**: Se llama cuando un atributo del elemento cambia
5. **adoptedCallback()**: Se invoca cuando el elemento se mueve a un nuevo documento

### Uso del Shadow DOM

El Shadow DOM proporciona encapsulamiento para nuestros componentes:

- Aísla el DOM del componente del DOM principal del documento
- Encapsula los estilos CSS para evitar conflictos
- Oculta la implementación interna del componente

```javascript
// Adjuntar Shadow DOM al componente
this.attachShadow({ mode: "open" }); // "open" permite acceso desde JavaScript externo
```

### Ejemplo Práctico: Componente de Tarjeta de Receta

En nuestra aplicación MealMates, hemos implementado un componente para tarjetas de recetas:

```javascript
class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    static get observedAttributes() {
        return ["option", "title", "time", "difficulty", "categories", "image", "alt"];
    }
    
    connectedCallback() {
        this.render();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    
    render() {
        // Obtener atributos
        const title = this.getAttribute("title") || "";
        const time = this.getAttribute("time") || "";
        
        // Renderizar componente
        this.shadowRoot.innerHTML = `
            <style>
                .recipe-card {
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }
            </style>
            <div class="recipe-card">
                <!-- Contenido del componente -->
            </div>
        `;
    }
}

customElements.define("recipe-card", RecipeCard);
```

## 2. Carga Dinámica de Contenido

### Consumo de Datos desde JSON

La carga dinámica de contenido permite obtener datos de fuentes externas (como archivos JSON o APIs) y mostrarlos en la interfaz de usuario sin recargar la página.

#### Usando Fetch API

La API Fetch es una interfaz moderna para realizar peticiones HTTP asíncronas:

```javascript
async function cargarDatos() {
    try {
        // Realizar petición
        const respuesta = await fetch('ruta/al/archivo.json');
        
        // Verificar si la petición fue exitosa
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        // Convertir respuesta a JSON
        const datos = await respuesta.json();
        
        // Hacer algo con los datos
        procesarDatos(datos);
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}
```

### Implementación de una Clase para Gestionar Datos

Es recomendable encapsular la lógica de carga y procesamiento de datos en una clase:

```javascript
class GestorDatos {
    constructor() {
        this.datos = [];
    }
    
    async cargarDatos() {
        try {
            const respuesta = await fetch('ruta/al/archivo.json');
            if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
            
            const datos = await respuesta.json();
            this.datos = datos.items || [];
            return this.datos;
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
    
    filtrarDatos(criterio) {
        return this.datos.filter(item => /* lógica de filtrado */);
    }
    
    renderizarDatos(contenedor) {
        if (!contenedor) return;
        
        contenedor.innerHTML = this.datos.map(item => `
            <div class="item">
                <h3>${item.titulo}</h3>
                <p>${item.descripcion}</p>
            </div>
        `).join('');
    }
}
```

### Ejemplo: Carga Dinámica del Planificador Semanal

En nuestra aplicación de MealMates, implementamos la carga dinámica para el planificador semanal:

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
            this.recipes = [];
            this.planner = {};
        }
    }

    render() {
        if (!this.daysGrid) return;

        const days = Object.keys(this.planner);
        
        this.daysGrid.innerHTML = days.map(day => {
            const recipeId = this.planner[day];
            const recipe = this.recipes.find(r => r.id === recipeId.toString());
            
            return `
                <div class="day-card">
                    <h3>${day}</h3>
                    <recipe-card 
                        option="planner"
                        title="${recipe.title}" 
                        time="${recipe.time}"
                        difficulty="${recipe.difficulty}"
                        categories="${recipe.categories}"
                        image="${recipe.image}">
                    </recipe-card>
                </div>
            `;
        }).join('');
    }
}
```

## 3. Diseño Responsive

### Principios de Diseño Responsive

El diseño responsive (o adaptativo) permite que un sitio web se vea bien en diferentes dispositivos y tamaños de pantalla. Los principios fundamentales son:

1. **Cuadrículas Fluidas**: Usar porcentajes en lugar de píxeles para anchos
2. **Imágenes Flexibles**: Asegurar que las imágenes se escalen correctamente
3. **Media Queries**: Aplicar diferentes estilos según características del dispositivo

### Media Queries

Las media queries permiten aplicar estilos CSS específicos según las características del dispositivo:

```css
/* Estilos base para todos los dispositivos */
.contenedor {
    width: 100%;
    padding: 20px;
}

/* Estilos para tabletas */
@media (min-width: 768px) and (max-width: 1023px) {
    .contenedor {
        padding: 40px;
    }
}

/* Estilos para escritorio */
@media (min-width: 1024px) {
    .contenedor {
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

### Cuadrículas CSS (CSS Grid)

CSS Grid es un sistema de diseño bidimensional que facilita la creación de layouts complejos y responsivos:

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

En este ejemplo:
- `repeat(auto-fit, minmax(250px, 1fr))` crea tantas columnas como quepan en el contenedor
- Cada columna tendrá un mínimo de 250px y un máximo de 1fr (fracción disponible)
- `gap: 20px` establece un espacio entre elementos de 20px

### Flexbox

Flexbox es ideal para diseños unidimensionales (filas o columnas):

```css
.flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.flex-item {
    flex: 0 1 calc(33.333% - 20px);
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .flex-item {
        flex: 0 1 calc(50% - 10px);
    }
}

@media (max-width: 480px) {
    .flex-item {
        flex: 0 1 100%;
    }
}
```

### Imágenes Responsivas

Para que las imágenes se adapten correctamente:

```css
.imagen-responsive {
    max-width: 100%;
    height: auto;
}
```

Para imágenes de fondo:

```css
.fondo-responsive {
    background-image: url('imagen-pequena.jpg');
    background-size: cover;
    background-position: center;
}

@media (min-width: 768px) {
    .fondo-responsive {
        background-image: url('imagen-mediana.jpg');
    }
}

@media (min-width: 1200px) {
    .fondo-responsive {
        background-image: url('imagen-grande.jpg');
    }
}
```

### Ejemplo Práctico: Diseño Responsive en MealMates

En nuestra aplicación MealMates, implementamos diseño responsive para el planificador semanal:

```css
/* Cuadrícula para días de la semana */
.days-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

/* Estilos responsive para tarjetas de recetas */
.recipe-card {
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
}

/* Media queries para diferentes tamaños de pantalla */
@media (max-width: 768px) {
    .planner-container {
        padding: 1rem;
    }
    
    .filters-grid {
        grid-template-columns: 1fr;
    }
}
```

## 4. Implementación Completa de un Componente desde Cero

A continuación se muestra cómo implementar un componente web para una tarjeta de receta desde cero:

### 1. Crear el Archivo JavaScript del Componente

Crear un archivo `recipe-card.js`:

```javascript
class RecipeCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    
    static get observedAttributes() {
        return ["title", "time", "difficulty", "image"];
    }
    
    connectedCallback() {
        this.render();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    
    render() {
        // Obtener atributos
        const title = this.getAttribute("title") || "Sin título";
        const time = this.getAttribute("time") || "0 min";
        const difficulty = this.getAttribute("difficulty") || "Fácil";
        const image = this.getAttribute("image") || "default.jpg";
        
        // Definir estilos
        const styles = `
            <style>
                .recipe-card {
                    background-color: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }
                
                .recipe-card:hover {
                    transform: translateY(-5px);
                }
                
                .recipe-image {
                    height: 200px;
                    overflow: hidden;
                }
                
                .recipe-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .recipe-content {
                    padding: 15px;
                }
                
                .recipe-title {
                    font-size: 18px;
                    margin: 0 0 10px 0;
                }
                
                .recipe-info {
                    display: flex;
                    gap: 10px;
                    color: #666;
                    font-size: 14px;
                }
                
                @media (max-width: 768px) {
                    .recipe-card {
                        width: 100%;
                    }
                }
            </style>
        `;
        
        // Renderizar HTML
        this.shadowRoot.innerHTML = `
            ${styles}
            <div class="recipe-card">
                <div class="recipe-image">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="recipe-content">
                    <h3 class="recipe-title">${title}</h3>
                    <div class="recipe-info">
                        <span>⏱️ ${time}</span>
                        <span>📊 ${difficulty}</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Registrar el componente
customElements.define("recipe-card", RecipeCard);
```

### 2. Crear el Archivo JSON de Datos

Crear un archivo `recipes.json`:

```json
{
  "recipes": [
    {
      "id": "1",
      "title": "Pasta con Tomate",
      "time": "20 min",
      "difficulty": "Fácil",
      "image": "pasta.jpg"
    },
    {
      "id": "2",
      "title": "Ensalada César",
      "time": "15 min",
      "difficulty": "Fácil",
      "image": "ensalada.jpg"
    }
  ]
}
```

### 3. Crear la Clase para Cargar los Datos

Crear un archivo `recipes-loader.js`:

```javascript
class RecipesLoader {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.recipes = [];
        this.init();
    }
    
    async init() {
        await this.loadRecipes();
        this.renderRecipes();
    }
    
    async loadRecipes() {
        try {
            const response = await fetch('./data/recipes.json');
            if (!response.ok) throw new Error('Error cargando recetas');
            
            const data = await response.json();
            this.recipes = data.recipes || [];
        } catch (error) {
            console.error('Error:', error);
            this.recipes = [];
        }
    }
    
    renderRecipes() {
        if (!this.container) return;
        
        this.container.innerHTML = this.recipes.map(recipe => `
            <recipe-card
                title="${recipe.title}"
                time="${recipe.time}"
                difficulty="${recipe.difficulty}"
                image="${recipe.image}">
            </recipe-card>
        `).join('');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new RecipesLoader('recipes-container');
});
```

### 4. Crear el HTML

Crear un archivo `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Recetas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        
        h1 {
            text-align: center;
        }
        
        #recipes-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
    </style>
    <!-- Cargar los scripts de componentes y cargador -->
    <script src="./js/recipe-card.js"></script>
    <script src="./js/recipes-loader.js"></script>
</head>
<body>
    <h1>Mis Recetas Favoritas</h1>
    
    <!-- Contenedor donde se cargarán dinámicamente las recetas -->
    <div id="recipes-container"></div>
</body>
</html>
```

### 5. Resultado

Al abrir el archivo HTML en un navegador, verás una cuadrícula de tarjetas de recetas que:
- Se cargan dinámicamente desde el archivo JSON
- Utilizan componentes web encapsulados
- Se adaptan responsivamente a diferentes tamaños de pantalla

## Conclusión

Al combinar Web Components, carga dinámica de datos y diseño responsive, podemos crear aplicaciones web modernas, mantenibles y adaptables a cualquier dispositivo. Estas técnicas son fundamentales en el desarrollo frontend actual y forman la base de aplicaciones web profesionales. 
