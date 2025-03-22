class BlogRecipesList {
    constructor(containerId) {
        this.container = document.querySelector(containerId);
        this.blogRecipes = [];
        this.baseUrl = '';  // Can be configured if needed
        this.init();
    }

    async init() {
        await this.loadBlogRecipes();
        this.render();
    }

    async loadBlogRecipes() {
        // Possible paths to try
        const paths = [
            '/data/recipes.json',
            './data/recipes.json',
            '../data/recipes.json',
            '../../data/recipes.json',
            '../../../data/recipes.json',
        ];

        for (const path of paths) {
            try {
                console.log('Trying path:', path);
                const response = await fetch(this.baseUrl + path);
                
                if (!response.ok) {
                    console.log(`Path ${path} failed with status: ${response.status}`);
                    continue;
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    console.log(`Path ${path} returned non-JSON content type: ${contentType}`);
                    continue;
                }

                const data = await response.json();
                this.blogRecipes = data['blog-recipes'] || [];
                console.log('Successfully loaded recipes from:', path);
                return;

            } catch (error) {
                console.log(`Failed to load from ${path}:`, error.message);
            }
        }

        console.error('Error: Could not load recipes from any path');
        this.blogRecipes = [];
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
