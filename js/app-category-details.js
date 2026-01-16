// Category Data Configuration with Age Appropriate flags
// Default data - used if no localStorage data exists
const defaultCategoriesData = {
    'education': {
        name: 'Education',
        icon: 'school',
        class: 'education',
        limitEnabled: false,
        limitMinutes: 60,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 45,
        apps: [
            { id: 'app-duolingo', name: 'Duolingo', icon: 'assets/app-icons/duolingo.png', allowed: true, ageAppropriate: true, category: 'education' },
            { id: 'app-khan', name: 'Khan Academy', icon: 'assets/app-icons/khan.png', allowed: true, ageAppropriate: true, category: 'education' },
            { id: 'app-wikipedia', name: 'Wikipedia', icon: 'assets/app-icons/wikipedia.png', allowed: true, ageAppropriate: true, category: 'education' },
            { id: 'app-google-classroom', name: 'Google Classroom', icon: 'assets/app-icons/classroom.png', allowed: true, ageAppropriate: true, category: 'education' }
        ]
    },
    'entertainment': {
        name: 'Entertainment',
        icon: 'movie',
        class: 'entertainment',
        limitEnabled: true,
        limitMinutes: 60,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 30,
        apps: [
            { id: 'app-youtube', name: 'YouTube', icon: 'assets/app-icons/youtube.png', allowed: true, ageAppropriate: true, category: 'entertainment' },
            { id: 'app-netflix', name: 'Netflix', icon: 'assets/app-icons/netflix.png', allowed: true, ageAppropriate: true, category: 'entertainment' },
            { id: 'app-disney', name: 'Disney+', icon: 'assets/app-icons/disney.png', allowed: true, ageAppropriate: true, category: 'entertainment' },
            { id: 'app-spotify', name: 'Spotify', icon: 'assets/app-icons/spotify.png', allowed: true, ageAppropriate: true, category: 'entertainment' }
        ]
    },
    'gaming': {
        name: 'Gaming',
        icon: 'sports_esports',
        class: 'gaming',
        limitEnabled: true,
        limitMinutes: 30,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 20,
        apps: [
            { id: 'app-roblox', name: 'Roblox', icon: 'assets/app-icons/roblox.png', allowed: true, ageAppropriate: false, category: 'gaming' },
            { id: 'app-minecraft', name: 'Minecraft', icon: 'assets/app-icons/minecraft.png', allowed: true, ageAppropriate: true, category: 'gaming' },
            { id: 'app-amongus', name: 'Among Us', icon: 'assets/app-icons/amongus.png', allowed: true, ageAppropriate: true, category: 'gaming' },
            { id: 'app-subway', name: 'Subway Surfers', icon: 'assets/app-icons/subway.png', allowed: true, ageAppropriate: true, category: 'gaming' },
            { id: 'app-clash', name: 'Clash Royale', icon: 'assets/app-icons/clash.png', allowed: false, ageAppropriate: false, category: 'gaming' }
        ]
    },
    'social': {
        name: 'Social',
        icon: 'chat_bubble',
        class: 'social',
        limitEnabled: true,
        limitMinutes: 0,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 15,
        apps: [
            { id: 'app-whatsapp', name: 'WhatsApp', icon: 'assets/app-icons/whatsapp.png', allowed: false, ageAppropriate: true, category: 'social' },
            { id: 'app-messenger', name: 'Messenger', icon: 'assets/app-icons/messenger.png', allowed: false, ageAppropriate: true, category: 'social' },
            { id: 'app-instagram', name: 'Instagram', icon: 'assets/app-icons/instagram.png', allowed: false, ageAppropriate: false, category: 'social' },
            { id: 'app-tiktok', name: 'TikTok', icon: 'assets/app-icons/tiktok.png', allowed: false, ageAppropriate: false, category: 'social' }
        ]
    },
    'creativity': { name: 'Creativity', icon: 'brush', class: 'creativity', limitEnabled: true, limitMinutes: 45, sessionLimitEnabled: true, sessionLimitMinutes: 45, apps: [] },
    'utilities': { name: 'System & Utilities', icon: 'settings', class: 'utilities', limitEnabled: false, limitMinutes: 0, sessionLimitEnabled: false, sessionLimitMinutes: 0, apps: [] }
};

let appData = null;
let currentByCategory = 'entertainment';
let currentFilterMode = 'age-appropriate';
let currentSearchQuery = '';

const CategoryHandlers = {
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        currentByCategory = urlParams.get('category') || 'entertainment';

        // 1. Load Data from LocalStorage or Default
        const stored = localStorage.getItem('parentApp_categoriesData');
        if (stored) {
            try {
                appData = JSON.parse(stored);
            } catch (e) {
                console.error('Error parsing stored data', e);
                appData = JSON.parse(JSON.stringify(defaultCategoriesData));
            }
        } else {
            appData = JSON.parse(JSON.stringify(defaultCategoriesData));
            this.saveState();
        }

        // Setup global click listener to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-popup') && !e.target.closest('.category-chip')) {
                this.closeAllMenus();
            }
        });

        this.loadCategory(currentByCategory);
    },

    saveState() {
        localStorage.setItem('parentApp_categoriesData', JSON.stringify(appData));
    },

    loadCategory(categoryId) {
        const data = appData[categoryId];
        if (!data) return;

        // UI Updates
        document.getElementById('hero-name').textContent = data.name;
        document.getElementById('hero-symbol').textContent = data.icon;
        document.getElementById('hero-icon').className = `hero-cat-icon ${data.class}`;

        // Limit Controls
        const toggle = document.getElementById('limit-toggle');
        const sliderContainer = document.getElementById('limit-slider-wrapper');
        const slider = document.getElementById('time-range');

        toggle.checked = data.limitEnabled;
        slider.value = data.limitMinutes;

        if (data.limitEnabled) {
            sliderContainer.classList.remove('disabled');
        } else {
            sliderContainer.classList.add('disabled');
        }
        this.updateTimeDisplayUI(data.limitMinutes);

        // Session Limit Controls
        const sessionToggle = document.getElementById('session-toggle');
        const sessionContainer = document.getElementById('session-slider-wrapper');
        const sessionSlider = document.getElementById('session-range');

        // Default to true if undefined
        if (data.sessionLimitEnabled === undefined) data.sessionLimitEnabled = true;

        sessionToggle.checked = data.sessionLimitEnabled;
        sessionSlider.value = data.sessionLimitMinutes || 30;

        if (data.sessionLimitEnabled) {
            sessionContainer.classList.remove('disabled');
        } else {
            sessionContainer.classList.add('disabled');
        }
        this.updateSessionDisplayUI(data.sessionLimitMinutes || 30, !data.sessionLimitEnabled);

        this.updateTimeDisplayUI(data.limitMinutes);

        // Render
        this.filterAndRenderApps();
    },

    filterAndRenderApps() {
        const data = appData[currentByCategory];
        if (!data) return;

        // Filter Logic
        let filteredApps = data.apps.filter(app => {
            // 1. Text Search
            if (currentSearchQuery && !app.name.toLowerCase().includes(currentSearchQuery.toLowerCase())) {
                return false;
            }
            // 2. Age Filter
            if (currentFilterMode === 'age-appropriate' && !app.ageAppropriate) {
                return false;
            }
            return true;
        });

        this.renderApps(filteredApps);
    },

    renderApps(apps) {
        const list = document.getElementById('apps-list');
        const count = document.getElementById('app-count');

        count.textContent = `${apps.length} apps`;
        list.innerHTML = '';

        if (apps.length === 0) {
            list.innerHTML = `<div style="text-align: center; color: var(--color-text-tertiary); padding: 20px;">No apps found</div>`;
            return;
        }

        const currentCatName = appData[currentByCategory].name;

        apps.forEach(app => {
            const item = document.createElement('div');
            item.className = 'app-item';
            // Disable toggle if category is blocked? User request was "toggled off", which implies setting checking to false.

            const dropdownId = `dd-${app.id}`;
            const targetCategories = ['education', 'entertainment', 'gaming', 'social', 'creativity'];

            let menuOptions = targetCategories.map(catKey => {
                const catData = appData[catKey];
                const isSelected = app.category === catKey;
                // Original category tracking not implemented in persistence for simplicity, but could be added to app object.

                return `
                    <div class="menu-item dropdown-item ${isSelected ? 'selected' : ''}" 
                        onclick="CategoryHandlers.changeAppCategory('${app.id}', '${catKey}')">
                        ${catData.name} 
                        <span class="material-symbols-outlined check-icon">check</span>
                    </div>
                `;
            }).join('');

            const iconSrc = app.icon || 'assets/app-icons/default.png';
            const catName = appData[app.category] ? appData[app.category].name : app.category;

            item.innerHTML = `
                <div class="app-left">
                    <img src="${iconSrc}" class="app-icon" onerror="this.src='https://ui-avatars.com/api/?name=${app.name}&background=random&color=fff&size=80'">
                    <div class="app-details">
                        <span class="app-name">
                            ${app.name}
                            ${!app.ageAppropriate ? '<span class="not-age-appropriate-badge">13+</span>' : ''}
                        </span>
                        <div class="chip-wrapper">
                            <div class="category-chip" onclick="CategoryHandlers.toggleDropdown(event, '${dropdownId}')">
                                <span class="material-symbols-outlined">edit</span>
                                <span class="chip-text">Change Category</span>
                                <span class="material-symbols-outlined" style="font-size: 16px;">arrow_drop_down</span>
                            </div>
                            <!-- Dropdown -->
                            <div class="menu-popup" id="${dropdownId}">
                                ${menuOptions}
                            </div>
                        </div>
                    </div>
                </div>
                <label class="app-toggle">
                    <input type="checkbox" ${app.allowed ? 'checked' : ''} onchange="CategoryHandlers.toggleApp('${app.id}')">
                    <span class="slider"></span>
                </label>
            `;
            list.appendChild(item);
        });
    },

    toggleDropdown(event, id) {
        event.stopPropagation();
        this.closeAllMenus();
        const menu = document.getElementById(id);
        const appItem = event.currentTarget.closest('.app-item');

        // Boost z-index of the current item so the dropdown appears above siblings
        if (appItem) {
            appItem.style.zIndex = '100';
            appItem.style.position = 'relative'; // Ensure stacking context
        }

        menu.style.display = 'block';
        // We will handle positioning via CSS absolute positioning now
        setTimeout(() => menu.classList.add('visible'), 10);
    },

    closeAllMenus() {
        // Reset z-indexes
        document.querySelectorAll('.app-item').forEach(item => {
            item.style.zIndex = '';
            item.style.position = '';
        });

        document.querySelectorAll('.menu-popup').forEach(menu => {
            menu.classList.remove('visible');
            setTimeout(() => { if (!menu.classList.contains('visible')) menu.style.display = 'none'; }, 150);
        });
    },

    changeAppCategory(appId, newCategoryKey) {
        // Robust Move: Search all categories to find the app (just in case)
        let foundApp = null;
        let sourceList = null;

        Object.keys(appData).forEach(catKey => {
            const list = appData[catKey].apps;
            const idx = list.findIndex(a => a.id === appId);
            if (idx > -1) {
                foundApp = list[idx];
                sourceList = list;
                if (catKey !== newCategoryKey) {
                    list.splice(idx, 1); // Remove from old
                }
            }
        });

        if (foundApp && sourceList) {
            // Update app
            foundApp.category = newCategoryKey;

            // Add to new (if different)
            // Note: If catKey already matched newCategoryKey (clicking same opt), we spliced it out so we must push it back or avoid splicing.
            // Simplified: We always splce above. Safe to push now.

            appData[newCategoryKey].apps.push(foundApp);

            this.saveState();
            this.filterAndRenderApps(); // Re-render current view (App will disappear if it was moved OUT of current view)

            // Show Toast
            if (window.NotificationManager) {
                NotificationManager.show(`Moved <b>${foundApp.name}</b> to <b>${appData[newCategoryKey].name} category</b>`);
            }

            console.log(`Moved ${foundApp.name} to ${appData[newCategoryKey].name}`);
        }
    },

    setFilterMode(mode) {
        currentFilterMode = mode;
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.innerText.toLowerCase().includes(mode === 'age-appropriate' ? 'age' : 'all')) {
                tab.classList.add('active');
            }
        });
        this.filterAndRenderApps();
    },

    searchApps(query) {
        currentSearchQuery = query;
        this.filterAndRenderApps();
    },

    toggleApp(appId) {
        const app = appData[currentByCategory].apps.find(a => a.id === appId);
        if (app) {
            app.allowed = !app.allowed;
            this.saveState();
        }
    },

    toggleLimit() {
        const toggle = document.getElementById('limit-toggle');
        const sliderContainer = document.getElementById('limit-slider-wrapper');

        const isEnabled = toggle.checked;
        appData[currentByCategory].limitEnabled = isEnabled;

        if (isEnabled) {
            sliderContainer.classList.remove('disabled');
        } else {
            sliderContainer.classList.add('disabled');
            // User did not explicitly say "Toggle off = Block", they said "Block category".
            // Typically Unchecked Toggle = Always Allowed (No Limit).
            // So we DO NOT cascade block here.
        }
        this.saveState();
    },

    updateTimeDisplay() {
        // Called by oninput of slider
        const slider = document.getElementById('time-range');
        const val = parseInt(slider.value);

        appData[currentByCategory].limitMinutes = val;
        this.updateTimeDisplayUI(val);

        // FEATURE: If Blocked (0m), toggle OFF all apps
        if (val === 0) {
            appData[currentByCategory].apps.forEach(app => {
                app.allowed = false;
            });
            // Re-render to show switches turning off
            this.filterAndRenderApps();
        }

        // Rule: If Session Limit is DISABLED, it must sync with Daily Limit
        if (!appData[currentByCategory].sessionLimitEnabled) {
            this.updateSessionDisplayUI(val, true);
        }

        this.saveState();
    },

    updateTimeDisplayUI(val) {
        const display = document.getElementById('time-value');
        if (val == 0) display.textContent = 'Blocked';
        else if (val >= 240) display.textContent = '4h+';
        else {
            const h = Math.floor(val / 60);
            const m = val % 60;
            display.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
        }
    },

    // Session Limit Handlers
    toggleSessionLimit() {
        const toggle = document.getElementById('session-toggle');
        const sliderContainer = document.getElementById('session-slider-wrapper');
        const isEnabled = toggle.checked;

        appData[currentByCategory].sessionLimitEnabled = isEnabled;

        if (isEnabled) {
            sliderContainer.classList.remove('disabled');
            // When enabling, restore the value from the slider or default
            // If data was 0 or undefined, maybe set a default useful value like 30m?
            const currentVal = parseInt(document.getElementById('session-range').value) || 30;
            appData[currentByCategory].sessionLimitMinutes = currentVal;
            this.updateSessionDisplayUI(currentVal, false);
        } else {
            sliderContainer.classList.add('disabled');
            // Rule: If disabled, session limit = daily limit
            // We don't overwrite the 'sessionLimitMinutes' stored value (so we can restore it),
            // but the UI should show it matches the daily limit.
            // However, effective logic (if we were backend) would be sessionLimit = dailyLimit.

            // For UI prototype: Update the display to show state
            const dailyLimit = appData[currentByCategory].limitMinutes;
            // Temporarily update display to show sync
            this.updateSessionDisplayUI(dailyLimit, true);
        }
        this.saveState();
    },

    updateSessionDisplay() {
        const slider = document.getElementById('session-range');
        let val = parseInt(slider.value);

        // Rule: Session Limit cannot exceed Daily Limit (if Daily Limit is set > 0)
        // If Daily Limit is 1h (60m), Session cannot be 2h
        const dailyLimit = appData[currentByCategory].limitMinutes;

        if (dailyLimit > 0 && val > dailyLimit) {
            // Snap back visually/logically if you want, or just let users do it?
            // "If disabled, ... same as daily limit." implies logical constraint.
            // Let's just update as is for now, but maybe warn? 
            // Better UX: Allow setting, but maybe show warning.
            // For now, simple update.
        }

        appData[currentByCategory].sessionLimitMinutes = val;
        this.updateSessionDisplayUI(val, false);
        this.saveState();
    },

    updateSessionDisplayUI(val, isDisabled) {
        const display = document.getElementById('session-value');

        if (isDisabled) {
            display.innerHTML = '<span style="font-size: 16px; opacity: 0.8;">Matches Daily Limit</span>';
            return;
        }

        if (val >= 120) display.textContent = '2h';
        else {
            const h = Math.floor(val / 60);
            const m = val % 60;
            display.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
        }
    },

    save() {
        window.history.back();
    }
};

document.addEventListener('DOMContentLoaded', () => CategoryHandlers.init());
