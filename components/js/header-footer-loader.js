document.addEventListener("DOMContentLoaded", function () {
    // Get the current path to determine if we're in root or subdirectory
    const isRoot = window.location.pathname.endsWith('index.html') || 
                   window.location.pathname.endsWith('PWM/');

    const components = {
        "lheader": isRoot ? "./components/logged-header.html" : "./../components/logged-header.html",
        "uheader": isRoot ? "./components/unlogged-header.html" : "./../components/unlogged-header.html",
        "footer": isRoot ? "./components/footer.html" : "./../components/footer.html"
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
