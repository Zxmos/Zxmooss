// Real, verified portfolio data for Mark Anthony L. Duhig Jr.
// Grounded in GitHub (@Zxmos / ERecPass-Mobile) and confirmed Computer Engineering details.

export const PERSONAL_INFO = {
  name: "Mark Anthony L. Duhig Jr.",
  shortName: "Mark Duhig",
  role: "Computer Engineering Student | Developer | Technology Enthusiast",
  degree: "BS Computer Engineering (4th Year)",
  school: "ICCT Main Campus",
  location: "Philippines",
  email: "markanthonylduhigjr@gmail.com",
  githubUsername: "Zxmos",
  githubUrl: "https://github.com/Zxmos",
  githubRepoUrl: "https://github.com/Zxmos/portfolio",
  heroHeading: "Building the Future, Inspired by Tradition.",
  heroIntro:
    "I explore the intersection of software, electronics, embedded systems, and creative technology. Through experimentation and hands-on projects, I turn ideas into working solutions while continuing to grow as an engineer and developer.",
  profilePhoto: "./images/profile-headphones.png",
  profilePhotoLight: "./images/profile-headphones.png",
  profilePhotoDark: "./images/profile-strawhat.png",
  githubAvatar: "https://avatars.githubusercontent.com/u/188826483?v=4",
  sealText: "杜", // Stylized seal mark (Hanko)
};

export const CONTACT_CONFIG = {
  destinationEmail: "markanthonylduhigjr@gmail.com",
  // Optional: set VITE_WEB3FORMS_ACCESS_KEY or VITE_FORMSPREE_ENDPOINT in .env for custom transactional delivery.
  // Defaults to FormSubmit AJAX endpoint for markanthonylduhigjr@gmail.com.
  formSubmitAjaxUrl: "https://formsubmit.co/ajax/markanthonylduhigjr@gmail.com",
  web3FormsUrl: "https://api.web3forms.com/submit",
  soundtrackPath: "./audio/one-piece-to-the-grand-line.mp3",
  fallbackSoundtrackPath: "./audio/gear5-transformation.mp3",
};

export const SKILL_CATEGORIES = [
  {
    id: "programming",
    title: "Programming",
    subtitle: "Languages & Core Scripting",
    kanji: "術",
    description:
      "Languages and syntax used across mobile web wrappers, database schemas, and embedded firmware logic.",
    skills: [
      { name: "JavaScript (ES6+)", context: "Verified in ERecPass-Mobile application logic" },
      { name: "TypeScript", context: "Configured in Capacitor / Vite mobile build pipeline" },
      { name: "SQL (PostgreSQL)", context: "Authored relational schemas & Row-Level Security (RLS)" },
      { name: "HTML5 & CSS3", context: "Responsive UI styling and mobile viewports" },
      { name: "C / C++ (Embedded)", context: "Microcontroller programming & sensor integration" },
    ],
  },
  {
    id: "embedded",
    title: "Embedded Systems & Electronics",
    subtitle: "Microcontrollers, Sensors & Actuators",
    kanji: "機",
    description:
      "Hardware components and physical computing interfaces explored in hands-on sensor and IoT prototypes.",
    skills: [
      { name: "ESP32-S3 Development Board", context: "Dual-core wireless microcontroller platform" },
      { name: "AMG8833 Thermal Sensor", context: "8x8 IR thermal array via I2C interface" },
      { name: "INMP441 Microphone", context: "Omnidirectional digital MEMS I2S audio input" },
      { name: "WS2812B Addressable RGB LED", context: "Single-wire timing-critical status lighting" },
      { name: "Vibration Motor & Push Button", context: "Tactile haptic feedback & hardware interrupt input" },
      { name: "18650 Lithium Battery Power", context: "Portable power management & battery integration" },
    ],
  },
  {
    id: "software",
    title: "Software Development",
    subtitle: "Frameworks, Cloud & Mobile Tooling",
    kanji: "築",
    description:
      "Modern development platforms for packaging cross-platform applications, cloud authentication, and version control.",
    skills: [
      { name: "Supabase (Auth & PostgreSQL)", context: "Cloud database, user auth & RLS policy design" },
      { name: "Capacitor (Android & iOS)", context: "Hybrid native mobile packaging for web apps" },
      { name: "React & Vite", context: "Component architecture & fast frontend bundling" },
      { name: "Git & GitHub (@Zxmos)", context: "Source control, repository workflows & documentation" },
      { name: "Browser LocalStorage & Sync", context: "Offline-first client state & cloud reconciliation" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering & Prototyping",
    subtitle: "System Architecture & Hardware Debugging",
    kanji: "匠",
    description:
      "Practical engineering methodology from circuit wiring and sensor calibration to database security auditing.",
    skills: [
      { name: "Hardware-Software Integration", context: "Bridging physical sensor inputs with digital logic" },
      { name: "Row-Level Security (RLS) Design", context: "Scoping patient & appointment rows to auth.uid()" },
      { name: "Multi-Modal Sensor Fusion", context: "Combining thermal, audio, and tactile signals" },
      { name: "System Prototyping & Testing", context: "Iterative breadboarding, troubleshooting & schema validation" },
    ],
  },
];

export const PROJECTS = [
  {
    id: "erecpass-mobile",
    title: "ERecPass Mobile",
    subtitle: "Electronic Health-Record & Emergency-Pass Application",
    scrollNumber: "壱",
    category: "Mobile & Cloud Engineering",
    status: "Active Prototype (Hybrid LocalStorage + Supabase Cloud Integration)",
    featured: true,
    repoUrl: "https://github.com/Zxmos/my-first-project/tree/main/ERecPass-Mobile",
    liveUrl: null,
    summary:
      "A cross-platform mobile and web prototype designed to manage electronic health records, emergency pass status indicators, and clinical appointment scheduling using Capacitor and Supabase.",
    problem:
      "Patients and campus/clinic responders often face fragmented health records and slow appointment coordination during routine checkups or urgent triage situations.",
    role: "Lead Student Developer — System Architecture, Frontend Logic, Capacitor Mobile Packaging & Supabase Database Schema Design",
    technologies: [
      "JavaScript",
      "HTML5 / CSS3",
      "Capacitor 7 (Android / iOS)",
      "Supabase (@supabase/supabase-js)",
      "PostgreSQL & Row-Level Security (RLS)",
      "Vite",
    ],
    hardware: [
      "Android / iOS Mobile Devices (via Capacitor WebView)",
      "QR / Emergency Pass Display Interface",
    ],
    implementedFeatures: [
      "Patient profile management with status classification (e.g., Green status indicator, age category, guardian contact, and SIM info).",
      "Appointment scheduling workflow tracking patient name, assigned doctor, appointment date, reason, and approval status ('Pending Approval').",
      "PostgreSQL database schema (`public.patients` and `public.appointments`) linked to `auth.users(id)` with cascading rules.",
      "Strict Row-Level Security (RLS) policies ensuring authenticated patients can only select, insert, update, or delete their own records (`auth.uid()`).",
      "Capacitor Android & iOS build configuration (`npx cap sync android`) wrapping the `www/` application for native APK generation.",
    ],
    inProgressFeatures: [
      "Full migration from browser `localStorage` demo accounts to 100% cloud-backed Supabase synchronization across every screen.",
      "Server-side staff/admin role enforcement and Edge Functions for clinical verification.",
      "Comprehensive audit logging before any real clinical deployment (currently tested strictly with dummy data).",
    ],
    challenges:
      "Reconciling offline-first `localStorage` data structures with authenticated Supabase UUIDs (`auth_user_id` and `user_id`), while ensuring client-side publishable keys never expose privileged service roles or allow cross-patient data leaks.",
    learnings:
      "Learned how to write defensive PostgreSQL Row-Level Security policies, package web codebases into native Android Studio projects using Capacitor, and clearly separate prototype demo behavior from production healthcare security requirements.",
    architectureFlow: [
      { stage: "Mobile UI (Capacitor / www)", detail: "Patient & Appointment Interface + LocalStorage Fallback" },
      { stage: "Supabase Auth", detail: "Session Authentication & User UUID Resolution" },
      { stage: "PostgreSQL + RLS", detail: "Scoped `patients` & `appointments` Tables Protected by `auth.uid()`" },
    ],
  },
  {
    id: "esp32-s3-sensor-system",
    title: "ESP32-S3 Multi-Sensor & Haptic Node",
    subtitle: "Thermal, Acoustic & Tactile Embedded System",
    scrollNumber: "弐",
    category: "Embedded Systems & IoT",
    status: "Hardware Integration & Firmware Prototype",
    featured: true,
    repoUrl: "https://github.com/Zxmos",
    liveUrl: null,
    summary:
      "An embedded hardware system centered around the ESP32-S3 microcontroller that integrates thermal imaging, digital audio capture, tactile button input, haptic motor feedback, and addressable RGB LED indicators on portable lithium battery power.",
    problem:
      "Standalone embedded devices often rely on a single sensor modality and lack immediate physical feedback when detecting environmental anomalies such as heat signatures or acoustic events.",
    role: "Computer Engineering Student — Circuit Integration, Sensor Bus Interfacing & Embedded Firmware Development",
    technologies: [
      "C / C++ (Arduino / ESP-IDF)",
      "I2C Communication Protocol",
      "I2S Digital Audio Bus",
      "PWM / GPIO Interrupts",
      "Single-Wire LED Timing",
    ],
    hardware: [
      "ESP32-S3 Development Board",
      "AMG8833 8x8 Infrared Thermal Sensor",
      "INMP441 Omnidirectional I2S MEMS Microphone",
      "Tactile Push Button",
      "Mini Vibration Motor",
      "WS2812B Addressable RGB LED",
      "Built-in Onboard RGB LED",
      "18650 Lithium-Ion Battery",
    ],
    implementedFeatures: [
      "Interfaced the AMG8833 thermal array over I2C to read 64-pixel temperature matrices in real time.",
      "Configured the INMP441 digital microphone over the ESP32-S3 I2S bus for low-noise acoustic sampling.",
      "Wired a physical push button for mode switching and user trigger input alongside a vibration motor for non-visual haptic alerts.",
      "Driven external WS2812B addressable LEDs and the onboard RGB LED to display system state and thermal/audio threshold alerts.",
      "Powered the portable assembly using a rechargeable 18650 lithium battery cell.",
    ],
    inProgressFeatures: [
      "Refining power-sleep modes to extend 18650 battery runtime during continuous thermal + I2S sampling.",
      "Expanding wireless telemetry and edge signal filtering on the ESP32-S3.",
    ],
    challenges:
      "Managing concurrent I2C thermal polling and I2S audio reading without blocking WS2812B LED timing or causing voltage drops when the vibration motor triggers on battery power.",
    learnings:
      "Deepened practical understanding of multi-bus microcontroller architecture (I2C + I2S + GPIO), power rail decoupling for motors and LEDs, and real-time feedback loops.",
    architectureFlow: [
      { stage: "Inputs (Sensing)", detail: "AMG8833 Thermal (I2C) + INMP441 Mic (I2S) + Push Button (GPIO)" },
      { stage: "Processing Core", detail: "ESP32-S3 Microcontroller Firmware & Threshold Logic" },
      { stage: "Outputs & Power", detail: "WS2812B / Built-in RGB LEDs + Vibration Motor • 18650 Li-Ion" },
    ],
  },
  {
    id: "sumi-e-portfolio",
    title: "Living Sumi-e Engineering Scroll",
    subtitle: "Interactive Day & Night Japanese Ink Art Portfolio",
    scrollNumber: "参",
    category: "Creative Frontend Engineering",
    status: "Live & Continuously Evolving",
    featured: false,
    repoUrl: "https://github.com/Zxmos/portfolio",
    liveUrl: "#home",
    summary:
      "This custom-engineered personal portfolio built with React, Vite, and handcrafted SVG ink illustrations—featuring a cinematic day-to-night ink-cloud transition and a bidirectional bamboo scroll-progress stalk.",
    problem:
      "Standard developer portfolios often look like identical corporate templates that fail to express both technical precision and personal artistic identity.",
    role: "Designer & Frontend Developer",
    technologies: [
      "React 19",
      "Vite",
      "Custom SVG Filters & Ink Masks",
      "CSS Custom Properties (Day/Night Palettes)",
      "Accessible Reduced-Motion Hooks",
    ],
    hardware: ["Responsive Desktop, Tablet & Mobile Viewports"],
    implementedFeatures: [
      "Interactive Day (aged parchment) and Night (midnight sumi ink) theme engine with persistent localStorage and OS preference detection.",
      "Multi-layered ink-smoke and drifting cloud transition overlay that sweeps across the screen in opposite directions when toggling themes.",
      "Bidirectional SVG bamboo stalk indicator that grows nodes and leaves downward as you scroll and smoothly retracts when scrolling upward.",
      "Custom Ukiyo-e woodblock wave dividers and interactive project modal scrolls.",
    ],
    inProgressFeatures: [
      "Adding new Computer Engineering capstone documentation, circuit schematics, and laboratory field notes as coursework progresses.",
    ],
    challenges:
      "Synchronizing bidirectional SVG bamboo growth and multi-layer ink cloud transitions at 60fps without layout shifts or blocking main-thread scrolling.",
    learnings:
      "Mastered SVG `feTurbulence` paper/ink filters, passive scroll listeners, and accessible theme state management.",
    architectureFlow: [
      { stage: "User Interaction", detail: "Scroll Position & Theme Toggle Trigger" },
      { stage: "State & Motion Engine", detail: "React Hooks + RequestAnimationFrame Scroll Progress" },
      { stage: "Living Canvas", detail: "SVG Bamboo Growth, Ukiyo-e Waves & Ink Cloud Transition" },
    ],
  },
];

export const EXPERIMENTS = [
  {
    id: "exp-thermal",
    tag: "Sensor Lab • 01",
    status: "Hardware Bench Test",
    title: "AMG8833 8×8 Thermal Matrix Calibration",
    notes:
      "Testing I2C read rates and temperature threshold mapping on the ESP32-S3 to distinguish human hand proximity from ambient room warmth.",
    tools: ["ESP32-S3", "AMG8833", "I2C Bus"],
  },
  {
    id: "exp-i2s-audio",
    tag: "Acoustic Lab • 02",
    status: "Signal Exploration",
    title: "INMP441 Digital Microphone Sampling",
    notes:
      "Capturing raw digital audio frames over I2S without an external analog codec, experimenting with sound-level triggers paired with haptic vibration feedback.",
    tools: ["INMP441", "I2S Protocol", "Vibration Motor"],
  },
  {
    id: "exp-rls-security",
    tag: "Database Sketch • 03",
    status: "Schema Verification",
    title: "Supabase Row-Level Security (RLS) Sandboxing",
    notes:
      "Writing and testing PostgreSQL security policies so authenticated mobile users can only query or mutate rows matching their own `auth.uid()`.",
    tools: ["PostgreSQL", "Supabase Auth", "RLS Policies"],
  },
  {
    id: "exp-power-leds",
    tag: "Power & IO • 04",
    status: "Circuit Prototype",
    title: "18650 Battery & WS2812B Haptic Feedback Loop",
    notes:
      "Balancing current draw when driving addressable WS2812B RGB LEDs, the onboard RGB indicator, and a miniature vibration motor from a single 18650 lithium cell.",
    tools: ["18650 Li-Ion", "WS2812B", "GPIO / PWM"],
  },
];
