document.addEventListener("DOMContentLoaded", function () {
    const components = {
        "lheader": "/src/components/logged-header.html",
        "uheader": "/src/components/unlogged-header.html",
        "footer": "/src/components/footer.html",
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
