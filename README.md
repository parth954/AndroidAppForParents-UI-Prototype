# Android Parental Control App - UI Prototype

A modern, intuitive parental control application for Android devices. This project is a complete UI prototype built with vanilla HTML, CSS, and JavaScript.

## 🌟 Features

### Core Functionality
- **Parent Dashboard**: Overview of all connected children with quick actions
- **Child Profiles**: Create and manage multiple child profiles with avatars
- **App Limits**: Set category-based time limits for applications
- **Schedules**: Create daily/weekly schedules with custom time ranges
- **Family Management**: Invite guardians and manage family members
- **Device Management**: Configure device as parent or child device
- **Settings**: Comprehensive settings with theme support

### UI/UX Highlights
- 🎨 Premium design with gradients and smooth animations
- 🌙 Dark mode support with automatic theme detection
- 📱 Mobile-first responsive design
- ✨ Micro-interactions and visual feedback
- 🎯 Age-appropriate avatar suggestions
- 🔔 Real-time notifications
- 🎭 Template-based control presets (Conservative, Moderate, Liberal)

## 📁 Project Structure

```
AndroidAppForParents-UI-Prototype/
├── index.html                 # Login/Landing page
├── css/                       # Stylesheets
│   ├── base.css              # Base styles and variables
│   ├── responsive.css        # Responsive breakpoints
│   ├── add-child.css         # Add child profile styles
│   ├── app-category-details.css
│   ├── app-limits.css
│   ├── child-details.css
│   ├── device-type-selection.css
│   ├── family-management.css
│   ├── family-modals.css
│   ├── family-setup.css
│   ├── monitor.css
│   ├── parent-dashboard.css
│   ├── parent-dashboard-bottom-nav.css
│   ├── profile.css
│   ├── schedules.css
│   ├── settings.css
│   ├── signup.css
│   └── time-picker.css
├── js/                        # JavaScript files
│   ├── theme.js              # Theme management
│   ├── notifications.js      # Notification system
│   ├── add-child.js
│   ├── app-category-details.js
│   ├── app-limits.js
│   ├── child-details.js
│   ├── device-type-selection.js
│   ├── family-management.js
│   ├── family-setup.js
│   ├── googleModal.js
│   ├── monitor.js
│   ├── parent-dashboard.js
│   ├── profile.js
│   ├── schedules.js
│   ├── settings.js
│   └── signup.js
├── components/                # Reusable components
│   ├── buttons.css
│   └── modal.css
├── assets/                    # Static assets
│   ├── avatars/              # 3D avatar images
│   └── images/               # Logos and illustrations
├── docs/                      # Documentation
│   └── mockups/              # Design mockups
├── *.html                     # Application pages
├── DESIGN_SYSTEM.md          # Design system documentation
├── LOCALIZATION.md           # Localization guide
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/AndroidAppForParents-UI-Prototype.git
cd AndroidAppForParents-UI-Prototype
```

2. Serve the project:

**Option 1: Python**
```bash
python3 -m http.server 8000
```

**Option 2: Node.js**
```bash
npx http-server
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

3. Open your browser and navigate to:
```
http://localhost:8000
```

## 📱 Pages Overview

### Authentication
- **index.html**: Login page with Google authentication
- **signup.html**: Sign up page

### Parent Flow
- **parent-dashboard.html**: Main dashboard with child overview
- **add-child.html**: Create child profile with avatar and template selection
- **child-details.html**: Individual child settings and quick actions
- **app-limits.html**: Category-based app time limits
- **app-category-details.html**: Detailed app category configuration
- **schedules.html**: Daily/weekly schedule management
- **family-management.html**: Family hub with guardian management
- **settings.html**: App settings and preferences

### Setup
- **device-type-selection.html**: Choose parent or child device
- **family-setup.html**: Initial family setup

## 🎨 Design System

The app follows a comprehensive design system with:
- **Colors**: Primary (Blue), Secondary (Purple), Success (Green), Warning (Yellow), Error (Red)
- **Typography**: Plus Jakarta Sans font family
- **Spacing**: 4px base unit system
- **Components**: Buttons, cards, modals, inputs, toggles
- **Animations**: Smooth transitions and micro-interactions

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete details.

## 🌍 Localization

The app is designed with localization in mind. See [LOCALIZATION.md](LOCALIZATION.md) for translation guidelines.

## 💾 Data Persistence

Currently uses `localStorage` for:
- Child profiles
- Schedule configurations
- App limits
- User preferences
- Theme selection

## 🌐 GitHub Pages Deployment

This project is configured for GitHub Pages:

1. Push to GitHub:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Enable GitHub Pages:
- Go to repository Settings → Pages
- Source: Deploy from branch `main`
- Folder: `/ (root)`
- Save

3. Access at: `https://YOUR_USERNAME.github.io/AndroidAppForParents-UI-Prototype/`

## 🛠️ Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, flexbox, grid
- **JavaScript (ES6+)**: Vanilla JS, no frameworks
- **Google Fonts**: Plus Jakarta Sans
- **Material Symbols**: Icon library

## 📝 Key Features Implementation

### Child Profile Creation
- Name and age input (5-17 years)
- Gender selection
- Age-appropriate 3D avatar suggestions
- Custom photo upload
- Template recommendation based on age
- Expandable template comparison

### Template System
- **Conservative** (5-7 years): Strict limits, 7:00 PM bedtime
- **Moderate** (8-12 years): Balanced approach, 9:00 PM bedtime
- **Liberal** (13-17 years): Minimal restrictions, 10:30 PM bedtime

### Schedule Management
- Interactive time picker with scroll selection
- Daily schedule configuration
- Active/inactive states
- Real-time sync with child details
- Integrated app limit configuration

### Family Management
- Invitation code generation
- Join request approval/rejection
- Guardian role management
- Clean modal-based UI

## 🤝 Contributing

This is a UI prototype project. Contributions for:
- UI/UX improvements
- Additional features
- Bug fixes
- Documentation

are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Parth Desai**

## 🙏 Acknowledgments

- Design inspired by modern mobile app patterns
- Material Symbols for icons
- Google Fonts for typography
- AI assistance for development

---

**Note**: This is a UI prototype. Backend functionality and actual Android integration are not included.
