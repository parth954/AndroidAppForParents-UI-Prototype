// ===================================
// Notification System
// ===================================
// 
// CURRENT SUPPORTED NOTIFICATION TYPES:
// - App requests (child requests to download apps)
// - Schedule alerts (bedtime, screen time limits)
// - Family invites (join family, guardian requests)
//
// NOT YET SUPPORTED (Post-MVP):
// - Real-time activity status ("Currently playing: Minecraft")
// - Complex activity tracking
// - Live game/app status notifications
//
// Future Enhancement Plan:
// TODO: When backend supports live activity tracking:
// - Add showLiveStatus(childName, activity, appName) method
// - Add notification types: 'app-request', 'schedule', 'family-invite', 'live-status'
// - Add priority levels for notification ordering
// - Add persistence layer for notification history
// ===================================

const NotificationManager = {
    show: function (message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';

        // Define styles based on type
        const isError = type === 'error';
        const iconColor = isError ? '#F87171' : '#4ADE80'; // Red vs Green
        const iconName = isError ? 'error' : 'check_circle';

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            color: #F8FAFC;
            padding: 12px 20px;
            border-radius: 100px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1);
            z-index: 10000;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.2px;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        `;

        // Add icon
        notification.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 18px; color: ${iconColor};">${iconName}</span>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
};

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Export for global use
window.NotificationManager = NotificationManager;
