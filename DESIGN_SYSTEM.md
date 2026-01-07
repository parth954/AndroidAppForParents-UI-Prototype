# Design System - Parental Control App

> **Purpose**: This document defines the visual language and design tokens for the Parental Control app UI prototype. All components must reference these centralized tokens to ensure consistency and enable instant global updates.

## Design Principles

### 1. Reduce Cognitive Load
- **Clear Visual Hierarchy**: Use size, weight, and color to establish importance
- **Consistent Patterns**: Reuse familiar UI patterns across screens
- **Progressive Disclosure**: Show essential information first, details on demand
- **Meaningful Icons**: Use Material Symbols to reinforce actions and categories

### 2. Intuitive Information Architecture
- **Scannable Layouts**: Group related information with clear spacing
- **Visual Affordances**: Make interactive elements obviously clickable/tappable
- **Status Clarity**: Use color and badges to communicate state at a glance
- **Contextual Actions**: Place actions near the content they affect

### 3. Soft Security Aesthetic
- **Calming Colors**: Safe blues and sage greens instead of harsh reds
- **Gentle Transitions**: Smooth animations that feel natural
- **Glass Morphism**: Frosted glass effects for depth and modernity
- **Rounded Corners**: Softer, more approachable interface elements

---

## Color System

### Primary Colors

```kotlin
// Safe Blue - Primary brand color for trust and security
Primary = Color(0xFF4276F0)
PrimaryDark = Color(0xFF3560C5)
PrimaryLight = Color(0xFF5D8AF4)

// Sage Green - Accent color for positive states and education
Sage = Color(0xFF8BA88E)
SageLight = Color(0xFFE8F2EA)
SageDark = Color(0xFF5FA084)
```

### Background Colors

```kotlin
// Light Mode
BackgroundLight = Color(0xFFF6F6F8)
SurfaceLight = Color(0xFFFFFFFF)
SurfaceGlassLight = Color(0xFFFFFFFF).copy(alpha = 0.8f)

// Dark Mode
BackgroundDark = Color(0xFF101622)
SurfaceDark = Color(0xFF1E2536)
SurfaceGlassDark = Color(0xFF1E293B).copy(alpha = 0.8f)
```

### Semantic Colors

```kotlin
// Success & Allowed States
Success = Color(0xFF8ABF9E)
SuccessLight = Color(0xFFE3F0E9)
SuccessDark = Color(0xFF2E7D32)

// Warning & Time Limits
Warning = Color(0xFFD99A46)
WarningLight = Color(0xFFFFF8E1)
WarningDark = Color(0xFFFBC02D)

// Error & Blocked States
Error = Color(0xFFEF5350)
ErrorLight = Color(0xFFFFEBEE)
ErrorDark = Color(0xFFC62828)

// Info & Neutral
Info = Color(0xFF3B82F6)
InfoLight = Color(0xFFEFF6FF)
InfoDark = Color(0xFF1E40AF)
```

### Text Colors

```kotlin
// Light Mode
TextPrimaryLight = Color(0xFF0D121B)
TextSecondaryLight = Color(0xFF64748B)
TextTertiaryLight = Color(0xFF94A3B8)

// Dark Mode
TextPrimaryDark = Color(0xFFF1F5F9)
TextSecondaryDark = Color(0xFF94A3B8)
TextTertiaryDark = Color(0xFF64748B)
```

### Category Colors

```kotlin
// App Categories
CategoryEducation = Color(0xFF77DD77)      // Sage Green
CategorySocial = Color(0xFF3B82F6)         // Safe Blue
CategoryGames = Color(0xFFFF9800)          // Orange
CategoryEntertainment = Color(0xFFE91E63)  // Pink
CategoryProductivity = Color(0xFF9C27B0)   // Purple
CategorySystem = Color(0xFF607D8B)         // Blue Grey
```

---

## Typography

### Font Family
**Primary**: Plus Jakarta Sans (Google Fonts)
- Modern, friendly, and highly legible
- Excellent for both display and body text
- Supports weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

### Type Scale

```kotlin
// Display - Large headings and hero text
DisplayLarge = TextStyle(
    fontSize = 34.sp,
    lineHeight = 40.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = (-0.5).sp
)

DisplayMedium = TextStyle(
    fontSize = 28.sp,
    lineHeight = 34.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = (-0.25).sp
)

// Headings
HeadingLarge = TextStyle(
    fontSize = 24.sp,
    lineHeight = 30.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = 0.sp
)

HeadingMedium = TextStyle(
    fontSize = 19.sp,
    lineHeight = 24.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = (-0.015).em
)

HeadingSmall = TextStyle(
    fontSize = 17.sp,
    lineHeight = 22.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = 0.sp
)

// Body Text
BodyLarge = TextStyle(
    fontSize = 16.sp,
    lineHeight = 24.sp,
    fontWeight = FontWeight.Normal,
    letterSpacing = 0.sp
)

BodyMedium = TextStyle(
    fontSize = 14.sp,
    lineHeight = 20.sp,
    fontWeight = FontWeight.Normal,
    letterSpacing = 0.sp
)

BodySmall = TextStyle(
    fontSize = 13.sp,
    lineHeight = 18.sp,
    fontWeight = FontWeight.Medium,
    letterSpacing = 0.sp
)

// Labels & Captions
LabelLarge = TextStyle(
    fontSize = 14.sp,
    lineHeight = 20.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = 0.sp
)

LabelMedium = TextStyle(
    fontSize = 12.sp,
    lineHeight = 16.sp,
    fontWeight = FontWeight.SemiBold,
    letterSpacing = 0.sp
)

LabelSmall = TextStyle(
    fontSize = 11.sp,
    lineHeight = 14.sp,
    fontWeight = FontWeight.Bold,
    letterSpacing = 0.05.em,
    textTransform = TextTransform.Uppercase
)

CaptionLarge = TextStyle(
    fontSize = 12.sp,
    lineHeight = 16.sp,
    fontWeight = FontWeight.Medium,
    letterSpacing = 0.sp
)

CaptionSmall = TextStyle(
    fontSize = 10.sp,
    lineHeight = 14.sp,
    fontWeight = FontWeight.Medium,
    letterSpacing = 0.sp
)
```

---

## Spacing Scale

```kotlin
// Base unit: 4dp
Space1 = 4.dp    // 0.25rem
Space2 = 8.dp    // 0.5rem
Space3 = 12.dp   // 0.75rem
Space4 = 16.dp   // 1rem
Space5 = 20.dp   // 1.25rem
Space6 = 24.dp   // 1.5rem
Space7 = 28.dp   // 1.75rem
Space8 = 32.dp   // 2rem
Space10 = 40.dp  // 2.5rem
Space12 = 48.dp  // 3rem
Space16 = 64.dp  // 4rem
Space20 = 80.dp  // 5rem

// Common use cases
PaddingSmall = Space3      // 12dp - Compact spacing
PaddingMedium = Space4     // 16dp - Standard spacing
PaddingLarge = Space5      // 20dp - Generous spacing
PaddingXLarge = Space6     // 24dp - Section spacing

GapSmall = Space2          // 8dp - Between related items
GapMedium = Space3         // 12dp - Between components
GapLarge = Space4          // 16dp - Between sections
```

---

## Border Radius

```kotlin
// Rounded corners for different component sizes
RadiusSmall = 8.dp      // Small buttons, badges
RadiusMedium = 12.dp    // Standard buttons, inputs
RadiusLarge = 16.dp     // Cards, panels
RadiusXLarge = 20.dp    // Large cards
Radius2XLarge = 24.dp   // Hero cards, modals
Radius3XLarge = 32.dp   // Full-screen cards
RadiusFull = 9999.dp    // Pills, circular buttons
```

---

## Elevation & Shadows

```kotlin
// Soft shadows for depth without harshness
ShadowSoft = BoxShadow(
    color = Color.Black.copy(alpha = 0.04f),
    blurRadius = 30.dp,
    offset = Offset(0.dp, 8.dp)
)

ShadowTactile = BoxShadow(
    color = Color.Black.copy(alpha = 0.02f),
    blurRadius = 4.dp,
    offset = Offset(0.dp, 2.dp)
)

ShadowFloat = BoxShadow(
    color = Color(0xFF3B82F6).copy(alpha = 0.25f),
    blurRadius = 30.dp,
    offset = Offset(0.dp, 10.dp)
)

ShadowGlow = BoxShadow(
    color = Color(0xFF3B82F6).copy(alpha = 0.15f),
    blurRadius = 15.dp,
    offset = Offset(0.dp, 0.dp)
)
```

---

## Transitions & Animations

### Duration

```kotlin
DurationInstant = 100.milliseconds   // Immediate feedback
DurationQuick = 200.milliseconds     // Hover, focus states
DurationNormal = 300.milliseconds    // Standard transitions
DurationSlow = 500.milliseconds      // Page transitions
```

### Easing Curves

```kotlin
// Material Design easing
EaseStandard = CubicBezier(0.4f, 0.0f, 0.2f, 1.0f)
EaseDecelerate = CubicBezier(0.0f, 0.0f, 0.2f, 1.0f)
EaseAccelerate = CubicBezier(0.4f, 0.0f, 1.0f, 1.0f)
EaseEmphasized = CubicBezier(0.2f, 0.0f, 0.0f, 1.0f)
```

### Common Animations

```kotlin
// Scale on press
ScaleActive = 0.98f
ScaleHover = 1.02f

// Fade
FadeIn = 0.0f to 1.0f
FadeOut = 1.0f to 0.0f

// Slide
SlideInUp = Offset(0.dp, 10.dp) to Offset(0.dp, 0.dp)
```

---

## Component Patterns

### Glass Panel
- **Background**: Semi-transparent white/dark surface
- **Backdrop Filter**: 20px blur
- **Border**: 1px solid white/10% opacity
- **Shadow**: Soft shadow
- **Use**: Cards, modals, overlays

### Primary Button
- **Background**: Primary color gradient
- **Text**: White, bold, 14-16sp
- **Padding**: 16dp horizontal, 12-14dp vertical
- **Border Radius**: 16-20dp
- **Shadow**: Float shadow with primary color
- **Hover**: Darken 5%
- **Active**: Scale 0.98

### Secondary Button
- **Background**: Surface color
- **Text**: Primary color, bold
- **Border**: 1px solid border color
- **Padding**: Same as primary
- **Hover**: Slight background tint
- **Active**: Scale 0.98

### Status Badge
- **Background**: Semantic color light variant
- **Text**: Semantic color dark variant, 10-11sp, uppercase, bold
- **Padding**: 8dp horizontal, 4dp vertical
- **Border Radius**: Full (pill shape)
- **Border**: 1px solid semantic color/30%

### Progress Ring
- **Track**: Light grey, 6dp width
- **Progress**: Semantic color, 6dp width, rounded caps
- **Size**: 80-96dp diameter
- **Animation**: Smooth fill with spring animation

### Card
- **Background**: Glass panel or solid surface
- **Padding**: 20-24dp
- **Border Radius**: 24-32dp
- **Shadow**: Soft shadow
- **Hover**: Slight lift (shadow increase)
- **Border**: Optional 1px accent color

---

## Icon System

**Library**: Material Symbols Outlined
**Sizes**:
- Small: 18-20dp
- Medium: 22-24dp
- Large: 28-30dp

**Common Icons**:
- `shield_person` - Parent/Guardian
- `schedule` - Time/Duration
- `apps` - Applications
- `school` - Education
- `group` - Social
- `sports_esports` - Games
- `block` - Restricted/Blocked
- `verified_user` - Safe/Verified
- `bolt` - Quick Actions

---

## Accessibility

### Contrast Ratios
- **Body Text**: Minimum 4.5:1
- **Large Text**: Minimum 3:1
- **UI Components**: Minimum 3:1

### Touch Targets
- **Minimum Size**: 44dp × 44dp
- **Recommended**: 48dp × 48dp

### Focus States
- **Outline**: 2px solid primary color
- **Offset**: 2dp from element
- **Border Radius**: Match element + 2dp

---

## Usage Guidelines

### Do's ✅
- Always use design tokens from this system
- Maintain consistent spacing using the scale
- Use semantic colors for status indication
- Apply glass morphism for overlays and modals
- Use soft shadows for depth
- Implement smooth transitions for state changes

### Don'ts ❌
- Don't use hardcoded color values
- Don't mix different border radius values arbitrarily
- Don't use harsh shadows or borders
- Don't use colors outside the defined palette
- Don't skip animation/transition states
- Don't create one-off component styles

---

## Implementation Notes

All tokens should be centralized in a `DesignSystem` object that can be accessed globally. When a token is updated, all components referencing it should automatically reflect the change.

```kotlin
// Example usage
@Composable
fun MyComponent() {
    Card(
        backgroundColor = DesignSystem.colors.surfaceGlassLight,
        shape = RoundedCornerShape(DesignSystem.radius.large),
        elevation = DesignSystem.elevation.soft
    ) {
        Text(
            text = "Hello",
            style = DesignSystem.typography.bodyLarge,
            color = DesignSystem.colors.textPrimary
        )
    }
}
```
