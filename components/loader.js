document.addEventListener("DOMContentLoaded", function () {
    const components = {
        "header": "/components/header.html",
        "footer": "/components/footer.html"
    };

    Object.keys(components).forEach(id => {
        const element = document.querySelector(id);
        if (element) {
            fetch(components[id])
                .then(response => response.text())
                .then(data => {
                    element.outerHTML = data;
                })
                .catch(error => console.error(`Error cargando el ${id}:`, error));
        }
    });
});
