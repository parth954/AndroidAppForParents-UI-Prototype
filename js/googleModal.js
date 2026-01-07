// ===================================
// Google Account Selection Modal
// ===================================
const GoogleModal = {
    open: function () {
        const modal = document.getElementById('googleModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close: function (event) {
        // Only close if clicking overlay or close button
        if (event && event.target.id !== 'googleModal') return;

        const modal = document.getElementById('googleModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    },

    selectAccount: function (email) {
        console.log('Selected account:', email);
        this.close();

        // Show success notification
        NotificationManager.show(`Signing in as ${email}...`);

        // Simulate sign-in process and navigate to profile
        setTimeout(() => {
            NotificationManager.show('✓ Successfully signed in!');

            // Navigate to profile screen after short delay
            setTimeout(() => {
                window.location.href = `profile.html?email=${encodeURIComponent(email)}`;
            }, 800);
        }, 1000);
    },

    useAnother: function () {
        console.log('Use another account clicked');
        this.close();
        NotificationManager.show('Email/password form would appear here');
        // In production: Show email/password input form
    }
};

// Export for global use
window.GoogleModal = GoogleModal;
