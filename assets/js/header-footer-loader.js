document.addEventListener("DOMContentLoaded", function () {
    const components = {
        "lheader": `${window.baseUrl}/src/components/logged-header.html`,
        "uheader": `${window.baseUrl}/src/components/unlogged-header.html`,
        "footer": `${window.baseUrl}/src/components/footer.html`,
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
