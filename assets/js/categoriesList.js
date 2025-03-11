class CategoriesList {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.categories = [];
        this.init();
    }

    async init() {
        await this.loadCategories();
        this.render();
        this.addEventListeners();
    }

    async loadCategories() {
        try {
            const response = await fetch('../data/categories.json');
            const data = await response.json();
            this.categories = data.categories;
        } catch (error) {
            console.error('Error cargando categorías:', error);
            this.categories = [];
        }
    }

    render() {
        if (!this.container) return;
        
        const template = this.categories.map(category => `
            <div class="category-item">
                <input type="checkbox" 
                    id="${category.id}" 
                    ${category.isChecked ? 'checked' : ''}>
                <label for="${category.id}">
                    ${category.name} (${category.count})
                </label>
            </div>
        `).join('');

        this.container.innerHTML = template;
    }

    addEventListeners() {
        this.container.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const categoryId = e.target.id;
                const category = this.categories.find(c => c.id === categoryId);
                if (category) {
                    category.isChecked = e.target.checked;
                    // Aquí podrías agregar código para filtrar las recetas
                    console.log(`Categoría ${category.name} ${category.isChecked ? 'seleccionada' : 'deseleccionada'}`);
                }
            }
        });
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/data/categories.json');
        const data = await response.json();
        
        const categoriesList = document.querySelector('.categories-list');
        
        data.categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category-item';
            categoryElement.innerHTML = `
                <input type="checkbox" 
                       id="${category.id}" 
                       ${category.isChecked ? 'checked' : ''}>
                <label for="${category.id}">
                    ${category.name}
                    <span class="count">(${category.count})</span>
                </label>
            `;
            categoriesList.appendChild(categoryElement);
        });
    } catch (error) {
        console.error('Error cargando las categorías:', error);
    }
});