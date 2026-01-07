/* ===================================
   Add Child Profile JavaScript
   =================================== */

let selectedTemplate = null;
let uploadedAvatar = null;
let selectedGender = null;
let selectedAvatarUrl = null;
let templatesExpanded = false;
let recommendedTemplate = null;

// Age-appropriate realistic avatar images
const avatarImages = {
    boy: {
        young: [
            'assets/avatars/boy-young-1.png',
            'assets/avatars/boy-young-2.png'
        ],
        teen: [
            'assets/avatars/boy-teen-1.png',
            'assets/avatars/boy-teen-2.png'
        ]
    },
    girl: {
        young: [
            'assets/avatars/girl-young-1.png',
            'assets/avatars/girl-young-2.png'
        ],
        teen: [
            'assets/avatars/girl-teen-1.png',
            'assets/avatars/girl-teen-2.png'
        ]
    }
};

const AddChildHandlers = {
    /**
     * Initialize the page
     */
    init() {
        // Avatar upload handling
        document.getElementById('avatar-input').addEventListener('change', this.handleAvatarUpload);

        // Gender selection
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectGender(e.currentTarget));
        });

        // Template card selection with toggle
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const template = e.currentTarget.dataset.template;
                this.toggleTemplate(template, e.currentTarget);
            });
        });

        // Auto-update template and avatars based on age
        document.getElementById('child-age').addEventListener('input', this.handleAgeChange);
    },

    /**
     * Handle avatar photo upload
     */
    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarCircle = document.getElementById('avatar-circle');
                avatarCircle.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                uploadedAvatar = e.target.result;
                selectedAvatarUrl = null;
            };
            reader.readAsDataURL(file);
        }
    },

    /**
     * Select gender
     */
    selectGender(btn) {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedGender = btn.dataset.gender;

        // Update avatar suggestions
        this.updateAvatarSuggestions();
    },

    /**
     * Update avatar suggestions based on age and gender
     */
    updateAvatarSuggestions() {
        const age = parseInt(document.getElementById('child-age').value);

        if (!selectedGender || !age || age < 5 || age > 17) {
            document.getElementById('avatar-suggestions').classList.remove('show');
            document.getElementById('suggestions-label').classList.remove('show');
            return;
        }

        const ageGroup = age <= 9 ? 'young' : 'teen';
        const images = avatarImages[selectedGender][ageGroup];

        const container = document.getElementById('avatar-suggestions');
        container.innerHTML = '';

        images.forEach(imageUrl => {
            const btn = document.createElement('button');
            btn.className = 'avatar-suggestion';
            btn.innerHTML = `<img src="${imageUrl}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 14px;">`;
            btn.onclick = () => this.selectAvatarImage(imageUrl, btn);
            container.appendChild(btn);
        });

        container.classList.add('show');
        document.getElementById('suggestions-label').classList.add('show');
    },

    /**
     * Select avatar image
     */
    selectAvatarImage(imageUrl, btn) {
        // Clear previous selection
        document.querySelectorAll('.avatar-suggestion').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        selectedAvatarUrl = imageUrl;
        uploadedAvatar = null;

        // Update avatar circle
        const avatarCircle = document.getElementById('avatar-circle');
        avatarCircle.innerHTML = `<img src="${imageUrl}" alt="Avatar">`;
    },

    /**
     * Toggle template selection (click again to deselect)
     */
    toggleTemplate(template, card) {
        // If clicking the already selected template, deselect it
        if (selectedTemplate === template) {
            card.classList.remove('active');
            selectedTemplate = null;
            NotificationManager.show('Template deselected. You can set up controls manually later.', 'info');
        } else {
            // Remove previous selection
            document.querySelectorAll('.template-card').forEach(c => {
                c.classList.remove('active');
            });

            // Select new template
            card.classList.add('active');
            selectedTemplate = template;
        }
    },

    /**
     * Toggle showing all templates
     */
    toggleAllTemplates() {
        const btn = document.getElementById('expand-templates-btn');
        const allCards = document.querySelectorAll('.template-card');

        templatesExpanded = !templatesExpanded;

        if (templatesExpanded) {
            // Show all templates
            allCards.forEach(card => card.classList.remove('hidden'));
            btn.classList.add('expanded');
            btn.innerHTML = '<span class="material-symbols-outlined">expand_less</span> Show Less';
        } else {
            // Show only recommended
            allCards.forEach(card => {
                if (card.dataset.template !== recommendedTemplate) {
                    card.classList.add('hidden');
                }
            });
            btn.classList.remove('expanded');
            btn.innerHTML = '<span class="material-symbols-outlined">expand_more</span> See Other Templates';
        }
    },

    /**
     * Show template suggestions based on age
     */
    showTemplateSuggestions(age) {
        const templateSection = document.getElementById('template-section');

        if (age >= 5 && age <= 17) {
            templateSection.style.display = 'block';

            // Determine recommended template based on age
            if (age >= 5 && age <= 7) {
                recommendedTemplate = 'conservative';
            } else if (age >= 8 && age <= 12) {
                recommendedTemplate = 'moderate';
            } else if (age >= 13 && age <= 17) {
                recommendedTemplate = 'liberal';
            }

            // Reset expansion state
            templatesExpanded = false;
            const expandBtn = document.getElementById('expand-templates-btn');
            expandBtn.classList.remove('expanded');
            expandBtn.innerHTML = '<span class="material-symbols-outlined">expand_more</span> See Other Templates';

            // Show only recommended template, hide others
            document.querySelectorAll('.template-card').forEach(card => {
                const template = card.dataset.template;

                // Remove all recommended badges first
                const existingBadge = card.querySelector('.recommended-badge');
                if (existingBadge) {
                    existingBadge.remove();
                }
                card.classList.remove('recommended');

                if (template === recommendedTemplate) {
                    // Show and mark as recommended
                    card.classList.remove('hidden');
                    card.classList.add('recommended');

                    // Add recommended badge
                    const badge = document.createElement('div');
                    badge.className = 'recommended-badge';
                    badge.textContent = 'Recommended';
                    card.insertBefore(badge, card.firstChild);

                    // Auto-select if none selected
                    if (!selectedTemplate) {
                        card.classList.add('active');
                        selectedTemplate = recommendedTemplate;
                    }
                } else {
                    // Hide non-recommended
                    card.classList.add('hidden');
                }
            });
        } else {
            templateSection.style.display = 'none';
        }
    },

    /**
     * Handle age change - show template suggestions and update avatars
     */
    handleAgeChange() {
        const age = parseInt(document.getElementById('child-age').value);

        // Show template suggestions
        AddChildHandlers.showTemplateSuggestions(age);

        // Update avatar suggestions
        AddChildHandlers.updateAvatarSuggestions();
    },

    /**
     * Skip template selection
     */
    skipTemplate() {
        // Deselect all templates
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('active');
        });
        selectedTemplate = null;
        NotificationManager.show('You can set up controls manually later', 'info');
    },

    /**
     * Create child profile
     */
    createProfile() {
        const name = document.getElementById('child-name').value.trim();
        const age = document.getElementById('child-age').value;

        // Validation
        if (!name) {
            NotificationManager.show('Please enter child\'s name', 'warning');
            return;
        }

        if (!selectedGender) {
            NotificationManager.show('Please select gender', 'warning');
            return;
        }

        if (!age || age < 5 || age > 17) {
            NotificationManager.show('Please enter a valid age (5-17)', 'warning');
            return;
        }

        // Create profile data
        const profileData = {
            name: name,
            age: parseInt(age),
            gender: selectedGender,
            avatar: uploadedAvatar || selectedAvatarUrl,
            template: selectedTemplate,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        const existingProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
        existingProfiles.push(profileData);
        localStorage.setItem('childProfiles', JSON.stringify(existingProfiles));

        // Show success and redirect
        const templateMsg = selectedTemplate
            ? `with ${selectedTemplate} template`
            : 'without a template (set up manually later)';

        NotificationManager.show(`${name}'s profile created ${templateMsg}!`, 'success');

        setTimeout(() => {
            window.location.href = 'parent-dashboard.html';
        }, 1500);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    AddChildHandlers.init();
});
