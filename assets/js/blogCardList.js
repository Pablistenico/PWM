class BlogRecipesList {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.blogRecipes = [];
        this.init();
    }

    async init() {
        await this.loadBlogRecipes();
        this.render();
    }

    async loadBlogRecipes() {
        try {
            const response = await fetch('../../../data/recipes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not JSON');
            }

            const data = await response.json();
            this.blogRecipes = data['blog-recipes'] || [];
        } catch (error) {
            console.error('Error cargando recetas del blog:', error);
            console.debug('Response details:', error.message);
            this.blogRecipes = [];
        }
    }

    render() {
        if (!this.container) return;

        if (this.blogRecipes.length === 0) {
            this.container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <h2>No hay recetas disponibles</h2>
                    <p>Vuelve más tarde para ver nuevas recetas</p>
                </div>`;
            return;
        }

        const template = this.blogRecipes.map(recipe => `
            <recipe-blog-card 
                title="${recipe.title}"
                description="${recipe.description}"
                categories="${recipe.categories.join(', ')}"
                image="${recipe.image}"
                alt="${recipe.alt}"
                rate="${recipe.rate}"
                chefName="${recipe.chefName}"
                chefImage="${recipe.chefImage}">
            </recipe-blog-card>
        `).join('');

        this.container.innerHTML = template;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BlogRecipesList('#blog-recipes .blog-recipes-list');
});
