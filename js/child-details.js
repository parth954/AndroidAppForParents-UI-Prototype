// Child Details Handlers
const ChildHandlers = {
    // Avatar
    editAvatar() {
        console.log('Edit avatar clicked');
        // TODO: Show avatar selection dialog
    },

    // More Menu
    showMore() {
        console.log('More menu clicked');
        // TODO: Show options menu
    },

    // Lend My Device
    lendDevice() {
        console.log('Lend device clicked');
        // TODO: Show modal with time options (30min, 1hr, 2hr, custom)
        NotificationManager.show('Lend Device feature coming soon!', 'info');
    },

    // Screen Time
    manageLimits() {
        console.log('Manage limits clicked');
        // Navigate to app limits screen with child name
        const childName = getChildName();
        window.location.href = `app-limits.html?child=${encodeURIComponent(childName)}`;
    },

    manageSchedules() {
        console.log('Manage schedules clicked');
        // Navigate to schedules screen
        const childName = getChildName();
        window.location.href = `schedules.html?child=${encodeURIComponent(childName)}`;
    },

    viewStats() {
        console.log('View stats clicked');
        const childName = getChildName();
        window.location.href = `monitor.html?child=${encodeURIComponent(childName)}`;
    },

    manageApps() {
        console.log('Manage apps clicked');
        // TODO: Navigate to app management
    },

    // Settings
    locations() {
        console.log('Locations clicked');
        // TODO: Navigate to location settings
    },

    contentFilters() {
        console.log('Content filters clicked');
        // TODO: Navigate to content filter settings
    },

    deviceSettings() {
        console.log('Device settings clicked');
        // TODO: Navigate to device settings
    },

    // Help
    showHelp() {
        console.log('Help clicked');
        // TODO: Show help overlay or guided tour
        NotificationManager.show('Help guide coming soon!', 'info');
    }
};

// Child data configuration
const childrenData = {
    'Leo': {
        avatar: 'assets/child-leo.png',
        device: 'iPhone 14',
        age: 8,
        status: 'active',
        screenTime: {
            used: '1h 45m',
            limit: '2h 30m',
            remaining: '45m',
            percentage: 70
        },
        schedule: {
            active: true,
            name: 'Weekday Bedtime',
            override: 'Overriding app limits until 06:30 AM'
        }
    },
    'Mia': {
        avatar: 'assets/child-mia.png',
        device: 'iPad Air',
        age: 5,
        status: 'idle',
        screenTime: {
            used: '45m',
            limit: '1h 30m',
            remaining: '45m',
            percentage: 50
        },
        schedule: {
            active: false,
            name: 'No active schedule',
            override: ''
        }
    }
};

// Get child name from URL
function getChildName() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('child') || 'Leo';
}

// Load child-specific data
function loadChildData() {
    const childName = getChildName();
    const data = childrenData[childName];

    if (!data) {
        console.error('Child not found:', childName);
        return;
    }

    // Update page title
    document.querySelector('.page-title').textContent = childName;

    // Update avatar
    const avatarImg = document.querySelector('.child-avatar-large img');
    if (avatarImg) {
        avatarImg.src = data.avatar;
        avatarImg.alt = childName;
    }

    // Update child info
    document.querySelector('.child-name-large').textContent = childName;
    document.querySelector('.device-info').textContent = `${data.device} • Age ${data.age}`;

    // Update status
    const statusChip = document.querySelector('.status-chip');
    const statusRing = document.querySelector('.status-ring');
    if (data.status === 'active') {
        statusChip.classList.add('active');
        statusChip.innerHTML = '<span class="pulse-dot"></span><span>Active Now</span>';
        statusRing.classList.add('active');
    } else {
        statusChip.classList.remove('active');
        statusChip.classList.add('idle');
        statusChip.innerHTML = '<span class="idle-dot"></span><span>Idle</span>';
        statusRing.classList.remove('active');
    }

    // Update schedule alert
    // Check overrides first
    const overrides = JSON.parse(localStorage.getItem('child_data_overrides')) || {};
    const childOverrides = overrides[childName];

    let activeSchedule = null;
    if (childOverrides && childOverrides.activeSchedule) {
        // Get end time from override (now includes endTime)
        const endTime = childOverrides.activeSchedule.endTime || '06:30';

        // Construct active schedule object from override
        activeSchedule = {
            name: childOverrides.activeSchedule.name,
            override: `Overriding app limits until ${endTime}`,
            active: true
        };
    } else {
        // Use default data
        activeSchedule = data.schedule;
    }

    const scheduleAlert = document.querySelector('.schedule-alert');
    if (activeSchedule && activeSchedule.active) {
        scheduleAlert.style.display = 'flex';
        scheduleAlert.querySelector('.alert-title').textContent = `${activeSchedule.name} Active`;
        scheduleAlert.querySelector('.alert-desc').textContent = activeSchedule.override;

        // Ensure status reflects active schedule
        statusChip.classList.add('active');
        statusChip.innerHTML = '<span class="pulse-dot"></span><span>Active Now</span>';
        statusRing.classList.add('active');
    } else {
        scheduleAlert.style.display = 'none';
    }

    // Update screen time
    document.querySelector('.time-badge').textContent = `${data.screenTime.limit} limit`;
    const statValues = document.querySelectorAll('.stat-value');
    statValues[0].textContent = data.screenTime.used;
    statValues[1].textContent = data.screenTime.remaining;

    const progressFill = document.querySelector('.progress-fill-elegant');
    progressFill.style.width = `${data.screenTime.percentage}%`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadChildData);
