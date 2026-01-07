/**
 * Device Type Selection Handlers
 * Manages parent/child device selection
 */

const DeviceTypeHandlers = {
    selectedType: null,

    /**
     * Select parent device
     */
    selectParent() {
        this.selectedType = 'parent';
        this.updateUI();
        this.enableContinue();
    },

    /**
     * Select child device
     */
    selectChild() {
        this.selectedType = 'child';
        this.updateUI();
        this.enableContinue();
    },

    /**
     * Update UI to reflect selection
     */
    updateUI() {
        const parentCard = document.getElementById('parentCard');
        const childCard = document.getElementById('childCard');

        // Remove selected class from both
        parentCard.classList.remove('selected');
        childCard.classList.remove('selected');

        // Add selected class to chosen card
        if (this.selectedType === 'parent') {
            parentCard.classList.add('selected');
        } else if (this.selectedType === 'child') {
            childCard.classList.add('selected');
        }
    },

    /**
     * Enable continue button
     */
    enableContinue() {
        const continueBtn = document.getElementById('continueBtn');
        continueBtn.disabled = false;
    },

    /**
     * Continue to next step
     */
    continue() {
        if (!this.selectedType) {
            NotificationManager.show('Please select a device type', 'warning');
            return;
        }

        // Store selection
        localStorage.setItem('deviceType', this.selectedType);

        // Navigate based on selection
        if (this.selectedType === 'parent') {
            // Navigate to parent dashboard
            window.location.href = 'parent-dashboard.html';
        } else if (this.selectedType === 'child') {
            // Navigate to child setup (TODO)
            NotificationManager.show('Child device setup coming soon!', 'info');
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a previously selected type
    const savedType = localStorage.getItem('deviceType');
    if (savedType) {
        DeviceTypeHandlers.selectedType = savedType;
        DeviceTypeHandlers.updateUI();
        DeviceTypeHandlers.enableContinue();
    }
});
