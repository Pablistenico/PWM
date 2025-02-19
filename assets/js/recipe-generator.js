document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipeForm');
    const addIngredientBtn = document.getElementById('addIngredient');
    const addStepBtn = document.getElementById('addStep');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageInput = document.getElementById('recipeImage');

    // Manejador de ingredientes
    addIngredientBtn.addEventListener('click', function() {
        const ingredientsList = document.getElementById('ingredientsList');
        const newIngredient = document.createElement('div');
        newIngredient.className = 'ingredient-item';
        newIngredient.innerHTML = `
            <input type="text" placeholder="Ingrediente" required>
            <input type="text" placeholder="Cantidad" required>
            <button type="button" class="remove-btn">×</button>
        `;
        ingredientsList.appendChild(newIngredient);

        // Añadir manejador para eliminar
        newIngredient.querySelector('.remove-btn').addEventListener('click', function() {
            newIngredient.remove();
        });
    });

    // Manejador de pasos
    addStepBtn.addEventListener('click', function() {
        const stepsList = document.getElementById('stepsList');
        const newStep = document.createElement('div');
        newStep.className = 'step-item';
        const stepNumber = stepsList.children.length + 1;
        newStep.innerHTML = `
            <span class="step-number">${stepNumber}</span>
            <textarea required placeholder="Describe el paso..."></textarea>
            <button type="button" class="remove-btn">×</button>
        `;
        stepsList.appendChild(newStep);

        // Añadir manejador para eliminar
        newStep.querySelector('.remove-btn').addEventListener('click', function() {
            newStep.remove();
            updateStepNumbers();
        });
    });

    // Actualizar números de pasos
    function updateStepNumbers() {
        const steps = document.querySelectorAll('.step-number');
        steps.forEach((step, index) => {
            step.textContent = index + 1;
        });
    }

    // Manejo de imagen
    imageUploadArea.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageUploadArea.innerHTML = `
                    <input type="file" id="recipeImage" accept="image/*" hidden>
                    <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                `;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Aquí iría la lógica para guardar la receta
        alert('Receta guardada correctamente');
    });

    // Añadir manejadores para los botones de eliminar iniciales
    document.querySelector('.remove-btn').addEventListener('click', function() {
        if (this.closest('.ingredient-item')) {
            this.closest('.ingredient-item').remove();
        } else if (this.closest('.step-item')) {
            this.closest('.step-item').remove();
            updateStepNumbers();
        }
    });
}); 
