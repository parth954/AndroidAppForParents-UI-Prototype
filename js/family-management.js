/* ===================================
   Family Management JavaScript
   =================================== */

// Mock data for join requests
let joinRequests = [
    {
        id: 1,
        name: "Parth Desai",
        email: "parthmanishdesai111@gmail.com",
        codeUsed: "300807"
    }
];

let currentInvitationCode = null;

const FamilyHandlers = {
    /**
     * Initialize family management screen
     */
    init() {
        console.log('Family Hub initialized');

        // Close modals when clicking overlay
        document.getElementById('invitation-modal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('invitation-modal-overlay')) {
                this.closeInvitationModal();
            }
        });

        document.getElementById('requests-modal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('requests-modal-overlay')) {
                this.closeRequestsModal();
            }
        });
    },

    /**
     * Show QR scanner for family code
     */
    showQRScanner() {
        NotificationManager.show('QR scanner coming soon!', 'info');
    },

    /**
     * Edit family information
     */
    editFamily() {
        NotificationManager.show('Edit family feature coming soon!', 'info');
    },

    /**
     * Invite a new guardian - Opens modal with invitation code
     */
    inviteGuardian() {
        // Generate new 6-digit code
        currentInvitationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Update modal display
        document.getElementById('modal-code-display').textContent = currentInvitationCode;

        // Show modal
        document.getElementById('invitation-modal').classList.add('active');
    },

    /**
     * Copy invitation code from modal
     */
    async copyModalCode() {
        if (!currentInvitationCode) return;

        try {
            await navigator.clipboard.writeText(currentInvitationCode);
            NotificationManager.show('Code copied to clipboard!', 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = currentInvitationCode;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            NotificationManager.show('Code copied to clipboard!', 'success');
        }
    },

    /**
     * Close invitation modal
     */
    closeInvitationModal() {
        document.getElementById('invitation-modal').classList.remove('active');
    },

    /**
     * Manage pending requests - Opens modal with requests list
     */
    manageRequests() {
        this.renderJoinRequests();
        document.getElementById('requests-modal').classList.add('active');
    },

    /**
     * Render join requests in modal
     */
    renderJoinRequests() {
        const container = document.getElementById('requests-list');
        if (!container) return;

        if (joinRequests.length === 0) {
            container.innerHTML = `
                <div class="no-requests">
                    <span class="material-symbols-outlined">inbox</span>
                    <p>No pending join requests</p>
                </div>
            `;
            return;
        }

        container.innerHTML = '';
        joinRequests.forEach(request => {
            const card = document.createElement('div');
            card.className = 'request-card';

            // Get initials for avatar
            const initials = request.name.split(' ').map(n => n[0]).join('').toUpperCase();

            card.innerHTML = `
                <div class="request-user">
                    <div class="request-avatar">${initials}</div>
                    <div class="request-details">
                        <h4>${request.name}</h4>
                        <p>${request.email}</p>
                    </div>
                </div>
                <div class="request-actions-inline">
                    <button class="request-btn-small btn-reject-small" onclick="FamilyHandlers.rejectJoinRequest(${request.id})">
                        <span class="material-symbols-outlined">close</span>
                        Reject
                    </button>
                    <button class="request-btn-small btn-approve-small" onclick="FamilyHandlers.approveJoinRequest(${request.id})">
                        <span class="material-symbols-outlined">check</span>
                        Approve
                    </button>
                </div>
            `;
            container.appendChild(card);
        });
    },

    /**
     * Approve a join request
     */
    approveJoinRequest(requestId) {
        const request = joinRequests.find(r => r.id === requestId);
        if (request) {
            joinRequests = joinRequests.filter(r => r.id !== requestId);
            this.renderJoinRequests();
            NotificationManager.show(`${request.name} has been added to your family!`, 'success');

            // Close modal if no more requests
            if (joinRequests.length === 0) {
                setTimeout(() => this.closeRequestsModal(), 1500);
            }
        }
    },

    /**
     * Reject a join request
     */
    rejectJoinRequest(requestId) {
        const request = joinRequests.find(r => r.id === requestId);
        if (request) {
            joinRequests = joinRequests.filter(r => r.id !== requestId);
            this.renderJoinRequests();
            NotificationManager.show(`Request from ${request.name} rejected`, 'info');

            // Close modal if no more requests
            if (joinRequests.length === 0) {
                setTimeout(() => this.closeRequestsModal(), 1500);
            }
        }
    },

    /**
     * Close requests modal
     */
    closeRequestsModal() {
        document.getElementById('requests-modal').classList.remove('active');
    },

    /**
     * Join an existing family
     */
    joinFamily() {
        NotificationManager.show('Join family feature coming soon!', 'info');
    },

    /**
     * Delete the family
     */
    deleteFamily() {
        const confirmed = confirm('Are you sure you want to delete this family? This action cannot be undone and will remove all child profiles and restrictions.');
        if (confirmed) {
            NotificationManager.show('Delete family feature coming soon!', 'warning');
        }
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    FamilyHandlers.init();
});
