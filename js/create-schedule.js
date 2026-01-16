const CreateScheduleHandlers = {
    selectedType: 'downtime',
    selectedDays: new Set(),

    init() {
        this.selectedDays.clear();

        // Default State
        this.selectType('downtime');
        this.selectDays('all');
        this.validateForm();

        // Hide delete button/spacer logic is static in HTML now (spacer exists, delete hidden)
        // No need for complex toggling
    },

    goBack() {
        window.history.back();
    },

    selectType(type) {
        // Case-insensitive selection
        const normalizedType = type.toLowerCase();
        this.selectedType = normalizedType;

        document.querySelectorAll('.type-card').forEach(card => card.classList.remove('selected'));
        const target = document.getElementById(`type-${normalizedType}`);
        if (target) target.classList.add('selected');

        const configSection = document.getElementById('downtime-config-section');
        if (configSection) {
            if (normalizedType === 'downtime') {
                configSection.classList.remove('hidden');
                configSection.style.display = 'block';
            } else {
                configSection.classList.add('hidden');
                configSection.style.display = 'none';
            }
        }
    },

    toggleDay(btn) {
        const day = btn.getAttribute('data-day');
        if (this.selectedDays.has(day)) {
            this.selectedDays.delete(day);
            btn.classList.remove('selected');
        } else {
            this.selectedDays.add(day);
            btn.classList.add('selected');
        }
        this.updateDaysText();
        this.validateForm();
    },

    selectDays(mode) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const weekends = ['Sat', 'Sun'];
        this.selectedDays.clear();
        let targetDays = [];
        if (mode === 'all') targetDays = days;
        if (mode === 'weekdays') targetDays = weekdays;
        if (mode === 'weekends') targetDays = weekends;
        targetDays.forEach(d => this.selectedDays.add(d));
        this.updateUIFromSet();
        this.validateForm();
    },

    updateUIFromSet() {
        document.querySelectorAll('.day-circle').forEach(btn => {
            if (this.selectedDays.has(btn.getAttribute('data-day'))) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        this.updateDaysText();
    },

    updateDaysText() {
        const textEl = document.getElementById('days-text');
        if (this.selectedDays.size === 0) {
            textEl.textContent = 'Select days above';
            return;
        }
        if (this.selectedDays.size === 7) {
            textEl.textContent = 'Every Day';
            return;
        }
        const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const current = Array.from(this.selectedDays).sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
        const isWeekdays = current.length === 5 && current.every(d => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(d));
        const isWeekends = current.length === 2 && current.every(d => ['Sat', 'Sun'].includes(d));
        if (isWeekdays) textEl.textContent = 'Weekdays';
        else if (isWeekends) textEl.textContent = 'Weekends';
        else textEl.textContent = current.join(', ');
    },

    validateForm() {
        const nameInput = document.getElementById('schedule-name');
        if (!nameInput) return;
        const name = nameInput.value.trim();
        const hasDays = this.selectedDays.size > 0;
        const btn = document.getElementById('save-btn');
        if (name && hasDays) btn.disabled = false;
        else btn.disabled = true;
    },

    configureApps() {
        // Create the schedule first
        const id = this.createSchedule(false);
        if (id) {
            const urlParams = new URLSearchParams(window.location.search);
            const childName = urlParams.get('child') || 'Child';
            // Navigate to App Config
            window.location.href = `app-config.html?schedule=${id}&child=${encodeURIComponent(childName)}&isNew=true`;
            // Note: User flow quirk - hitting back returns here.
        } else {
            alert('Please enter a schedule name and select days first.');
        }
    },

    save() {
        this.createSchedule(true);
    },

    createSchedule(navigateBack) {
        const name = document.getElementById('schedule-name').value.trim();
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;
        const daysText = document.getElementById('days-text').textContent;

        if (!name || this.selectedDays.size === 0) return null;

        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        const storageKey = `schedules_${childName}`;

        let schedules = JSON.parse(localStorage.getItem(storageKey) || '[]');

        const maxId = schedules.reduce((max, s) => Math.max(max, s.id), 4);
        const newId = maxId + 1;

        const newSchedule = {
            id: newId,
            title: name,
            days: daysText,
            type: this.selectedType,
            startTime: startTime,
            endTime: endTime,
            allowedAppsCount: 0,
            enabled: true,
            isActive: false
        };
        schedules.push(newSchedule);

        localStorage.setItem(storageKey, JSON.stringify(schedules));

        if (navigateBack) window.history.back();

        return newId;
    }
};

// Reused TimePicker
const TimePicker = {
    timeOptions: [],
    init() {
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
        startScroller.innerHTML = ''; endScroller.innerHTML = '';
        this.timeOptions.forEach(time => {
            const startOption = document.createElement('div');
            startOption.className = 'time-option'; startOption.textContent = time; startOption.dataset.time = time;
            startScroller.appendChild(startOption);
            const endOption = document.createElement('div');
            endOption.className = 'time-option'; endOption.textContent = time; endOption.dataset.time = time;
            endScroller.appendChild(endOption);
        });
    },
    scrollToTime(scroller, time) {
        const options = scroller.querySelectorAll('.time-option');
        const index = this.timeOptions.indexOf(time);
        if (index !== -1 && options[index]) {
            scroller.scrollTop = index * 40;
        }
    },
    getSelectedTime(scroller) {
        const index = Math.round(scroller.scrollTop / 40);
        return this.timeOptions[index] || this.timeOptions[0];
    },
    open() {
        const startVal = document.getElementById('start-time').value;
        const endVal = document.getElementById('end-time').value;
        const overlay = document.getElementById('time-picker-overlay');
        overlay.classList.add('visible');
        setTimeout(() => {
            this.scrollToTime(document.getElementById('start-time-scroller'), startVal);
            this.scrollToTime(document.getElementById('end-time-scroller'), endVal);
        }, 100);
    },
    close() { document.getElementById('time-picker-overlay').classList.remove('visible'); },
    save() {
        const start = this.getSelectedTime(document.getElementById('start-time-scroller'));
        const end = this.getSelectedTime(document.getElementById('end-time-scroller'));

        // Validation: Max 12 hours
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);
        const startMins = sh * 60 + sm;
        const endMins = eh * 60 + em;

        let duration = 0;
        if (endMins >= startMins) {
            duration = endMins - startMins;
        } else {
            // Overnight
            duration = (24 * 60 - startMins) + endMins;
        }

        if (duration > 720) { // 12 hours
            if (window.NotificationManager) {
                NotificationManager.show('Schedule duration cannot exceed 12 hours', 'error');
            } else {
                alert('Schedule duration cannot exceed 12 hours');
            }
            return;
        }

        document.getElementById('start-time').value = start;
        document.getElementById('end-time').value = end;
        if (document.getElementById('start-display')) document.getElementById('start-display').textContent = start;
        if (document.getElementById('end-display')) document.getElementById('end-display').textContent = end;
        this.close();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    CreateScheduleHandlers.init();
    TimePicker.init();
});
