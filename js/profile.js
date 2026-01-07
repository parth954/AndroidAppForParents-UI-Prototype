// ===================================
// Profile Screen Handlers
// ===================================
const ProfileHandlers = {
    selectedRole: 'mother', // Default selection

    /**
     * Select avatar
     */
    selectAvatar(role, event) {
        if (event) {
            event.preventDefault();
        }

        this.selectedRole = role;

        // Save to localStorage for dashboard
        localStorage.setItem('parentRole', role);

        // Update UI - remove selected class from all options
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected class to clicked option
        const selectedOption = document.querySelector(`.avatar-option[data-role="${role}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        console.log('Avatar selected:', role);
    },

    /**
     * Submit profile form
     */
    submit: function (event) {
        event.preventDefault();
        console.log('Profile form submitted');
        console.log('Selected role:', this.selectedRole);

        NotificationManager.show('Profile saved! Setting up your family...');

        // Navigate to family setup screen
        setTimeout(() => {
            window.location.href = 'family-setup.html';
        }, 1000);
    }
};

// Export for global use
window.ProfileHandlers = ProfileHandlers;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    console.log('Parental Control Prototype - Profile Screen');

    // Get email from URL parameter if available
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = email;
        }
    }
});
