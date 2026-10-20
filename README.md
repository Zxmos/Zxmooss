# Mark Anthony L. Duhig Jr. — Living Sumi-e Engineering Scroll Portfolio

An interactive, Japanese ink-painting (**Sumi-e** & **Ukiyo-e**) personal engineering portfolio built for **Mark Anthony L. Duhig Jr.** (`@Zxmos`), a 4th-year Bachelor of Science in Computer Engineering student at ICCT Main Campus, Philippines.

---

## Creative & Technical Highlights

1. **Old-Canvas & Sumi Ink Visual Identity**
   - Styled after an ancient Japanese scroll painted on aged parchment (`#E8DDC5`, `#D5C5A5`, `#B8A88A`) with deep sumi ink (`#171714`, `#292824`), muted bamboo green (`#667453`), antique gold (`#AA8952`), and moonlight silver (`#C6C8C7`).
   - Uses *Shippori Mincho* & *Cormorant Garamond* display typography paired with *Plus Jakarta Sans* and *Fira Code* for high readability.

2. **Interactive Day & Night Ink-Cloud Transition (`src/components/CloudTransition.jsx`)**
   - **Day Mode (`day`)**: Sunlit aged-parchment scroll with warm ivory, crimson sun disc, drifting clouds, and ink mountains.
   - **Night Mode (`night`)**: Midnight sumi-black scroll with silver moonlight, subtle twinkling motes, and moonlit waves.
   - **Directional Cloud Sweep**: Switching from Day to Night sweeps layered SVG ink clouds from left to right across the screen; switching from Night to Day flows in the opposite direction (right to left).
   - Respects OS `prefers-color-scheme`, saves preference in `localStorage` (`mark-sumi-e-theme`), and honors `prefers-reduced-motion`.

3. **Reverse-Direction Bamboo Scroll Indicator + Bone-Meal Growth Effect (`src/components/BambooScrollIndicator.jsx`)**
   - Fixed along the right edge of the scroll.
   - **Scrolling Down**: Progressively shrinks the bamboo stalk, retracting upper culm segments, nodes, and leaves in reverse order.
   - **Scrolling Up**: Grows the bamboo taller segment-by-segment and triggers an original **Minecraft bone-meal-inspired growth burst** of pale bamboo-green, aged-ivory, and antique-gold ink sparkles (`BONEMEAL_MOTES`) with staggered node pops and a soft brush aura.
   - **>= 80% Banner Transparency**: All hero banners, navigation headers, and floating panels use background alpha values `<= 0.20` (`rgba(..., 0.14)` to `rgba(..., 0.20)`) so the Sumi-e mountains, clouds, bamboo, and Ukiyo-e waves remain clearly visible beneath full-contrast text.

4. **Real Engineering Projects & Workshop (`src/data/portfolioData.js`)**
   - **ERecPass Mobile**: Documents the Capacitor (Android/iOS), JavaScript, and Supabase (`patients` & `appointments` PostgreSQL tables with Row-Level Security) architecture from `Zxmos/my-first-project`, transparently separating implemented features from work-in-progress cloud migration goals.
   - **ESP32-S3 Multi-Sensor & Haptic Node**: Showcases hardware integration of the ESP32-S3 development board, AMG8833 thermal array (I2C), INMP441 digital microphone (I2S), tactile push button, vibration motor, WS2812B LED, built-in RGB LED, and 18650 lithium battery.

---

## Getting Started

### Prerequisites
- **Node.js** (v18+ recommended) and **npm**

### Install & Run Development Server
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

### Lint Code
```bash
npm run lint
```

---

## Customizing Content & Portrait

- **Portfolio Data**: Edit [`src/data/portfolioData.js`](./src/data/portfolioData.js) to update personal information, add skills, add new projects, or record new laboratory experiments.
- **Profile Photograph**: Your uploaded photo is stored at [`public/profile.webp`](./public/profile.webp) with automatic fallback to your GitHub avatar (`https://avatars.githubusercontent.com/u/188826483?v=4`). Replace `public/profile.webp` anytime to update your portrait.
