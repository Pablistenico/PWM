function openTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll(".tab-content");
    tabContents.forEach(content => {
        content.classList.remove("active");
        content.style.display = "none";
    });

    // Remove 'active' class from all buttons
    const tabLinks = document.querySelectorAll(".tablink");
    tabLinks.forEach(button => button.classList.remove("active"));

    // Show the selected tab and mark button as active
    const selectedTab = document.getElementById(tabName);
    selectedTab.style.display = "flex";
    selectedTab.classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Initialize tabs on page load
document.addEventListener('DOMContentLoaded', () => {
    // Hide all tabs except the active one
    const tabContents = document.querySelectorAll(".tab-content:not(.active)");
    tabContents.forEach(content => {
        content.style.display = "none";
    });
});
