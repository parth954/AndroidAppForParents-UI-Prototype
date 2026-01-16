const EditScheduleHandlers = {
    selectedType: 'downtime',
    selectedDays: new Set(),
    scheduleId: null,

    init() {
        this.selectedDays.clear();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (!id) {
            console.error('No ID provided for edit');
            // Redirect back?
            return;
        }

        this.scheduleId = parseInt(id);

        // Setup UI
        document.querySelector('.header-title').textContent = 'Edit Schedule'; // Will be updated with name
        document.getElementById('save-btn').textContent = 'Save Changes';
        document.getElementById('delete-btn').classList.remove('hidden');
        const spacer = document.getElementById('header-spacer');
        if (spacer) spacer.style.display = 'none';

        this.loadScheduleData(this.scheduleId);
        this.validateForm();
    },

    loadScheduleData(id) {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        const storageKey = `schedules_${childName}`;
        const stored = localStorage.getItem(storageKey);

        let schedules = [];
        if (stored) schedules = JSON.parse(stored);

        const schedule = schedules.find(s => s.id === id);
        if (schedule) {
            document.querySelector('.header-title').textContent = `Edit ${schedule.title}`;
            document.getElementById('schedule-name').value = schedule.title;

            this.selectType(schedule.type || 'downtime');

            const dText = schedule.days;
            if (dText === 'Weekdays') this.selectDays('weekdays');
            else if (dText === 'Weekends') this.selectDays('weekends');
            else if (dText === 'Every Day') this.selectDays('all');
            else {
                // Try parsing or fallback to parsing specific days
                const days = dText.split(',').map(d => d.trim());
                if (days.length > 0 && days[0] !== '') {
                    this.selectedDays.clear();
                    days.forEach(d => this.selectedDays.add(d));
                    this.updateUIFromSet();
                } else {
                    // Check if generic text
                    if (dText.includes("Mon")) this.selectDays('weekdays'); // Fallback heuristic
                }
            }

            // Time
            const sTime = schedule.startTime || '09:00';
            const eTime = schedule.endTime || '17:00';
            document.getElementById('start-time').value = sTime;
            document.getElementById('end-time').value = eTime;

            const startDisplay = document.getElementById('start-display');
            const endDisplay = document.getElementById('end-display');
            if (startDisplay) startDisplay.textContent = sTime;
            if (endDisplay) endDisplay.textContent = eTime;
        }
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

    goBack() {
        window.history.back();
    },

    selectType(type) {
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
        this.saveData(false); // Save changes first
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        window.location.href = `app-config.html?schedule=${this.scheduleId}&child=${encodeURIComponent(childName)}&isNew=false`;
    },

    save() {
        this.saveData(true);
    },

    saveData(navigateBack) {
        const name = document.getElementById('schedule-name').value.trim();
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;
        const daysText = document.getElementById('days-text').textContent;

        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        const storageKey = `schedules_${childName}`;

        let schedules = JSON.parse(localStorage.getItem(storageKey) || '[]');

        const idx = schedules.findIndex(s => s.id === this.scheduleId);
        if (idx > -1) {
            schedules[idx].title = name;
            schedules[idx].days = daysText;
            schedules[idx].type = this.selectedType;
            schedules[idx].startTime = startTime;
            schedules[idx].endTime = endTime;
        }

        localStorage.setItem(storageKey, JSON.stringify(schedules));

        if (navigateBack) window.history.back();
    },

    deleteSchedule() {
        if (!confirm('Are you sure you want to delete this schedule?')) return;
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Child';
        const storageKey = `schedules_${childName}`;
        let schedules = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const idx = schedules.findIndex(s => s.id === this.scheduleId);
        if (idx > -1) {
            schedules.splice(idx, 1);
            localStorage.setItem(storageKey, JSON.stringify(schedules));
            window.history.back();
        }
    }
};

// Reused TimePicker (Can be extracted to shared file, but keeping inline for simplicity per current structure)
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
    EditScheduleHandlers.init();
    TimePicker.init();

    // Wire up events that were referencing CreateScheduleHandlers in HTML
    window.CreateScheduleHandlers = EditScheduleHandlers; // Hack/Shim to make HTML onclicks work without rewriting all HTML
});
