/* ===================================
   Monitor Screen JavaScript - Simplified
   =================================== */

const MonitorHandlers = {
    currentChild: null,

    /**
     * Initialize monitor screen
     */
    init() {
        this.loadChildData();
        this.animateCategoryBars();
        console.log('Monitor screen initialized');
    },

    /**
     * Load child-specific data from URL parameter
     */
    loadChildData() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Leo';
        this.currentChild = childName;

        // Update header with child name
        const childNameElement = document.querySelector('.child-name');
        if (childNameElement) {
            childNameElement.textContent = `${childName}'s Activity`;
        }

        // Update avatar if different child
        const avatarImg = document.querySelector('.child-avatar-img');
        if (avatarImg && childName === 'Mia') {
            avatarImg.src = 'assets/child-mia.png';
            avatarImg.alt = 'Mia';
        }

        console.log(`Loaded data for ${childName}`);
    },

    /**
     * Animate category bars on load
     */
    animateCategoryBars() {
        const categoryFills = document.querySelectorAll('.category-fill');
        categoryFills.forEach((fill, index) => {
            const targetWidth = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 300 + (index * 150));
        });
    },

    /**
     * Navigate to previous day
     */
    previousDay() {
        NotificationManager.show('Previous day data coming soon!', 'info');
        // TODO: Load previous day's data
    },

    /**
     * Navigate to next day
     */
    nextDay() {
        NotificationManager.show('Next day data coming soon!', 'info');
        // TODO: Load next day's data
    },

    /**
     * Open date picker to select specific date
     */
    openDatePicker() {
        NotificationManager.show('Date picker coming soon!', 'info');
        // TODO: Open calendar modal to select any date
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    MonitorHandlers.init();
});
