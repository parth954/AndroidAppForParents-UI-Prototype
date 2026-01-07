// Category Data Configuration
const categoriesData = {
    'education': {
        name: 'Education',
        icon: 'school',
        class: 'education',
        limitEnabled: false,
        limitMinutes: 60,
        apps: [
            { name: 'Duolingo', icon: 'assets/app-icons/duolingo.png', allowed: true },
            { name: 'Khan Academy', icon: 'assets/app-icons/khan.png', allowed: true },
            { name: 'Wikipedia', icon: 'assets/app-icons/wikipedia.png', allowed: true },
            { name: 'Google Classroom', icon: 'assets/app-icons/classroom.png', allowed: true }
        ]
    },
    'entertainment': {
        name: 'Entertainment',
        icon: 'movie',
        class: 'entertainment',
        limitEnabled: true,
        limitMinutes: 60,
        apps: [
            { name: 'YouTube', icon: 'assets/app-icons/youtube.png', allowed: true },
            { name: 'Netflix', icon: 'assets/app-icons/netflix.png', allowed: true },
            { name: 'Disney+', icon: 'assets/app-icons/disney.png', allowed: true },
            { name: 'Spotify', icon: 'assets/app-icons/spotify.png', allowed: true }
        ]
    },
    'gaming': {
        name: 'Gaming',
        icon: 'sports_esports',
        class: 'gaming',
        limitEnabled: true,
        limitMinutes: 30,
        apps: [
            { name: 'Roblox', icon: 'assets/app-icons/roblox.png', allowed: true },
            { name: 'Minecraft', icon: 'assets/app-icons/minecraft.png', allowed: true },
            { name: 'Among Us', icon: 'assets/app-icons/amongus.png', allowed: true },
            { name: 'Subway Surfers', icon: 'assets/app-icons/subway.png', allowed: true },
            { name: 'Clash Royale', icon: 'assets/app-icons/clash.png', allowed: false } // Blocked example
        ]
    },
    'social': {
        name: 'Social',
        icon: 'chat_bubble',
        class: 'social',
        limitEnabled: true,
        limitMinutes: 0, // Blocked effectively if 0
        apps: [
            { name: 'WhatsApp', icon: 'assets/app-icons/whatsapp.png', allowed: false },
            { name: 'Messenger', icon: 'assets/app-icons/messenger.png', allowed: false },
            { name: 'Instagram', icon: 'assets/app-icons/instagram.png', allowed: false }
        ]
    },
    'creativity': {
        name: 'Creativity',
        icon: 'brush',
        class: 'creativity',
        limitEnabled: true,
        limitMinutes: 45,
        apps: [
            { name: 'Photos', icon: 'assets/app-icons/photos.png', allowed: true },
            { name: 'Canva', icon: 'assets/app-icons/canva.png', allowed: true },
            { name: 'Sketchbook', icon: 'assets/app-icons/sketchbook.png', allowed: true }
        ]
    },
    'utilities': {
        name: 'System & Utilities',
        icon: 'settings',
        class: 'utilities',
        limitEnabled: false,
        limitMinutes: 0,
        apps: [
            { name: 'Settings', icon: 'assets/app-icons/settings.png', allowed: true },
            { name: 'Calculator', icon: 'assets/app-icons/calculator.png', allowed: true },
            { name: 'Clock', icon: 'assets/app-icons/clock.png', allowed: true },
            { name: 'Maps', icon: 'assets/app-icons/maps.png', allowed: true },
            { name: 'Weather', icon: 'assets/app-icons/weather.png', allowed: true },
            { name: 'Notes', icon: 'assets/app-icons/notes.png', allowed: true },
            { name: 'Calendar', icon: 'assets/app-icons/calendar.png', allowed: true },
            { name: 'Files', icon: 'assets/app-icons/files.png', allowed: true }
        ]
    }
};

let currentCategoryData = null;

const CategoryHandlers = {
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category') || 'entertainment';

        this.loadCategory(categoryId);
    },

    loadCategory(categoryId) {
        currentCategoryData = categoriesData[categoryId];
        if (!currentCategoryData) return;

        // Update Header & Hero
        // document.getElementById('page-title').textContent = currentCategoryData.name; // Keep generic title or specific? Design usually keeps generic "Category Settings"
        document.getElementById('hero-name').textContent = currentCategoryData.name;
        document.getElementById('hero-symbol').textContent = currentCategoryData.icon;

        const heroIcon = document.getElementById('hero-icon');
        heroIcon.className = `hero-cat-icon ${currentCategoryData.class}`;

        // Update Limit Controls
        const toggle = document.getElementById('limit-toggle');
        const sliderContainer = document.getElementById('limit-slider-wrapper');
        const slider = document.getElementById('time-range');

        toggle.checked = currentCategoryData.limitEnabled;
        slider.value = currentCategoryData.limitMinutes;

        if (currentCategoryData.limitEnabled) {
            sliderContainer.classList.remove('disabled');
        } else {
            sliderContainer.classList.add('disabled');
        }

        this.updateTimeDisplay(currentCategoryData.limitMinutes);

        // Update Session Controls
        const sessionToggle = document.getElementById('session-toggle');
        const sessionContainer = document.getElementById('session-slider-wrapper');
        const sessionSlider = document.getElementById('session-range');

        // Default session values if not in data (using mock defaults)
        const sessionEnabled = currentCategoryData.sessionEnabled !== undefined ? currentCategoryData.sessionEnabled : false;
        const sessionMinutes = currentCategoryData.sessionMinutes || 45;

        sessionToggle.checked = sessionEnabled;
        sessionSlider.value = sessionMinutes;

        if (sessionEnabled) {
            sessionContainer.classList.remove('disabled');
        } else {
            sessionContainer.classList.add('disabled');
        }

        this.updateSessionDisplay(sessionMinutes);

        // Populate Apps
        this.renderApps(currentCategoryData.apps);
    },

    toggleLimit() {
        const toggle = document.getElementById('limit-toggle');
        const sliderContainer = document.getElementById('limit-slider-wrapper');

        if (toggle.checked) {
            sliderContainer.classList.remove('disabled');
        } else {
            sliderContainer.classList.add('disabled');
        }
    },

    toggleSessionLimit() {
        const toggle = document.getElementById('session-toggle');
        const sliderContainer = document.getElementById('session-slider-wrapper');

        if (toggle.checked) {
            sliderContainer.classList.remove('disabled');
        } else {
            sliderContainer.classList.add('disabled');
        }
    },

    updateTimeDisplay(val) {
        const value = val !== undefined ? val : document.getElementById('time-range').value;
        const display = document.getElementById('time-value');

        // Update session slider max to match daily limit (or cap at 120m for UI consistency if daily is huge)
        const sessionSlider = document.getElementById('session-range');
        const dailyValue = parseInt(value);

        // If daily limit blocks usage (0), disable session slider or set to 0
        if (dailyValue === 0) {
            sessionSlider.value = 0;
            sessionSlider.disabled = true;
            this.updateSessionDisplay(0);
        } else {
            sessionSlider.disabled = false;

            // Set max of session slider to daily limit (but maybe keep a reasonable floor like 15m)
            // If daily limit is 15m, max is 15m.
            // If daily limit is 300m, maybe we still cap session slider at 120m visually? 
            // The user asked for "max time and all" to update. 
            // Let's set max to Math.min(dailyValue, 240) so it scales with daily limit.

            const newMax = Math.max(15, dailyValue);
            sessionSlider.setAttribute('max', newMax);

            // Update labels
            const rangeLabels = document.querySelector('#session-slider-wrapper .range-labels');
            if (rangeLabels) {
                const maxLabel = rangeLabels.querySelectorAll('span')[1];
                if (maxLabel) {
                    const hours = Math.floor(newMax / 60);
                    const minutes = newMax % 60;
                    if (hours > 0) {
                        maxLabel.textContent = `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
                    } else {
                        maxLabel.textContent = `${minutes}m`;
                    }
                }
            }

            // Clamp current value
            if (parseInt(sessionSlider.value) > dailyValue) {
                sessionSlider.value = dailyValue;
            }
            // If value was 0 but we have time now, reset to default 15 or something? 
            // No, logic below handles display update.

            this.updateSessionDisplay(sessionSlider.value);
        }

        if (value == 0) {
            display.textContent = 'Blocked';
        } else if (value >= 240) { // Max value assumption
            display.textContent = '4h+';
        } else {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            if (hours > 0) {
                display.textContent = `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
            } else {
                display.textContent = `${minutes}m`;
            }
        }
    },

    updateSessionDisplay(val) {
        const value = val !== undefined ? val : document.getElementById('session-range').value;
        const display = document.getElementById('session-value');
        const dailyValue = parseInt(document.getElementById('time-range').value);

        // Ensure session doesn't exceed daily limit (if daily is active/non-zero)
        if (dailyValue > 0 && parseInt(value) > dailyValue) {
            // Revert slider visually if user tries to drag past daily limit
            document.getElementById('session-range').value = dailyValue;
            this.updateSessionDisplay(dailyValue); // Recursive call but safely capped
            return;
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        if (hours > 0) {
            display.textContent = `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
        } else {
            display.textContent = `${minutes}m`;
        }
    },

    renderApps(apps) {
        const list = document.getElementById('apps-list');
        const count = document.getElementById('app-count');

        count.textContent = `${apps.length} apps`;
        list.innerHTML = '';

        apps.forEach(app => {
            const item = document.createElement('div');
            item.className = 'app-item';
            // Placeholder icon if generic asset not found
            const iconSrc = app.icon || 'assets/app-icons/default.png';

            item.innerHTML = `
                <div class="app-info">
                    <img src="${iconSrc}" class="app-icon" onerror="this.src='https://ui-avatars.com/api/?name=${app.name}&background=random&color=fff&size=80'">
                    <span class="app-name">${app.name}</span>
                </div>
                <label class="app-toggle">
                    <input type="checkbox" ${app.allowed ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            `;
            list.appendChild(item);
        });
    },

    searchApps(query) {
        if (!currentCategoryData) return;
        const lowerQuery = query.toLowerCase();
        const filtered = currentCategoryData.apps.filter(app =>
            app.name.toLowerCase().includes(lowerQuery)
        );
        this.renderApps(filtered);
    },

    save() {
        // Navigate back to app limits screen, preserving child and schedule context
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child');
        const scheduleId = urlParams.get('schedule');

        let targetUrl = 'app-limits.html';
        if (scheduleId) {
            targetUrl += `?schedule=${scheduleId}`;
            if (childName) {
                targetUrl += `&child=${encodeURIComponent(childName)}`;
            }
        } else if (childName) {
            targetUrl += `?child=${encodeURIComponent(childName)}`;
        }

        window.location.href = targetUrl;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => CategoryHandlers.init());
