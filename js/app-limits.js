// App Limits Handlers
const AppLimitHandlers = {
    scheduleContext: null,
    childContext: null,

    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        const scheduleId = urlParams.get('schedule'); // Check if in schedule context

        // Personalize Header
        const headerTitle = document.querySelector('.header-title');
        if (headerTitle) {
            if (scheduleId) {
                // Schedule context - show schedule name
                const scheduleNames = {
                    '1': 'Weekend Schedule',
                    '2': 'Weekday Schedule',
                    '3': 'Weekday Bedtime',
                    '4': 'Weekend Bedtime'
                };
                const scheduleName = scheduleNames[scheduleId] || 'Schedule';
                headerTitle.textContent = `${scheduleName} Limits`;
            } else {
                // Normal context
                headerTitle.textContent = `${childName}'s App Limits`;
            }
        }

        // Store context for later use
        this.scheduleContext = scheduleId;
        this.childContext = childName;
    },

    goBack() {
        const urlParams = new URLSearchParams(window.location.search);
        const scheduleId = urlParams.get('schedule');
        const childName = urlParams.get('child');

        // If in schedule context, go back to schedules screen
        if (scheduleId) {
            let targetUrl = 'schedules.html';
            if (childName) {
                targetUrl += `?child=${encodeURIComponent(childName)}`;
            }
            window.location.href = targetUrl;
        } else {
            // Normal context - go back to child details
            let targetUrl = 'child-details.html';
            if (childName) {
                targetUrl += `?child=${encodeURIComponent(childName)}`;
            }
            window.location.href = targetUrl;
        }
    },

    openCategory(categoryId) {
        console.log(`Open category: ${categoryId}`);

        // preserve child and schedule context
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        const scheduleId = urlParams.get('schedule');

        // Navigate to the category details page
        let targetUrl = `app-category-details.html?category=${categoryId}&child=${encodeURIComponent(childName)}`;
        if (scheduleId) {
            targetUrl += `&schedule=${scheduleId}`;
        }
        window.location.href = targetUrl;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    AppLimitHandlers.init();
});
