# Localization System - Parental Control App

> **Purpose**: This document defines the localization architecture for the UI prototype, ensuring all user-facing strings are centralized and ready for multi-language support.

## Design Principles

### 1. Centralization
All string literals must be extracted to a central location. No hardcoded strings in UI components.

### 2. Type Safety
Use strongly-typed string resources to catch missing translations at compile time.

### 3. Context Awareness
Strings should include context for translators (comments, descriptions, character limits).

### 4. Pluralization Support
Handle singular/plural forms correctly for different languages.

### 5. Parameter Substitution
Support dynamic content insertion (names, numbers, dates).

---

## Architecture

### String Resource Structure

```
src/
└── commonMain/
    └── kotlin/
        └── resources/
            └── strings/
                ├── Strings.kt              // String resource interface
                ├── StringsEn.kt            // English implementation
                ├── StringsEs.kt            // Spanish (future)
                ├── StringsHi.kt            // Hindi (future)
                └── LocalizationProvider.kt // Runtime string provider
```

---

## Implementation Pattern

### 1. String Resource Interface

Define all strings as properties in a sealed interface:

```kotlin
interface Strings {
    // Navigation
    val navHome: String
    val navFamily: String
    val navSettings: String
    val navTutorial: String
    
    // Common Actions
    val actionSave: String
    val actionCancel: String
    val actionEdit: String
    val actionDelete: String
    val actionAdd: String
    val actionConfirm: String
    
    // Family Hub
    val familyHubTitle: String
    val familyHubYourFamily: String
    val familyHubPrimaryParent: String
    val familyHubQuickActions: String
    val familyHubInviteGuardian: String
    val familyHubManageRequests: String
    val familyHubPendingActions: String
    val familyHubFamilyMembers: String
    
    // Child Dashboard
    val childDashboardGreeting: (name: String) -> String
    val childDashboardParentView: String
    val childDashboardScreenTimeOk: String
    val childDashboardTimeRemaining: (hours: Int, minutes: Int) -> String
    val childDashboardAddChild: String
    val childDashboardEditRules: String
    val childDashboardMonitor: String
    
    // App Configuration
    val appConfigTitle: String
    val appConfigConfiguringFor: String
    val appConfigTotalDailyLimit: String
    val appConfigActiveCategories: String
    val appConfigCategoryEducation: String
    val appConfigCategorySocial: String
    val appConfigCategoryGames: String
    val appConfigCategorySystem: String
    val appConfigAllowed: String
    val appConfigPaused: String
    val appConfigTimeLimit: String
    val appConfigDailyLimit: String
    val appConfigSessionLimit: String
    val appConfigSaveChanges: String
    
    // Screen Time Schedules
    val schedulesTitle: String
    val schedulesDowntime: String
    val schedulesHomework: String
    val schedulesBedtime: String
    val schedulesWeekend: String
    val schedulesWeekday: String
    val schedulesAddSchedule: String
    val schedulesSetTime: String
    val schedulesStart: String
    val schedulesEnd: String
    
    // Status Messages
    val statusOnline: String
    val statusOffline: String
    val statusPlaying: (appName: String) -> String
    val statusInClass: String
    
    // Time Formats
    fun formatHoursMinutes(hours: Int, minutes: Int): String
    fun formatTimeRange(startHour: Int, startMin: Int, endHour: Int, endMin: Int): String
}
```

### 2. English Implementation

```kotlin
object StringsEn : Strings {
    // Navigation
    override val navHome = "Home"
    override val navFamily = "Family"
    override val navSettings = "Settings"
    override val navTutorial = "Tutorial"
    
    // Common Actions
    override val actionSave = "Save"
    override val actionCancel = "Cancel"
    override val actionEdit = "Edit"
    override val actionDelete = "Delete"
    override val actionAdd = "Add"
    override val actionConfirm = "Confirm"
    
    // Family Hub
    override val familyHubTitle = "Family Hub"
    override val familyHubYourFamily = "Your Family"
    override val familyHubPrimaryParent = "Primary Parent"
    override val familyHubQuickActions = "Quick Actions"
    override val familyHubInviteGuardian = "Invite New Guardian"
    override val familyHubManageRequests = "Manage Requests"
    override val familyHubPendingActions = "Pending actions"
    override val familyHubFamilyMembers = "Family Members"
    
    // Child Dashboard
    override val childDashboardGreeting = { name -> "Good Morning, $name" }
    override val childDashboardParentView = "Parent View"
    override val childDashboardScreenTimeOk = "Family screen time is within limits"
    override val childDashboardTimeRemaining = { hours, minutes -> 
        "${hours}h ${minutes}m remaining" 
    }
    override val childDashboardAddChild = "Add Child Profile"
    override val childDashboardEditRules = "Edit Rules"
    override val childDashboardMonitor = "Monitor"
    
    // App Configuration
    override val appConfigTitle = "App & Time Limits"
    override val appConfigConfiguringFor = "Configuring for"
    override val appConfigTotalDailyLimit = "Total Daily Limit"
    override val appConfigActiveCategories = "Active Categories"
    override val appConfigCategoryEducation = "Education"
    override val appConfigCategorySocial = "Social"
    override val appConfigCategoryGames = "Games"
    override val appConfigCategorySystem = "System Essential"
    override val appConfigAllowed = "Allowed"
    override val appConfigPaused = "Paused"
    override val appConfigTimeLimit = "Time Limit"
    override val appConfigDailyLimit = "Daily Limit"
    override val appConfigSessionLimit = "Session Limit"
    override val appConfigSaveChanges = "Save Changes"
    
    // Screen Time Schedules
    override val schedulesTitle = "Screen Time Schedules"
    override val schedulesDowntime = "Downtime"
    override val schedulesHomework = "Homework"
    override val schedulesBedtime = "Bedtime"
    override val schedulesWeekend = "Weekend Schedule"
    override val schedulesWeekday = "Weekday Schedule"
    override val schedulesAddSchedule = "Add Schedule"
    override val schedulesSetTime = "Set Time"
    override val schedulesStart = "Start"
    override val schedulesEnd = "End"
    
    // Status Messages
    override val statusOnline = "Online"
    override val statusOffline = "Offline"
    override val statusPlaying = { appName -> "Playing: $appName" }
    override val statusInClass = "Status: Online Class"
    
    // Time Formats
    override fun formatHoursMinutes(hours: Int, minutes: Int): String {
        return "${hours}h ${minutes.toString().padStart(2, '0')}m"
    }
    
    override fun formatTimeRange(
        startHour: Int, 
        startMin: Int, 
        endHour: Int, 
        endMin: Int
    ): String {
        val start = "${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}"
        val end = "${endHour.toString().padStart(2, '0')}:${endMin.toString().padStart(2, '0')}"
        return "$start - $end"
    }
}
```

### 3. Localization Provider

Provides runtime access to the current locale's strings:

```kotlin
object LocalizationProvider {
    private var currentLocale: Locale = Locale.EN
    
    val strings: Strings
        get() = when (currentLocale) {
            Locale.EN -> StringsEn
            Locale.ES -> StringsEs  // Future
            Locale.HI -> StringsHi  // Future
        }
    
    fun setLocale(locale: Locale) {
        currentLocale = locale
    }
}

enum class Locale {
    EN,  // English
    ES,  // Spanish
    HI   // Hindi
}
```

### 4. Compose Integration

Provide strings through composition local:

```kotlin
val LocalStrings = compositionLocalOf<Strings> { StringsEn }

@Composable
fun ProvideStrings(
    locale: Locale = Locale.EN,
    content: @Composable () -> Unit
) {
    LocalizationProvider.setLocale(locale)
    CompositionLocalProvider(
        LocalStrings provides LocalizationProvider.strings
    ) {
        content()
    }
}

// Usage in components
@Composable
fun MyScreen() {
    val strings = LocalStrings.current
    
    Text(text = strings.familyHubTitle)
    Text(text = strings.childDashboardGreeting("Sarah"))
}
```

---

## Naming Conventions

### Key Format
`{screen}_{component}_{purpose}`

Examples:
- `familyHub_title` - Screen title
- `childDashboard_greeting` - Greeting message
- `appConfig_saveButton` - Button label
- `status_playing` - Status message

### Categories

1. **Navigation**: `nav{Destination}`
   - `navHome`, `navSettings`

2. **Actions**: `action{Verb}`
   - `actionSave`, `actionCancel`

3. **Screen Titles**: `{screen}Title`
   - `familyHubTitle`, `schedulesTitle`

4. **Labels**: `{screen}_{element}`
   - `appConfig_dailyLimit`, `schedules_start`

5. **Messages**: `{context}_{type}`
   - `status_online`, `error_invalidInput`

6. **Functions**: `format{Type}`
   - `formatHoursMinutes`, `formatDate`

---

## Pluralization

For languages with complex plural rules:

```kotlin
interface Strings {
    fun childrenCount(count: Int): String
    fun hoursRemaining(count: Int): String
}

object StringsEn : Strings {
    override fun childrenCount(count: Int): String = when (count) {
        1 -> "1 child"
        else -> "$count children"
    }
    
    override fun hoursRemaining(count: Int): String = when (count) {
        1 -> "1 hour remaining"
        else -> "$count hours remaining"
    }
}
```

---

## Context for Translators

Add documentation comments for complex strings:

```kotlin
/**
 * Greeting shown in the header of child dashboard
 * @param name The parent's first name
 * Character limit: 30 characters
 * Context: Shown in morning hours (6 AM - 12 PM)
 */
override val childDashboardGreeting = { name -> "Good Morning, $name" }

/**
 * Status badge showing current app activity
 * @param appName Name of the application being used
 * Character limit: 40 characters
 * Context: Displayed as a small badge on child profile card
 */
override val statusPlaying = { appName -> "Playing: $appName" }
```

---

## String Extraction Checklist

Before creating a new screen, extract all strings:

- [ ] Screen titles and headers
- [ ] Button labels
- [ ] Form labels and placeholders
- [ ] Error messages
- [ ] Success messages
- [ ] Status indicators
- [ ] Navigation labels
- [ ] Tooltips and hints
- [ ] Dialog messages
- [ ] Empty state messages

---

## Testing Localization

### 1. Pseudo-Localization
Create a test locale with modified strings to catch hardcoded text:

```kotlin
object StringsPseudo : Strings {
    override val navHome = "[!!! Ĥöɱé !!!]"
    override val actionSave = "[!!! Šåṽé !!!]"
    // ... wrap all strings with markers
}
```

### 2. Character Limit Testing
Test with languages that expand significantly (German, Russian):
- German can be 30% longer than English
- Reserve extra space in UI layouts

### 3. RTL Testing
Prepare for right-to-left languages (Arabic, Hebrew):
- Use `LocalLayoutDirection` in Compose
- Test with `LayoutDirection.Rtl`

---

## Future Enhancements

### 1. Dynamic Loading
Load strings from remote server for instant updates:

```kotlin
suspend fun loadStringsFromServer(locale: Locale): Strings {
    // Fetch JSON/XML from API
    // Parse and return Strings implementation
}
```

### 2. Fallback Chain
If a string is missing in the current locale, fall back to English:

```kotlin
class FallbackStrings(
    private val primary: Strings,
    private val fallback: Strings = StringsEn
) : Strings {
    override val navHome: String
        get() = primary.navHome.ifEmpty { fallback.navHome }
}
```

### 3. String Analytics
Track which strings are most viewed for translation priority:

```kotlin
fun trackStringUsage(key: String) {
    analytics.logEvent("string_viewed", mapOf("key" to key))
}
```

---

## Best Practices

### ✅ Do's
- Extract ALL user-facing text to string resources
- Use descriptive, hierarchical key names
- Provide context comments for translators
- Test with pseudo-localization
- Consider character limits in UI design
- Use parameters for dynamic content
- Group related strings together

### ❌ Don'ts
- Don't hardcode strings in composables
- Don't concatenate strings (breaks translation)
- Don't use string keys as UI text
- Don't assume English word order
- Don't embed formatting in strings
- Don't use abbreviations without context
- Don't forget to update all locale files

---

## Migration Guide

### Converting Hardcoded Strings

**Before:**
```kotlin
@Composable
fun FamilyHub() {
    Text("Family Hub")
    Button(onClick = {}) {
        Text("Save Changes")
    }
}
```

**After:**
```kotlin
@Composable
fun FamilyHub() {
    val strings = LocalStrings.current
    
    Text(strings.familyHubTitle)
    Button(onClick = {}) {
        Text(strings.actionSave)
    }
}
```

### Adding New Strings

1. Add to `Strings` interface
2. Implement in all locale files
3. Update documentation
4. Test in UI

```kotlin
// 1. Interface
interface Strings {
    val newFeatureTitle: String
}

// 2. Implementation
object StringsEn : Strings {
    override val newFeatureTitle = "New Feature"
}

// 3. Usage
@Composable
fun NewFeature() {
    val strings = LocalStrings.current
    Text(strings.newFeatureTitle)
}
```

---

## Summary

This localization system ensures:
- ✅ All strings are centralized and type-safe
- ✅ Easy to add new languages
- ✅ Translators have proper context
- ✅ Runtime locale switching is supported
- ✅ The prototype is production-ready for i18n

By following this architecture, the UI prototype will be fully prepared for multi-language support when the production Android app is developed.
