class RecipeBlogCard extends HTMLElement {
    constructor() {
      super();
      // Crear shadow DOM para encapsular el componente (modo open para poder inspeccionarlo)
      this.attachShadow({ mode: "open" });
    }
  
    // Atributos que queremos observar (si cambian, se re-renderiza)
    static get observedAttributes() {
      return ["title", "description", "rate", "categories", "image", "alt", "chefImage", "chefName"];
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
        const title = this.getAttribute("title") || "";
        const categories = this.getAttribute("categories") || "";
        const image = this.getAttribute("image") || "https://picsum.photos/seed/food/400/300";
        const alt = this.getAttribute("alt") || title;
        const description = this.getAttribute("description") || "";
        const rate = this.getAttribute("rate") || "";
        const chefImage = this.getAttribute("chefImage") || "https://picsum.photos/seed/chef/40/40";
        const chefName = this.getAttribute("chefName") || "Chef";

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

                .saved:hover .recipe-actions, .blog:hover .recipe-actions {
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
                .saved .recipe-actions, .blog .recipe-actions {
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
                    display: block;
                    width: fit-content;
                    margin: 1rem auto 0;
                    background-color: var(--accent-color);
                    color: var(--white);
                    border: none;
                    padding: 0.7rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                }

                @media (max-width: 768px) {
                    .recipe-card {
                        width: 100%;
                    }
                }

                .recipe-meta {
                    margin-top: 1rem;
                }

                .properties {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .author {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .author img {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }

                .rating {
                    display: flex;
                    align-items: center;
                    gap: 0.3rem;
                }
            </style>
        `;

        const blogTemplate = `
            <article class="recipe-card blog">
                <div class="recipe-image">
                    <img src="${image}" alt="${alt}">
                    <div class="recipe-actions">
                        <button class="save-btn"><i class="far fa-bookmark"></i></button>
                    </div>
                </div>
                <div class="recipe-content">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="recipe-categories">
                        ${categoryArray.map(cat => `<span>${cat}</span>`).join('')}
                    </div>
                    <div class="recipe-meta">
                        <div class="properties">
                            
                            <div class="rating">
                                ${rate} <i class="fas fa-star"></i>
                            </div>
                            <div class="author">
                                <img src="${chefImage}" alt="${chefName}">
                                <span>${chefName}</span>
                            </div>
                        </div>
                    </div>
                    <button class="recipe-button">Ver receta</button>
                </div>
            </article>
        `;

        const template = blogTemplate;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            ${styles}
            ${template}
        `;
    }
}

customElements.define("recipe-blog-card", RecipeBlogCard);
