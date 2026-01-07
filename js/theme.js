// ===================================
// Theme Management Module
// ===================================
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const app = document.getElementById('app');

    if (isDarkMode) {
        app.classList.add('dark');
    } else {
        app.classList.remove('dark');
    }

    // Save preference
    localStorage.setItem('darkMode', isDarkMode);
}

function initializeTheme() {
    // Load saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        isDarkMode = true;
        document.getElementById('app').classList.add('dark');
    }
}

// Export for use in other modules
window.ThemeManager = {
    toggle: toggleTheme,
    initialize: initializeTheme
};
