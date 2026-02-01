# Real Stone & Granite: Architectural Blueprint

**Version:** 2.0 (Industrial Luxury)
**Est:** 1993 (Physical) | 2025 (Digital)
**Framework:** React 19 + Feature-Sliced Design (FSD)

---

## 1. Executive Summary
**Real Stone & Granite (RSG)** is a high-performance single-page application (SPA) designed to digitize the consultation experience of a luxury stone fabrication facility. 

**Core Persona:** The application acts not as a website, but as a "Digital Concierge" or "High-End Stone Consultant." It rejects standard SaaS tropes (friendly mascots, bright colors) in favor of an **"Industrial Luxury"** aesthetic—dark, heavy, precise, and authoritative.

### Key Objectives
1.  **Digital Verification:** Prove competence through high-fidelity visuals and technical specs.
2.  **Lead Qualification:** The *Design Studio* acts as a sophisticated intake form, filtering serious inquiries from casual browsers.
3.  **AI Authority:** The *Stone Curator* (AI) provides instant, expert answers using specific company knowledge, removing the need for a receptionist.

---

## 2. Design System: "The Rolex Factory"
The UI is built on a custom design system that prioritizes weight, permanence, and precision.

### 2.1 Aesthetic Rules
*   **Theme:** Dark Mode Only.
*   **Geometry:** **Strictly Sharp.** `rounded-none` or `rounded-sm` (2px) maximum. No soft pills or circles (except specifically calibrated UI elements like radio buttons).
*   **Materials:**
    *   **Deep Onyx (Primary):** `oklch(14% 0.01 80)` - A void-like black, not gray.
    *   **Gunmetal (Surface):** `oklch(19% 0.01 80)` - For cards and panels.
    *   **Rolex Gold (Accent):** `oklch(74% 0.16 82)` - A metallic brass, not yellow.
    *   **Platinum (Text):** `oklch(98% 0 0)` - High contrast legibility.

### 2.2 Physics & Animation (`shared/lib/theme.ts`)
We use `framer-motion` to simulate physical weight. Nothing floats; it slides and locks.
*   **Industrial Spring:** `stiffness: 250`, `damping: 35`, `mass: 2.0`. Used for buttons and cards. Feels heavy, critical damping.
*   **Snappy:** `stiffness: 400`, `damping: 30`. Used for UI toggles and drawers.
*   **Smooth:** `duration: 0.8`, `ease: [0.22, 1, 0.36, 1]`. Used for parallax and page transitions.

### 2.3 Vocabulary
*   **Forbidden:** "Sign Up", "Login", "Dashboard", "Submit", "Chat".
*   **Required:** "Start Project", "Access Vault", "Studio", "Inquire", "Consult".

---

## 3. Technical Architecture (FSD)
The codebase follows **Feature-Sliced Design** to ensure scalability and isolation.

### 3.1 Layers
1.  **`app/`**: Global configuration (Providers, CSS, SEO).
2.  **`pages/`**: Composition of widgets (Home).
3.  **`widgets/`**: Large, standalone page sections.
    *   `Hero`: Landing experience with parallax gallery and manifesto.
    *   `TheDossier`: Intro narrative and operational stats.
    *   `Capabilities`: Technical service ledger.
    *   `MaterialVault`: Inventory grid with filtering.
    *   `Monuments`: Accordion-style project gallery.
    *   `Navbar` / `Footer`: Global navigation.
4.  **`features/`**: Complex, stateful user flows.
    *   `DesignStudio`: The project planner wizard (Voice inputs, form logic).
    *   `StoneCurator`: The AI chatbot (RAG-lite, Gemni integration).
5.  **`entities/`**: Business logic and data models.
    *   `project`: State store for the user's project configuration.
    *   `company`: Static Knowledge Base (`COMPANY_KB`).
6.  **`shared/`**: Reusable primitives (`PrecisionBtn`, `api`, `assets`).

---

## 4. Core Features & Logic

### 4.1 Feature: Design Studio (`features/DesignStudio`)
A multi-step wizard for project intake.
*   **State Management:** `useReducer` pattern via `ProjectContext`.
*   **Steps:**
    1.  **Identity:** Role selection (Homeowner vs. Professional).
    2.  **Tier:** Fabrication Level (Classic vs. Artisan).
    3.  **Recommendation:** Rule-based engine (`getRecommendation`) suggesting materials based on inputs (e.g., Outdoor -> Dekton).
    4.  **Details:** Timeline, File Upload, and **Voice Dictation**.
*   **AI Integration:**
    *   Uses **MediaRecorder API** to capture audio blobs.
    *   Sends to **Gemini 1.5 Flash** (via `transcribeAudio`) to convert voice notes into a structured project description.

### 4.2 Feature: Stone Curator (`features/StoneCurator`)
A floating AI concierge available 24/7.
*   **Architecture:** Client-side RAG-lite.
*   **Logic:**
    1.  User input is captured.
    2.  System constructs a prompt injecting `COMPANY_KB` (JSON data containing hours, address, material specs).
    3.  Sends to **Gemini 3 Flash Preview** (`gemini-3-flash-preview`).
    4.  **Persona Injection:** System prompt enforces the persona of a "30-year Master Mason" (No AI jargon, uses analogies).
    5.  **Action Triggers:** AI can output `[ACTION_LAUNCH_STUDIO]` to programmatically open the Design Studio.

### 4.3 Widget: Hero Section
*   **Visuals:** Dual-pane layout. Left side is typography (Manifesto). Right side is an interactive gallery (`HeroGallery`).
*   **Lighting Engine:** `HeroGallery` tracks mouse movement to create a "flashlight" effect on stone slabs using `framer-motion` templates (`radial-gradient` masks).

### 4.4 Widget: Monuments
*   **Interaction:** Horizontal accordion. Hovering expands a project slice.
*   **Visuals:** Grayscale by default; full color on interaction.

---

## 5. Data Models

### 5.1 Project State (`entities/project/store.ts`)
```typescript
interface ProjectState {
  userRole: 'Private Residence' | 'Professional Partner';
  fabricationLevel: 'Classic Selection' | 'Artisan Masterpiece';
  projectType: 'Residential' | 'Commercial' | 'Monument';
  environment: 'Indoor' | 'Outdoor';
  stonePreference: string;
  timeline: string;
  description: string;
}
```

### 5.2 Knowledge Base (`entities/company/knowledge.ts`)
A static JSON source of truth used by the AI to answer questions accurately.
*   **Contains:** Identity, Facility Specs, Service Territory, Material Attributes (Natural vs. Engineered), and Legacy Projects.

---

## 6. AI Integration Strategy
**Provider:** Google GenAI SDK (`@google/genai`)
**Model:** `gemini-3-flash-preview`

### 6.1 Text Generation (Chat)
*   **Input:** User text + System Prompt (containing `COMPANY_KB`).
*   **Config:** Temperature 0.7 (Creative but grounded).
*   **Goal:** Answer questions about stone hardness, company hours, or processes.

### 6.2 Multimodal (Voice-to-Text)
*   **Input:** Base64 encoded audio (WebM/MP4).
*   **Config:** Temperature 0.2 (Strict transcription).
*   **Goal:** Convert rambling voice notes into clean, bulleted requirements for the project description.
