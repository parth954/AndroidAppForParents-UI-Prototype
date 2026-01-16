// App Configuration JS
const defaultCategoriesData = {
    'education': {
        name: 'Education', icon: 'school', class: 'education',
        apps: [
            { id: 'app-duolingo', name: 'Duolingo', icon: 'assets/app-icons/duolingo.png', ageAppropriate: true },
            { id: 'app-khan', name: 'Khan Academy', icon: 'assets/app-icons/khan.png', ageAppropriate: true },
            { id: 'app-wikipedia', name: 'Wikipedia', icon: 'assets/app-icons/wikipedia.png', ageAppropriate: true },
            { id: 'app-google-classroom', name: 'Google Classroom', icon: 'assets/app-icons/classroom.png', ageAppropriate: true }
        ]
    },
    'entertainment': {
        name: 'Entertainment', icon: 'movie', class: 'entertainment',
        apps: [
            { id: 'app-youtube', name: 'YouTube', icon: 'assets/app-icons/youtube.png', ageAppropriate: true },
            { id: 'app-netflix', name: 'Netflix', icon: 'assets/app-icons/netflix.png', ageAppropriate: true },
            { id: 'app-disney', name: 'Disney+', icon: 'assets/app-icons/disney.png', ageAppropriate: true },
            { id: 'app-spotify', name: 'Spotify', icon: 'assets/app-icons/spotify.png', ageAppropriate: true }
        ]
    },
    'gaming': {
        name: 'Gaming', icon: 'sports_esports', class: 'gaming',
        apps: [
            { id: 'app-roblox', name: 'Roblox', icon: 'assets/app-icons/roblox.png', ageAppropriate: false },
            { id: 'app-minecraft', name: 'Minecraft', icon: 'assets/app-icons/minecraft.png', ageAppropriate: true },
            { id: 'app-amongus', name: 'Among Us', icon: 'assets/app-icons/amongus.png', ageAppropriate: true },
            { id: 'app-subway', name: 'Subway Surfers', icon: 'assets/app-icons/subway.png', ageAppropriate: true },
            { id: 'app-clash', name: 'Clash Royale', icon: 'assets/app-icons/clash.png', ageAppropriate: false }
        ]
    },
    'social': {
        name: 'Social', icon: 'chat_bubble', class: 'social',
        apps: [
            { id: 'app-whatsapp', name: 'WhatsApp', icon: 'assets/app-icons/whatsapp.png', ageAppropriate: true },
            { id: 'app-messenger', name: 'Messenger', icon: 'assets/app-icons/messenger.png', ageAppropriate: true },
            { id: 'app-instagram', name: 'Instagram', icon: 'assets/app-icons/instagram.png', ageAppropriate: false },
            { id: 'app-tiktok', name: 'TikTok', icon: 'assets/app-icons/tiktok.png', ageAppropriate: false }
        ]
    }, // Add Essential/Communication manually for better UX if needed, but categorization logic is key.
    // The user requested tabs like app-limits. 
};

// Essential Apps (System) - Usually separate
const essentialApps = {
    name: 'Essential System Apps',
    icon: 'settings', class: 'system',
    apps: [
        { id: 'sys-phone', name: 'Phone', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-maps', name: 'Maps', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-camera', name: 'Camera', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-settings', name: 'Settings', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-clock', name: 'Clock', icon: 'assets/app-icons/default.png', ageAppropriate: true }
    ]
};

const AppConfig = {
    scheduleId: null,
    scheduleId: null,
    childName: null,
    allowedApps: new Set(), // Set of App IDs allowed for this schedule
    parentConfig: null, // Global parent configuration

    init() {
        // 1. Get Context
        const urlParams = new URLSearchParams(window.location.search);
        this.scheduleId = parseInt(urlParams.get('schedule'));
        this.childName = urlParams.get('child') || 'Child';

        if (!this.scheduleId) {
            console.error('No schedule ID provided');
            return;
        }

        // 2. Load Parent Global Config
        this.loadParentConfig();

        // 3. Load Data
        this.loadScheduleData();

        // 4. Render
        this.render();
    },

    loadParentConfig() {
        const stored = localStorage.getItem('parentApp_categoriesData');
        if (stored) {
            this.parentConfig = JSON.parse(stored);
        } else {
            // Fallback to default structure if no edits made yet
            console.log('AppConfig: No parent data found, initializing defaults.');
            this.parentConfig = JSON.parse(JSON.stringify(defaultCategoriesData));
            // Force save this default so other pages see it too
            localStorage.setItem('parentApp_categoriesData', JSON.stringify(this.parentConfig));
        }
    },

    loadScheduleData() {
        const key = `schedules_${this.childName}`;
        const stored = localStorage.getItem(key);
        const urlParams = new URLSearchParams(window.location.search);
        const isNew = urlParams.get('isNew') === 'true';

        if (stored) {
            const schedules = JSON.parse(stored);
            const schedule = schedules.find(s => s.id === this.scheduleId);
            if (schedule) {
                // Initialize Allowed Apps
                if (schedule.allowedApps && schedule.allowedApps.length > 0) {
                    this.allowedApps = new Set(schedule.allowedApps);
                } else {
                    // Start fresh
                    this.allowedApps = new Set();

                    if (isNew) {
                        // FEATURE: For NEW schedules, auto-select Age Appropriate apps by default
                        // This is a "Smart Default" to save parents time.
                        const sourceData = this.parentConfig || defaultCategoriesData;

                        // Add Essential apps first
                        essentialApps.apps.forEach(a => this.allowedApps.add(a.id));

                        // Iterate all categories
                        Object.values(sourceData).forEach(cat => {
                            cat.apps.forEach(app => {
                                // Logic: If Age Appropriate AND Globally Allowed (if checked), enable it.
                                // Note: We already filter viewing by global allowed, so we should check global allowed here or assume sourceData helps.
                                // parentConfig apps don't strictly hide 'allowed=false' apps in data structure, they just mark them allowed:false.
                                const isGloballyAllowed = app.allowed !== false;

                                if (app.ageAppropriate && isGloballyAllowed) {
                                    this.allowedApps.add(app.id);
                                }
                            });
                        });
                    } else {
                        // For EXISTING schedules with 0 apps, arguably they might want 0 apps blocked?
                        // Or maybe just defaults. Let's stick to Essential only to be safe, unless user requests otherwise.
                        // Essential apps are usually always needed.
                        essentialApps.apps.forEach(a => this.allowedApps.add(a.id));
                    }
                }
            }
        }
    },

    saveScheduleData() {
        const key = `schedules_${this.childName}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const schedules = JSON.parse(stored);
            const idx = schedules.findIndex(s => s.id === this.scheduleId);
            if (idx > -1) {
                schedules[idx].allowedApps = Array.from(this.allowedApps);
                schedules[idx].allowedAppsCount = this.allowedApps.size;
                localStorage.setItem(key, JSON.stringify(schedules));
            }
        }
    },



    render() {
        const container = document.getElementById('config-app-list');
        container.innerHTML = '';

        // Render Essential Apps first (Always open as it is first)
        this.renderCategoryCard(container, essentialApps, 'system', true);

        // Render Standard Categories (Collapsed by default)
        // Use Parent Config to drive the list, ensuring we have the latest categories/apps
        // If parentConfig is missing structure, fall back to defaultCategoriesData structure key iteration
        const sourceData = this.parentConfig || defaultCategoriesData;

        Object.entries(sourceData).forEach(([key, data]) => {
            this.renderCategoryCard(container, data, key, false);
        });
    },

    renderCategoryCard(container, data, type, isOpen = true) {
        // Filter Apps based on Parent's Global Config + Current Tab
        const filteredApps = data.apps.filter(app => {
            // CRITICAL REQUIREMENT: Only show apps enabled by parent globally
            // If parentConfig exists, check 'allowed' property.
            // Note: essentialApps structure is slightly different (no 'allowed' prop usually), assumption is they are always allowed or managed separately.
            // For standard categories:
            if (type !== 'system' && app.allowed === false) {
                return false;
            }



            return true;
        });

        if (filteredApps.length === 0) return; // Don't show empty cards

        const card = document.createElement('div');
        card.className = `card app-group-card ${isOpen ? 'expanded' : ''}`;
        card.style.marginBottom = '16px';

        // Calculate allowed count for this category
        const allowedCount = filteredApps.filter(a => this.allowedApps.has(a.id)).length;

        card.id = `card-${type}`;

        // Header Icon Color
        let iconBg = 'rgba(0,0,0,0.05)';
        let iconColor = '#666';
        if (type === 'entertainment') { iconBg = 'rgba(239, 68, 68, 0.1)'; iconColor = '#EF4444'; }
        if (type === 'gaming') { iconBg = 'rgba(245, 158, 11, 0.1)'; iconColor = '#F59E0B'; }
        if (type === 'social') { iconBg = 'rgba(59, 130, 246, 0.1)'; iconColor = '#3B82F6'; }
        if (type === 'education') { iconBg = 'rgba(16, 185, 129, 0.1)'; iconColor = '#10B981'; }

        const appListHtml = filteredApps.map(app => {
            const isAllowed = this.allowedApps.has(app.id);
            const iconSrc = app.icon || 'assets/app-icons/default.png';

            return `
                <div class="app-row">
                    <div class="app-icon-container">
                         <img src="${iconSrc}" class="app-icon" onerror="this.src='https://ui-avatars.com/api/?name=${app.name}&background=random&color=fff'">
                    </div>
                    <div class="app-details">
                        <span class="app-name">
                            ${app.name}
                            ${!app.ageAppropriate ? '<span style="font-size:10px; background:#eee; padding:2px 4px; border-radius:4px; margin-left:4px;">13+</span>' : ''}
                        </span>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${isAllowed ? 'checked' : ''} onchange="AppConfig.toggleApp('${app.id}')">
                        <span class="slider"></span>
                    </label>
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div class="group-header" onclick="AppConfig.toggleCategory('${type}')" style="cursor: pointer; display: flex; align-items: center;">
                <div class="icon-box" style="background: ${iconBg}; color: ${iconColor};">
                    <span class="material-symbols-outlined">${data.icon}</span>
                </div>
                <div class="group-info" style="flex: 1;">
                    <h3>${data.name}</h3>
                    <p>${allowedCount} of ${filteredApps.length} apps allowed</p>
                </div>
                 <span class="material-symbols-outlined expand-icon" id="icon-${type}" style="transition: transform 0.2s; color: var(--color-text-tertiary);">${isOpen ? 'expand_less' : 'expand_more'}</span>
            </div>
            <div class="app-list" id="list-${type}" style="display: ${isOpen ? 'block' : 'none'};">
                ${appListHtml}
            </div>
        `;

        container.appendChild(card);
    },

    toggleCategory(type) {
        const list = document.getElementById(`list-${type}`);
        const icon = document.getElementById(`icon-${type}`);

        if (list.style.display === 'none') {
            list.style.display = 'block';
            icon.textContent = 'expand_less';
        } else {
            list.style.display = 'none';
            icon.textContent = 'expand_more';
        }
    },

    toggleApp(appId) {
        if (this.allowedApps.has(appId)) {
            this.allowedApps.delete(appId);
        } else {
            this.allowedApps.add(appId);
        }

        this.saveScheduleData();
        this.render();
    },

    resetToDefaults() {
        if (!confirm('Reset allowed apps to "Age Appropriate" defaults?')) return;

        this.allowedApps.clear();
        const sourceData = this.parentConfig || defaultCategoriesData;

        // Add Essential apps
        essentialApps.apps.forEach(a => this.allowedApps.add(a.id));

        // Add Age Appropriate & Globally Allowed
        Object.values(sourceData).forEach(cat => {
            cat.apps.forEach(app => {
                const isGloballyAllowed = app.allowed !== false;
                if (app.ageAppropriate && isGloballyAllowed) {
                    this.allowedApps.add(app.id);
                }
            });
        });

        this.saveScheduleData();
        this.render();

        // Visual feedback
        const btn = document.querySelector('.refresh-btn span');
        btn.style.transition = 'transform 0.5s';
        btn.style.transform = 'rotate(-360deg)';
        setTimeout(() => btn.style.transform = '', 500);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AppConfig.init();
});
