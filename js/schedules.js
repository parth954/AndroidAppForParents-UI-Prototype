// Schedules Data
const schedulesData = [
    {
        id: 1,
        title: 'Weekend Schedule',
        days: 'Weekends',
        type: 'downtime',
        startTime: '09:00',
        endTime: '20:00',
        allowedAppsCount: 0,
        enabled: false,
        isActive: false
    },
    {
        id: 2,
        title: 'Weekday Schedule',
        days: 'Weekdays',
        type: 'downtime',
        startTime: '16:00',
        endTime: '19:00',
        allowedAppsCount: 0,
        enabled: false,
        isActive: false
    },
    {
        id: 3,
        title: 'Weekday Bedtime',
        days: 'Weekdays',
        type: 'bedtime',
        startTime: '21:00',
        endTime: '06:30',
        allowedAppsCount: 0,
        enabled: true,
        isActive: true
    },
    {
        id: 4,
        title: 'Weekend Bedtime',
        days: 'Weekends',
        type: 'bedtime',
        startTime: '22:00',
        endTime: '07:00',
        allowedAppsCount: 0,
        enabled: true,
        isActive: false
    }
];

const ScheduleHandlers = {
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';

        const subtitle = document.getElementById('child-subtitle');
        if (subtitle) {
            subtitle.textContent = `for ${childName}`;
        }

        // Load schedules from localStorage if available
        this.loadSchedulesFromStorage(childName);

        this.renderSchedules();
    },

    loadSchedulesFromStorage(childName) {
        const stored = localStorage.getItem(`schedules_${childName}`);
        if (stored) {
            const savedSchedules = JSON.parse(stored);
            // Merge saved data with default data
            savedSchedules.forEach(saved => {
                const schedule = schedulesData.find(s => s.id === saved.id);
                if (schedule) {
                    Object.assign(schedule, saved);
                }
            });
        }
    },

    saveSchedulesToStorage() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        localStorage.setItem(`schedules_${childName}`, JSON.stringify(schedulesData));
    },

    goBack() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child');

        let targetUrl = 'child-details.html';
        if (childName) {
            targetUrl += `?child=${encodeURIComponent(childName)}`;
        }
        window.location.href = targetUrl;
    },

    renderSchedules() {
        const container = document.getElementById('schedule-list');
        const template = document.getElementById('schedule-card-template');

        container.innerHTML = '';

        schedulesData.forEach(schedule => {
            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.schedule-card');

            clone.querySelector('.schedule-title').textContent = schedule.title;
            clone.querySelector('.schedule-days').textContent = schedule.days;
            clone.querySelector('.time-text').textContent = `${schedule.startTime} - ${schedule.endTime}`;

            const timePill = clone.querySelector('.time-pill');
            timePill.onclick = () => TimePicker.open(schedule.id);
            timePill.style.cursor = 'pointer';

            const appsPill = clone.querySelector('.apps-pill');
            appsPill.onclick = () => {
                const urlParams = new URLSearchParams(window.location.search);
                const childName = urlParams.get('child');
                let targetUrl = `app-limits.html?schedule=${schedule.id}`;
                if (childName) {
                    targetUrl += `&child=${encodeURIComponent(childName)}`;
                }
                window.location.href = targetUrl;
            };
            appsPill.style.cursor = 'pointer';

            clone.querySelector('.apps-text').textContent = `Tap to configure`;

            card.classList.add(`type-${schedule.type}`);
            clone.querySelector('.type-badge').textContent = schedule.type;

            const iconSymbol = clone.querySelector('.icon-symbol');
            if (schedule.type === 'downtime') {
                iconSymbol.textContent = 'block';
            } else {
                iconSymbol.textContent = 'bedtime';
            }

            if (schedule.isActive) {
                card.classList.add('active-state');
                clone.querySelector('.status-badge').classList.remove('hidden');
            }

            const toggle = clone.querySelector('.schedule-toggle');
            toggle.checked = schedule.enabled;
            toggle.setAttribute('data-id', schedule.id);

            const statusText = clone.querySelector('.status-text');
            statusText.textContent = schedule.enabled ? 'Schedule Enabled' : 'Schedule Disabled';

            container.appendChild(clone);
        });
    },

    toggleSchedule(checkbox) {
        const id = parseInt(checkbox.getAttribute('data-id'));
        const schedule = schedulesData.find(s => s.id === id);

        if (schedule) {
            schedule.enabled = checkbox.checked;

            const card = checkbox.closest('.schedule-card');
            const statusText = card.querySelector('.status-text');
            statusText.textContent = schedule.enabled ? 'Schedule Enabled' : 'Schedule Disabled';

            if (!schedule.enabled && schedule.isActive) {
                schedule.isActive = false;
                card.classList.remove('active-state');
                card.querySelector('.status-badge').classList.add('hidden');
            } else if (schedule.enabled && schedule.id === 3) {
                schedule.isActive = true;
                card.classList.add('active-state');
                card.querySelector('.status-badge').classList.remove('hidden');
            }

            this.updateActiveStateInLocalStorage();
            this.saveSchedulesToStorage(); // Save changes to localStorage
        }
    },

    updateActiveStateInLocalStorage() {
        const activeSchedule = schedulesData.find(s => s.isActive && s.enabled);
        const childName = new URLSearchParams(window.location.search).get('child') || 'Leo';

        let storedData = JSON.parse(localStorage.getItem('child_data_overrides')) || {};
        if (!storedData[childName]) storedData[childName] = {};

        if (activeSchedule) {
            storedData[childName].activeSchedule = {
                name: activeSchedule.title,
                type: activeSchedule.type,
                endTime: activeSchedule.endTime // Include end time
            };
        } else {
            storedData[childName].activeSchedule = null;
        }

        localStorage.setItem('child_data_overrides', JSON.stringify(storedData));
    },

    addSchedule() {
        console.log('Add Schedule Clicked');
        alert('Add Schedule feature coming soon!');
    }
};

const TimePicker = {
    currentScheduleId: null,
    timeOptions: [],

    init() {
        // Generate time options (every 30 minutes)
        this.timeOptions = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour = h.toString().padStart(2, '0');
                const minute = m.toString().padStart(2, '0');
                this.timeOptions.push(`${hour}:${minute}`);
            }
        }

        this.populateScrollers();
    },

    populateScrollers() {
        const startScroller = document.getElementById('start-time-scroller');
        const endScroller = document.getElementById('end-time-scroller');

        if (!startScroller || !endScroller) return;

        startScroller.innerHTML = '';
        endScroller.innerHTML = '';

        this.timeOptions.forEach(time => {
            const startOption = document.createElement('div');
            startOption.className = 'time-option';
            startOption.textContent = time;
            startOption.dataset.time = time;
            startScroller.appendChild(startOption);

            const endOption = document.createElement('div');
            endOption.className = 'time-option';
            endOption.textContent = time;
            endOption.dataset.time = time;
            endScroller.appendChild(endOption);
        });
    },

    scrollToTime(scroller, time) {
        const options = scroller.querySelectorAll('.time-option');
        const index = this.timeOptions.indexOf(time);

        if (index !== -1 && options[index]) {
            // Scroll to center the selected time
            const optionHeight = 40;
            const scrollTop = index * optionHeight;
            scroller.scrollTop = scrollTop;
        }
    },

    getSelectedTime(scroller) {
        const scrollTop = scroller.scrollTop;
        const optionHeight = 40;
        const index = Math.round(scrollTop / optionHeight);
        return this.timeOptions[index] || this.timeOptions[0];
    },

    open(scheduleId) {
        this.currentScheduleId = scheduleId;
        const schedule = schedulesData.find(s => s.id === scheduleId);

        if (!schedule) return;

        document.getElementById('picker-schedule-name').textContent = `For ${schedule.title}`;

        const overlay = document.getElementById('time-picker-overlay');
        overlay.classList.add('visible');

        // Scroll to current times after modal is visible
        setTimeout(() => {
            const startScroller = document.getElementById('start-time-scroller');
            const endScroller = document.getElementById('end-time-scroller');
            this.scrollToTime(startScroller, schedule.startTime);
            this.scrollToTime(endScroller, schedule.endTime);
        }, 100);
    },

    close() {
        const overlay = document.getElementById('time-picker-overlay');
        overlay.classList.remove('visible');
        this.currentScheduleId = null;
    },

    save() {
        if (this.currentScheduleId) {
            const schedule = schedulesData.find(s => s.id === this.currentScheduleId);
            if (schedule) {
                const startScroller = document.getElementById('start-time-scroller');
                const endScroller = document.getElementById('end-time-scroller');

                schedule.startTime = this.getSelectedTime(startScroller);
                schedule.endTime = this.getSelectedTime(endScroller);

                ScheduleHandlers.saveSchedulesToStorage(); // Save changes to localStorage
                ScheduleHandlers.updateActiveStateInLocalStorage(); // Update active schedule info

                this.close();
                ScheduleHandlers.renderSchedules();
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ScheduleHandlers.init();
    TimePicker.init();
});
