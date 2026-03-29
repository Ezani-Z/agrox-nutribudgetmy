# NutriBudget MY

**PutraHack 2026 Submission | Food Security Theme**

A decision-support tool for Malaysian school canteen operators to generate meal plans that comply with MOH "Suku-Suku Separuh" nutrition guidelines while staying within the RMT budget of RM3.50-4.00 per student.

---

## Problem Statement

Malaysian school canteen operators face a daily "Profit vs. Nutrition" dilemma:
- Must comply with Ministry of Health (MOH) "Suku-Suku Separuh" (Quarter-Quarter-Half) guidelines
- Must stay within RMT (Rancangan Makanan Tambahan) budget of RM3.50-4.00 per meal
- No digital tool exists to optimize meal planning for both constraints

## Solution

NutriBudget MY uses a constraint-satisfaction algorithm to automatically generate meal plans that:
1. Achieve exact "Suku-Suku Separuh" nutritional ratios (25% carbs, 25% protein, 50% vegetables)
2. Calculate costs based on Malaysian market prices
3. Stay strictly within RM3.50-4.00 per meal budget
4. Maximize canteen profitability while meeting nutrition goals

## Features

- **Smart Meal Plan Generator**: Auto-generate weekly meal plans optimized for nutrition and budget
- **Malaysian Ingredient Database**: 50+ pre-loaded local ingredients with editable prices
- **Budget Compliance Dashboard**: Real-time visualization of meal costs vs RMT budget
- **Nutrition Visualizer**: Visual Suku-Suku Separuh compliance checker
- **Export & Print**: Generate PDF meal plans and shopping lists

## Tech Stack

- **Frontend**: Lovable (lovable.dev), React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Data**: LocalStorage (MVP)
- **Export**: jsPDF, html2canvas

## Quick Start

1. Visit the live prototype: https://agrox-nutribudgetmy.lovable.app
2. Select your ingredients from the Malaysian database
3. Set your RMT budget (RM3.50-4.00)
4. Generate your weekly meal plan
5. Export/print for kitchen use

## Project Structure

```
PutraHack_2026/
├── PRD.md                 # Product Requirements Document
├── README.md             # This file
├── ai-disclosure.md      # AI Tools Disclosure
├── src/                  # Source code (Lovable/React)
│   ├── components/       # React components
│   ├── data/            # Ingredient database
│   └── utils/           # Algorithm logic
└── docs/                # Additional documentation
```

## PutraHack 2026 Alignment

| Criteria | Our Approach |
|----------|--------------|
| Creativity & Innovation (25%) | Novel constraint-satisfaction algorithm for Malaysian nutrition guidelines |
| Technical Feasibility (30%) | Proven tech stack with clear MVP scope |
| Impact (20%) | Direct benefit to 2.5M+ Malaysian school students |
| Scalability & Sustainability (15%) | Clear path from single canteen to national deployment |
| Presentation & Communication (10%) | Clear problem-solution narrative with visual demos |

## Submission Links

- **Prototype**: https://agrox-nutribudgetmy.lovable.app
- **Source Code**: https://github.com/Ezani-Z/agrox-nutribudgetmy
- **PRD**: ./PRD.md
- **AI Disclosure**: ./ai-disclosure.md

## Timeline

- **March 28**: PRD completion
- **April 1-2**: MVP development
- **April 3**: Testing and refinement
- **April 4**: Submission before 23:59 MYT

## Team

This project was developed for PutraHack 2026 with AI assistance (see ai-disclosure.md).

## License

All rights reserved. Teams retain full IP rights per PutraHack 2026 rules.

---

**Demo**: https://agrox-nutribudgetmy.lovable.app
**Video**: [YouTube link]
