---
name: Precision Intelligence
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3f4752'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6f7883'
  outline-variant: '#bfc7d4'
  surface-tint: '#00629f'
  primary: '#00629f'
  on-primary: '#ffffff'
  primary-container: '#009af6'
  on-primary-container: '#002f50'
  inverse-primary: '#9bcbff'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#914c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#e17900'
  on-tertiary-container: '#492300'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e4ff'
  primary-fixed-dim: '#9bcbff'
  on-primary-fixed: '#001d34'
  on-primary-fixed-variant: '#004a79'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#ffb77f'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6f3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-h1:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-h2:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-h3:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is anchored in the concept of "Surgical Clarity." As an AI-driven tool, the visual language must communicate speed, accuracy, and professional-grade results. The aesthetic follows a **Modern Corporate Minimalism** approach—stripping away unnecessary ornamentation to let the user's content (the photography) take center stage.

The emotional goal is to evoke a sense of "effortless power." This is achieved through a spacious layout, a restricted color palette, and a high-tech finish that feels more like a precision instrument than a toy. The interface should feel invisible, providing a frictionless path from "image upload" to "perfect cutout."

## Colors

The palette is intentionally restrained to maximize the impact of the primary action color. 

- **Primary (Electric Blue):** Used exclusively for high-priority CTAs, progress indicators, and active states. It represents the "intelligence" and "energy" of the AI.
- **Secondary (Charcoal):** Reserved for primary headings and critical UI text to ensure maximum readability and a grounded, professional feel.
- **Neutral (Slate Gray):** Utilized for secondary text, borders, and icons to maintain a soft hierarchy.
- **Backgrounds:** A mix of pure white for primary surfaces and a very light cool gray (#F8FAFC) for section differentiation and card backgrounds, preventing the interface from feeling "flat."

## Typography

This design system utilizes a dual-font strategy to balance technical authority with modern refinement. 

**Inter** is employed for headlines and functional labels. Its systematic, geometric nature reinforces the "high-tech" brand pillar. Large headings should use tight letter spacing and bold weights to command attention.

**Manrope** is used for body copy and descriptions. Its slightly wider apertures and modern proportions offer superior legibility for longer strings of text, making the tool feel approachable and sophisticated.

## Layout & Spacing

The design system employs a **Fixed Grid** model for landing pages and a **Fluid Layout** for the application dashboard. 

- **Grid:** A 12-column system with a 1200px max-width container. 
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Whitespace:** Use "generous breathing room" (the 'xl' spacing tier) between major landing page sections to reinforce the minimalist aesthetic. Elements should feel grouped logically using 'sm' and 'md' units, while sections are separated by 'xl' to prevent visual clutter.

## Elevation & Depth

Depth in this design system is created through **Ambient Shadows** and **Tonal Layering**. 

1.  **Level 0 (Surface):** The main background (#FFFFFF).
2.  **Level 1 (Cards):** Slightly elevated using a very soft, diffused shadow: `box-shadow: 0 4px 20px rgba(45, 45, 45, 0.05)`. This creates a subtle "lift" without looking heavy.
3.  **Level 2 (Active/Hover):** Enhanced shadow depth for interactive elements: `box-shadow: 0 12px 32px rgba(45, 45, 45, 0.08)`.
4.  **Level 3 (Overlays):** For modals or dropdowns, use a subtle backdrop blur (8px) combined with a semi-transparent white fill to maintain the "high-tech" glass-adjacent feel.

## Shapes

The shape language is consistently **Rounded (Level 2)**. 

Standard components (buttons, input fields) use a 0.5rem (8px) base radius. Larger containers, such as pricing cards or image preview boxes, scale up to `rounded-xl` (1.5rem/24px) to soften the professional edge and make the product feel modern and user-friendly. Icons should follow a similar rounded terminal style to match the UI components.

## Components

### Buttons
- **Primary:** Solid #009AF6 with white text. High-contrast, bold weight.
- **Secondary:** Ghost style with a thin 1px border (#CBD5E1) and Charcoal text.
- **Hover States:** Subtle darkening of the background for primary; a light gray fill for ghost buttons.

### Cards
- Use for features and testimonials. White background, `rounded-xl` corners, and a Level 1 ambient shadow. Minimize borders; use shadows to define edges.

### Form Inputs
- Clean, 1px #E2E8F0 borders that turn #009AF6 on focus. Use Manrope for input text for a refined feel.

### Comparison Slider
- A custom component essential for Cutmage. Use a vertical divider line with a circular handle. The handle should use the primary blue and a Level 2 shadow to indicate interactivity.

### Chips & Badges
- Used for "New" features or "AI Powered" labels. Small, semi-transparent blue backgrounds with saturated blue text for a "techy" highlight look.