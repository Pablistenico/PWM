class RecipeCard extends HTMLElement {
    constructor() {
      super();
      // Crear shadow DOM para encapsular el componente (modo open para poder inspeccionarlo)
      this.attachShadow({ mode: "open" });
    }
  
    // Atributos que queremos observar (si cambian, se re-renderiza)
    static get observedAttributes() {
      return ["title", "time", "difficulty", "categories", "image", "alt"];
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
      // Obtener los valores de los atributos
      const title = this.getAttribute("title") || "";
      const time = this.getAttribute("time") || "";
      const difficulty = this.getAttribute("difficulty") || "";
      const categories = this.getAttribute("categories") || "";
      const image = this.getAttribute("image") || "https://picsum.photos/seed/food/400/300";
      const alt = this.getAttribute("alt") || title;
  
      // Procesar las categorías (se esperan separadas por comas)
      const categoryArray = categories.split(",").map(c => c.trim()).filter(c => c !== "");
  
      // Definir el contenido HTML del componente (incluye estilos propios)
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../../assets/css/styles.css">
        <link rel="stylesheet" href="/assets/css/my-recipes.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <div class="recipe-card">
          <div class="recipe-image">
            <img src="${image}" alt="${alt}">
            <div class="recipe-actions">
              <button class="edit-btn"><i class="fas fa-edit"></i></button>
              <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <div class="recipe-content">
            <h3>${title}</h3>
            <div class="recipe-info">
              <span class="time"><i class="far fa-clock"></i> ${time}</span>
              <span class="difficulty"><i class="fas fa-signal"></i> ${difficulty}</span>
            </div>
            <div class="recipe-categories">
              ${categoryArray.map(cat => `<span>${cat}</span>`).join('')}
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Registrar el custom element con el nombre "recipe-card"
  customElements.define("recipe-card", RecipeCard);
  