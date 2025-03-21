class RecipeCard extends HTMLElement {
    constructor() {
      super();
      // Crear shadow DOM para encapsular el componente (modo open para poder inspeccionarlo)
      this.attachShadow({ mode: "open" });
    }
  
    // Atributos que queremos observar (si cambian, se re-renderiza)
    static get observedAttributes() {
      return ["option", "title", "time", "difficulty", "categories", "image", "alt", "day"];
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
        const option = this.getAttribute("option") || "created";
        const title = this.getAttribute("title") || "";
        const time = this.getAttribute("time") || "";
        const difficulty = this.getAttribute("difficulty") || "";
        const categories = this.getAttribute("categories") || "";
        const image = this.getAttribute("image") || "https://picsum.photos/seed/food/400/300";
        const alt = this.getAttribute("alt") || title;
        const day = this.getAttribute("day") || "";

        const categoryArray = categories.split(",").map(c => c.trim()).filter(c => c !== "");

        const styles = `
            <style>
                .recipe-card {
                    background: var(--white);
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                    margin: 10px;
                }
                
                .recipe-card:hover {
                    transform: translateY(-5px);
                }

                .recipe-image {
                    position: relative;
                    height: 200px;
                }

                .recipe-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .recipe-content {
                    padding: 1.5rem;
                }

                .recipe-content h3 {
                    margin-bottom: 1rem;
                    color: #333;
                }

                .recipe-info {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1rem;
                    color: #666;
                }

                .recipe-categories {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.4rem;
                }

                .recipe-categories span {
                    background: #f5f5f5;
                    padding: 0.3rem 0.8rem;
                    border-radius: 15px;
                    font-size: 0.9rem;
                    color: #666;
                    margin: 0;
                }

                /* Estilos para tarjetas creadas */
                .created .recipe-actions {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    gap: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .created:hover .recipe-actions {
                    opacity: 1;
                }

                .saved:hover .recipe-actions {
                    opacity: 1;
                }

                .edit-btn, .delete-btn, .save-btn, .bookmark-btn {
                    width: 35px;
                    height: 35px;
                    border: none;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    background-color: white;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                }

                /* Estilos para tarjetas guardadas */
                .saved .recipe-actions {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    gap: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                /* Estilos para tarjetas en planificador */
                .planner .recipe-actions {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    gap: 0.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .planner:hover .recipe-actions {
                    opacity: 1;
                }
                
                .recipe-button {
                    width: -webkit-fill-available;
                    margin-top: 1rem;
                    background-color: var(--accent-color);
                    color: var(--white);
                    border: none;
                    padding: 0.7rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .recipe-button:hover {
                    background-color: darken(var(--accent-color), 10%);
                    color: var(--white);
                }

                @media (max-width: 768px) {
                    .recipe-card {
                        width: 100%;
                    }
                }
            </style>
        `;

        const createdTemplate = `
            <div class="recipe-card created">
                <div class="recipe-image">
                    <img src="${image}" alt="${alt}">
                    <div class="recipe-actions">
                        <button class="edit-btn" href="${window.baseUrl}/src/recipe-generator.html"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
                <div class="recipe-content">
                    <h3>${title}</h3>
                    <div class="recipe-info">
                        <span><i class="far fa-clock"></i> ${time}</span>
                        <span><i class="fas fa-signal"></i> ${difficulty}</span>
                    </div>
                    <div class="recipe-categories">
                        ${categoryArray.map(cat => `<span>${cat}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        const savedTemplate = `
            <div class="recipe-card saved">
                <div class="recipe-image">
                    <img src="${image}" alt="${alt}">
                    <div class="recipe-actions">
                        <button class="save-btn"><i class="fas fa-bookmark"></i></button>
                    </div>
                </div>
                <div class="recipe-content">
                    <h3>${title}</h3>
                    <div class="recipe-info">
                        <span><i class="far fa-clock"></i> ${time}</span>
                        <span><i class="fas fa-signal"></i> ${difficulty}</span>
                    </div>
                    <div class="recipe-categories">
                        ${categoryArray.map(cat => `<span>${cat}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;

        const plannerTemplate = `
            <div class="recipe-card planner">
                <div class="recipe-image">
                    <img src="${image}" alt="${alt}">
                    <div class="recipe-actions">
                        <button class="bookmark-btn"><i class="far fa-bookmark"></i></button>
                    </div>
                </div>
                <div class="recipe-content">
                    <h3>${title}</h3>
                    <div class="recipe-info">
                        <span><i class="far fa-clock"></i> ${time}</span>
                        <span><i class="fas fa-signal"></i> ${difficulty}</span>
                    </div>
                    <div class="recipe-categories">
                        ${categoryArray.map(cat => `<span>${cat}</span>`).join('')}
                    </div>
                    <button class="recipe-button">Ver receta</button>
                </div>
            </div>
        `;

        let template = "";
        if (option === "created") {
            template = createdTemplate;
        } else if (option === "saved") {
            template = savedTemplate;
        } else if (option === "planner") {
            template = plannerTemplate;
        }

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            ${styles}
            ${template}
        `;
    }
}

customElements.define("recipe-card", RecipeCard);
