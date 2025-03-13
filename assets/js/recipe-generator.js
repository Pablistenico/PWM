/**
 * Recipe Generator Form Validation and Functionality
 * This script handles the recipe creation form with advanced validation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('recipeForm');
    const addIngredientBtn = document.getElementById('addIngredient');
    const addStepBtn = document.getElementById('addStep');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageInput = document.getElementById('recipeImage');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImage');

    // Validation patterns
    const PATTERNS = {
        TITLE: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\,\.]+$/,
        INGREDIENT: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\,\.]+$/,
        QUANTITY: /^[0-9]+(\.[0-9]+)?\s*[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
    };

    // Error messages
    const ERROR_MESSAGES = {
        REQUIRED: 'Este campo es obligatorio',
        MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
        MAX_LENGTH: (max) => `No puede tener más de ${max} caracteres`,
        PATTERN: 'El formato no es válido',
        MIN_VALUE: (min) => `El valor mínimo es ${min}`,
        MAX_VALUE: (max) => `El valor máximo es ${max}`,
        FILE_TYPE: 'Solo se permiten archivos JPG, PNG o WebP',
        FILE_SIZE: 'El archivo no puede superar los 5MB',
        INGREDIENTS_REQUIRED: 'Debe añadir al menos un ingrediente',
        STEPS_REQUIRED: 'Debe añadir al menos un paso'
    };

    // Validation functions
    const validators = {
        required: (value) => value.trim() !== '',
        minLength: (value, min) => value.length >= min,
        maxLength: (value, max) => value.length <= max,
        pattern: (value, pattern) => pattern.test(value),
        minValue: (value, min) => Number(value) >= min,
        maxValue: (value, max) => Number(value) <= max,
        fileType: (file) => {
            if (!file) return false;
            const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
            return validTypes.includes(file.type);
        },
        fileSize: (file) => {
            if (!file) return false;
            const maxSize = 5 * 1024 * 1024; // 5MB
            return file.size <= maxSize;
        }
    };

    // Show error message
    function showError(element, message) {
        // Find the error message element
        let errorElement;
        if (element.classList.contains('ingredient-item')) {
            errorElement = element.querySelector('.ingredient-error');
        } else if (element.classList.contains('step-item')) {
            errorElement = element.querySelector('.step-error');
        } else {
            errorElement = document.getElementById(`${element.id}-error`);
        }

        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            element.classList.add('error');
        }
    }

    // Clear error message
    function clearError(element) {
        let errorElement;
        if (element.classList.contains('ingredient-item')) {
            errorElement = element.querySelector('.ingredient-error');
        } else if (element.classList.contains('step-item')) {
            errorElement = element.querySelector('.step-error');
        } else {
            errorElement = document.getElementById(`${element.id}-error`);
        }

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            element.classList.remove('error');
        }
    }

    // Validate a single field
    function validateField(field) {
        // Skip validation for non-required fields that are empty
        if (!field.required && !field.value.trim()) {
            clearError(field);
            return true;
        }

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

        // Maxlength validation
        if (field.maxLength && !validators.maxLength(field.value, field.maxLength)) {
            showError(field, ERROR_MESSAGES.MAX_LENGTH(field.maxLength));
            return false;
        }

        // Pattern validation
        if (field.pattern && !validators.pattern(field.value, new RegExp(field.pattern))) {
            showError(field, field.title || ERROR_MESSAGES.PATTERN);
            return false;
        }

        // Min value validation for number inputs
        if (field.type === 'number' && field.min && !validators.minValue(field.value, Number(field.min))) {
            showError(field, ERROR_MESSAGES.MIN_VALUE(field.min));
            return false;
        }

        // Max value validation for number inputs
        if (field.type === 'number' && field.max && !validators.maxValue(field.value, Number(field.max))) {
            showError(field, ERROR_MESSAGES.MAX_VALUE(field.max));
            return false;
        }

        // File type validation
        if (field.type === 'file' && field.files.length > 0) {
            if (!validators.fileType(field.files[0])) {
                showError(field, ERROR_MESSAGES.FILE_TYPE);
                return false;
            }
            if (!validators.fileSize(field.files[0])) {
                showError(field, ERROR_MESSAGES.FILE_SIZE);
                return false;
            }
        }

        // If we got here, the field is valid
        clearError(field);
        return true;
    }

    // Validate ingredient item
    function validateIngredientItem(item) {
        const ingredientInput = item.querySelector('input[name="ingredient[]"]');
        const quantityInput = item.querySelector('input[name="quantity[]"]');
        let isValid = true;

        // Validate ingredient name
        if (!validators.required(ingredientInput.value)) {
            showError(item, ERROR_MESSAGES.REQUIRED);
            isValid = false;
        } else if (!validators.pattern(ingredientInput.value, PATTERNS.INGREDIENT)) {
            showError(item, ingredientInput.title || ERROR_MESSAGES.PATTERN);
            isValid = false;
        }

        // Validate quantity
        if (!validators.required(quantityInput.value)) {
            showError(item, ERROR_MESSAGES.REQUIRED);
            isValid = false;
        } else if (!validators.pattern(quantityInput.value, PATTERNS.QUANTITY)) {
            showError(item, quantityInput.title || ERROR_MESSAGES.PATTERN);
            isValid = false;
        }

        if (isValid) {
            clearError(item);
        }

        return isValid;
    }

    // Validate step item
    function validateStepItem(item) {
        const stepTextarea = item.querySelector('textarea[name="step[]"]');
        let isValid = true;

        // Validate step description
        if (!validators.required(stepTextarea.value)) {
            showError(item, ERROR_MESSAGES.REQUIRED);
            isValid = false;
        } else if (!validators.minLength(stepTextarea.value, 10)) {
            showError(item, ERROR_MESSAGES.MIN_LENGTH(10));
            isValid = false;
        }

        if (isValid) {
            clearError(item);
        }

        return isValid;
    }

    // Validate the entire form
    function validateForm() {
        let isValid = true;

        // Validate basic information fields
        const basicFields = [
            document.getElementById('title'),
            document.getElementById('prepTime'),
            document.getElementById('difficulty'),
            document.getElementById('category'),
            document.getElementById('description')
        ];

        basicFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Validate ingredients
        const ingredientItems = document.querySelectorAll('.ingredient-item');
        if (ingredientItems.length === 0) {
            showError(document.querySelector('.ingredients-section'), ERROR_MESSAGES.INGREDIENTS_REQUIRED);
            isValid = false;
        } else {
            let allIngredientsValid = true;
            ingredientItems.forEach(item => {
                if (!validateIngredientItem(item)) {
                    allIngredientsValid = false;
                }
            });
            if (!allIngredientsValid) {
                isValid = false;
            }
        }

        // Validate steps
        const stepItems = document.querySelectorAll('.step-item');
        if (stepItems.length === 0) {
            showError(document.querySelector('.steps-section'), ERROR_MESSAGES.STEPS_REQUIRED);
            isValid = false;
        } else {
            let allStepsValid = true;
            stepItems.forEach(item => {
                if (!validateStepItem(item)) {
                    allStepsValid = false;
                }
            });
            if (!allStepsValid) {
                isValid = false;
            }
        }

        // Validate image
        const imageInput = document.getElementById('recipeImage');
        if (imageInput.required && (!imageInput.files || imageInput.files.length === 0)) {
            showError(imageInput, ERROR_MESSAGES.REQUIRED);
            isValid = false;
        } else if (imageInput.files && imageInput.files.length > 0) {
            if (!validateField(imageInput)) {
                isValid = false;
            }
        }

        return isValid;
    }

    // Add ingredient handler
    addIngredientBtn.addEventListener('click', function() {
        const ingredientsList = document.getElementById('ingredientsList');
        const newIngredient = document.createElement('div');
        newIngredient.className = 'ingredient-item';
        newIngredient.innerHTML = `
            <input type="text" name="ingredient[]" placeholder="Ingrediente" 
                   required pattern="^[A-Za-zÀ-ÖØ-öø-ÿ0-9\\s\\-\\,\\.]+$"
                   title="Solo puede contener letras, números, espacios y algunos signos de puntuación">
            <input type="text" name="quantity[]" placeholder="Cantidad" 
                   required pattern="^[0-9]+(\\.[0-9]+)?\\s*[A-Za-zÀ-ÖØ-öø-ÿ\\s]*$"
                   title="Formato válido: número seguido opcionalmente de unidad (ej: 200 g, 2 cucharadas)">
            <button type="button" class="remove-btn">×</button>
            <div class="error-message ingredient-error"></div>
        `;
        ingredientsList.appendChild(newIngredient);

        // Add remove handler
        newIngredient.querySelector('.remove-btn').addEventListener('click', function() {
            newIngredient.remove();
        });

        // Add validation on blur
        const inputs = newIngredient.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateIngredientItem(newIngredient);
            });
        });
    });

    // Add step handler
    addStepBtn.addEventListener('click', function() {
        const stepsList = document.getElementById('stepsList');
        const newStep = document.createElement('div');
        newStep.className = 'step-item';
        const stepNumber = stepsList.children.length + 1;
        newStep.innerHTML = `
            <span class="step-number">${stepNumber}</span>
            <textarea name="step[]" required minlength="10" 
                      placeholder="Describe el paso..."
                      title="Cada paso debe tener al menos 10 caracteres"></textarea>
            <button type="button" class="remove-btn">×</button>
            <div class="error-message step-error"></div>
        `;
        stepsList.appendChild(newStep);

        // Add remove handler
        newStep.querySelector('.remove-btn').addEventListener('click', function() {
            newStep.remove();
            updateStepNumbers();
        });

        // Add validation on blur
        const textarea = newStep.querySelector('textarea');
        textarea.addEventListener('blur', function() {
            validateStepItem(newStep);
        });
    });

    // Update step numbers
    function updateStepNumbers() {
        const steps = document.querySelectorAll('.step-number');
        steps.forEach((step, index) => {
            step.textContent = index + 1;
        });
    }

    // Image handling
    imageUploadArea.addEventListener('click', function() {
        imageInput.click();
    });

    imageInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            // Validate file type and size
            if (!validators.fileType(this.files[0])) {
                showError(this, ERROR_MESSAGES.FILE_TYPE);
                return;
            }
            if (!validators.fileSize(this.files[0])) {
                showError(this, ERROR_MESSAGES.FILE_SIZE);
                return;
            }

            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                imagePreview.style.display = 'block';
                imageUploadArea.style.display = 'none';
                clearError(imageInput);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Remove image handler
    removeImageBtn.addEventListener('click', function() {
        imageInput.value = '';
        imagePreview.style.display = 'none';
        imageUploadArea.style.display = 'block';
    });

    // Add validation on blur for all initial fields
    const allInputs = form.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        if (input.type !== 'file' && input.type !== 'button' && input.type !== 'submit') {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        }
    });

    // Validate initial ingredient and step items
    document.querySelectorAll('.ingredient-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateIngredientItem(item);
            });
        });
    });

    document.querySelectorAll('.step-item').forEach(item => {
        const textarea = item.querySelector('textarea');
        textarea.addEventListener('blur', function() {
            validateStepItem(item);
        });
    });

    // Add remove handlers for initial items
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.closest('.ingredient-item')) {
                this.closest('.ingredient-item').remove();
            } else if (this.closest('.step-item')) {
                this.closest('.step-item').remove();
                updateStepNumbers();
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate the entire form
        if (validateForm()) {
            // Create recipe object
            const recipe = {
                title: document.getElementById('title').value,
                prepTime: document.getElementById('prepTime').value,
                difficulty: document.getElementById('difficulty').value,
                category: document.getElementById('category').value,
                description: document.getElementById('description').value,
                ingredients: [],
                steps: [],
                image: imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null
            };

            // Get ingredients
            document.querySelectorAll('.ingredient-item').forEach(item => {
                const ingredient = item.querySelector('input[name="ingredient[]"]').value;
                const quantity = item.querySelector('input[name="quantity[]"]').value;
                recipe.ingredients.push({ ingredient, quantity });
            });

            // Get steps
            document.querySelectorAll('.step-item').forEach(item => {
                const step = item.querySelector('textarea[name="step[]"]').value;
                recipe.steps.push(step);
            });

            // Save recipe to localStorage
            saveRecipe(recipe);

            // Show success message and redirect
            alert('Receta guardada correctamente');
            navigateTo('src/my-recipes.html');
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // Save recipe to localStorage
    function saveRecipe(recipe) {
        // Get existing recipes or initialize empty array
        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        
        // Add new recipe with unique ID
        recipe.id = Date.now().toString();
        recipe.createdAt = new Date().toISOString();
        
        recipes.push(recipe);
        
        // Save back to localStorage
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}); 
