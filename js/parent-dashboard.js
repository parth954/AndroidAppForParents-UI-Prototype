/**
 * Parent Dashboard Handlers
 * Manages parent dashboard interactions
 */

const ParentDashboardHandlers = {
    /**
     * Load parent profile from localStorage
     */
    loadParentProfile() {
        const parentRole = localStorage.getItem('parentRole') || 'mother';
        const parentName = 'Parth'; // Could be loaded from localStorage too

        // Avatar mapping
        const avatarMap = {
            'mother': 'assets/mother-avatar.png',
            'father': 'assets/father-avatar.png',
            'guardian': 'assets/guardian-avatar.png'
        };

        // Update avatar
        const avatarImage = document.getElementById('parentAvatarImage');
        if (avatarImage) {
            avatarImage.src = avatarMap[parentRole];
            avatarImage.alt = parentRole.charAt(0).toUpperCase() + parentRole.slice(1);
        }

        // Update greeting
        const greeting = document.getElementById('parentGreeting');
        if (greeting) {
            const hour = new Date().getHours();
            let timeOfDay = 'Good Morning';
            if (hour >= 12 && hour < 17) timeOfDay = 'Good Afternoon';
            else if (hour >= 17) timeOfDay = 'Good Evening';

            greeting.textContent = `${timeOfDay}, ${parentName}`;
        }

        console.log('Parent profile loaded:', parentRole);
    },

    /**
     * Navigate to Family Management
     */
    goToFamily() {
        window.location.href = 'family-management.html';
    },

    /**
     * Navigate to Settings
     */
    goToSettings() {
        window.location.href = 'settings.html';
    },

    /**
     * Show notifications
     */
    showNotifications() {
        NotificationManager.show('Notifications feature coming soon!', 'info');
    },

    /**
     * Edit rules for a child
     */
    editRules(childName) {
        window.location.href = `child-details.html?child=${encodeURIComponent(childName)}`;
    },

    /**
     * Monitor child activity
     */
    monitor(childName) {
        window.location.href = `monitor.html?child=${encodeURIComponent(childName)}`;
    },

    /**
     * Add a new child profile
     */
    addChild() {
        window.location.href = 'add-child.html';
    },

    /**
     * Show help/guided tour
     */
    showHelp() {
        NotificationManager.show('Guided tour coming soon!', 'info');
    },

    /**
     * Toggle dropdown menu for child card
     */
    toggleMenu(event, childName) {
        event.stopPropagation();

        const menu = document.getElementById(`menu-${childName}`);
        const allMenus = document.querySelectorAll('.menu-dropdown');

        // Close all other menus
        allMenus.forEach(m => {
            if (m !== menu) {
                m.classList.remove('active');
            }
        });

        // Toggle current menu
        menu.classList.toggle('active');

        // Close menu when clicking outside
        if (menu.classList.contains('active')) {
            setTimeout(() => {
                document.addEventListener('click', function closeMenu(e) {
                    if (!menu.contains(e.target) && !e.target.closest('.menu-button')) {
                        menu.classList.remove('active');
                        document.removeEventListener('click', closeMenu);
                    }
                });
            }, 0);
        }
    },

    /**
     * Delete child profile
     */
    deleteChild(childName) {
        // Close the menu first
        const menu = document.getElementById(`menu-${childName}`);
        if (menu) {
            menu.classList.remove('active');
        }

        // Show confirmation dialog
        const confirmed = confirm(`Are you sure you want to delete ${childName}'s profile? This action cannot be undone.`);

        if (confirmed) {
            // Remove child data from localStorage
            localStorage.removeItem(`schedules_${childName}`);

            const overrides = JSON.parse(localStorage.getItem('child_data_overrides')) || {};
            delete overrides[childName];
            localStorage.setItem('child_data_overrides', JSON.stringify(overrides));

            // Show success notification
            NotificationManager.show(`${childName}'s profile has been deleted`, 'success');

            // In a real app, you would remove the card from the DOM or reload
            console.log(`Deleted profile for ${childName}`);

            // Optionally reload the page to reflect changes
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    },

    /**
     * Switch between tabs
     */
    switchTab(tab, event) {
        // Prevent default link behavior
        if (event) {
            event.preventDefault();
        }

        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked nav item
        if (event && event.target.closest('.nav-item')) {
            event.target.closest('.nav-item').classList.add('active');
        }

        // Show notification for non-home tabs
        if (tab !== 'home') {
            const tabNames = {
                'family': 'Family Management',
                'settings': 'Settings'
            };
            NotificationManager.show(`${tabNames[tab]} coming soon!`, 'info');
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    ParentDashboardHandlers.loadParentProfile();
    console.log('Parental Control Prototype - Parent Dashboard');
});
