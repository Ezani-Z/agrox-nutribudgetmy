# Product Requirements Document (PRD)
# NutriBudget MY

**Version:** 1.1 (Revised)
**Date:** 2026-03-29
**Project:** PutraHack 2026
**Theme:** Food Security

---

## 1. Executive Summary

NutriBudget MY is a decision-support web application designed for Malaysian school canteen operators. It solves the critical "Profit vs. Nutrition" dilemma by using a logic-based algorithm to automatically generate meal plans that comply with the Ministry of Health (MOH) "Suku-Suku Separuh" (Quarter-Quarter-Half) nutrition guidelines while staying strictly within the RMT (Rancangan Makanan Tambahan) budget of RM3.50 – RM4.00 per student.

---

## 2. Problem Statement

### 2.1 Current Pain Points

**For Canteen Operators:**
- Manual meal planning is time-consuming and error-prone
- Difficulty balancing nutritional requirements with cost constraints
- Lack of visibility into real-time ingredient pricing impact on meal costs
- Risk of non-compliance with MOH guidelines leading to penalties
- Slim profit margins make cost optimization critical

**For Students:**
- Inconsistent nutritional quality in school meals
- Potential exposure to unbalanced diets affecting health and learning
- Limited visibility into meal nutritional content

**For Schools:**
- Administrative burden of monitoring canteen compliance
- Reputational risk if nutritional standards are not met
- No systematic way to ensure RMT budget adherence

### 2.2 Regulatory Context

**MOH "Suku-Suku Separuh" Guidelines:**
The Malaysian Ministry of Health mandates that balanced meals follow the Quarter-Quarter-Half principle:
- **Quarter (1/4):** Carbohydrates (rice, noodles, bread)
- **Quarter (1/4):** Protein (chicken, fish, eggs, tofu, legumes)
- **Half (1/2):** Vegetables and fruits

**RMT Budget Constraints:**
The Rancangan Makanan Tambahan (Supplementary Food Plan) allocates RM3.50 – RM4.00 per student per meal. Canteens must operate within this range while remaining financially viable.

### 2.3 Market Gap
No existing digital tool specifically addresses the intersection of Malaysian nutrition guidelines, local ingredient pricing, and strict budget constraints for school canteens.

---

## 3. Solution Overview

### 3.1 Core Concept

NutriBudget MY uses a constraint-satisfaction algorithm to automatically generate optimized meal plans that:
1. Achieve "Suku-Suku Separuh" nutritional ratios based on serving size proportions
2. Calculate costs based on current Malaysian market prices (user-editable)
3. Stay within RM3.50 – RM4.00 per meal budget
4. Surface the highest-scoring compliant meal combinations for operator selection

### 3.2 Value Proposition

**For Canteen Operators:**
- Reduce time spent on manual weekly meal planning
- Remove guesswork from MOH compliance checking
- Understand which ingredient combinations best fit the RMT budget
- Generate a printable weekly meal plan and shopping list in under 5 minutes

**For Students (Indirect):**
- More consistent access to nutritionally balanced meals
- Reduced likelihood of canteen non-compliance affecting meal quality

**For Schools:**
- A documented, systematic approach to canteen compliance monitoring
- Reduced administrative overhead during MOH audits

### 3.3 Target Users

**Primary:** School canteen operators in Malaysian primary and secondary schools

**Secondary:**
- School administrators monitoring canteen compliance
- PIBG (Parent-Teacher Associations) overseeing student welfare
- District education officers auditing multiple schools

---

## 4. Technical Architecture

### 4.1 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    NutriBudget MY                       │
│                   Web Application                       │
├─────────────────────────────────────────────────────────┤
│  Frontend (Lovable + React)                             │
│  ├── Meal Plan Dashboard                                │
│  ├── Ingredient Manager                                 │
│  ├── Nutrition Visualizer                               │
│  └── Budget Tracker                                     │
├─────────────────────────────────────────────────────────┤
│  Core Logic Engine                                      │
│  ├── Constraint Satisfaction Algorithm                  │
│  ├── Price Calculator                                   │
│  └── Nutrition Analyzer                                 │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                             │
│  ├── Malaysian Ingredient Database                      │
│  ├── MOH Nutrition Guidelines                           │
│  └── User Preferences/History                           │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Algorithm Logic

**Constraint Satisfaction Engine:**

The algorithm filters available ingredients by category (carb, protein, vegetable, fruit), generates all budget-valid combinations, scores each combination by its proximity to the Suku-Suku Separuh serving ratio, and returns the highest-scoring options for each day of the week.

```typescript
export function generateWeeklyMealPlan(ingredients: Ingredient[]): MealPlan[] {
  const available = ingredients.filter(i => i.isAvailable);
  const carbs = available.filter(i => i.category === "carb");
  const proteins = available.filter(i => i.category === "protein");
  const vegetables = available.filter(i => i.category === "vegetable");
  const fruits = available.filter(i => i.category === "fruit");

  for (const day of DAYS) {
    // Step 1: Generate all combinations within budget
    for (const carb of carbs) {
      for (const protein of proteins) {
        for (const veg of vegetables) {
          for (const fruit of fruits) {
            const totalCost = carb.pricePerServing + protein.pricePerServing
                            + veg.pricePerServing + fruit.pricePerServing;

            if (totalCost < BUDGET_MIN || totalCost > BUDGET_MAX) continue;

            // Step 2: Score by serving size ratio vs Suku-Suku Separuh target
            const score = calculateNutritionScore(carb, protein, veg, fruit);
            candidates.push({ ...combo, nutritionScore: score });
          }
        }
      }
    }

    // Step 3: Select highest-scoring non-repeated combination
    candidates.sort((a, b) => b.nutritionScore - a.nutritionScore);
    mealPlans.push(candidates[0]);
  }
}
```

**Nutrition Scoring: Serving Size Ratio**

A critical design decision: the Suku-Suku Separuh score is calculated from **serving size proportions (grams)**.

```typescript
function calculateNutritionScore(
  carb: Ingredient,
  protein: Ingredient,
  veg: Ingredient,
  fruit: Ingredient
): number {
  // Use serving size (grams) — not price — to measure plate proportion
  const totalWeight = carb.servingSize + protein.servingSize
                    + veg.servingSize + fruit.servingSize;

  const carbRatio      = carb.servingSize / totalWeight;
  const proteinRatio   = protein.servingSize / totalWeight;
  const vegFruitRatio  = (veg.servingSize + fruit.servingSize) / totalWeight;

  // Score: 100 minus total deviation from ideal Suku-Suku Separuh ratios
  const score = 100 - (
    Math.abs(carbRatio - 0.25) * 100 +
    Math.abs(proteinRatio - 0.25) * 100 +
    Math.abs(vegFruitRatio - 0.50) * 100
  );

  return Math.max(0, Math.round(score));
}
```

**Nutrition Scoring Formula (Summary):**
```
Suku-Suku Separuh Score = 100 - (
  |actualCarbServingRatio - 0.25| × 100 +
  |actualProteinServingRatio - 0.25| × 100 +
  |actualVegFruitServingRatio - 0.50| × 100
)
```

A score of 100 represents perfect Suku-Suku Separuh compliance. The algorithm targets combinations scoring above 70 before applying randomisation for variety across the week.

### 4.3 Malaysian Ingredient Database

**Structure:**
```json
{
  "ingredient": "Ayam Goreng",
  "category": "protein",
  "servingSize": 100,
  "servingUnit": "g",
  "nutritionalContent": {
    "carbs": 2.5,
    "protein": 25.0,
    "fat": 12.0,
    "fiber": 0
  },
  "basePrice": 3.50,
  "priceUnit": "RM/100g",
  "region": "peninsular",
  "seasonalFactor": 1.0,
  "halal": true
}
```

**Categories:**
- Carbohydrates: Nasi, mi, roti, kentang
- Proteins: Ayam, ikan, daging, tofu, tempeh, telur
- Vegetables: Sayur-sayuran tempatan (kangkung, bayam, sawi)
- Fruits: Buah-buahan tempatan

### 4.4 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Lovable (AI-powered), React 18, TypeScript |
| **Styling** | Tailwind CSS |
| **State Management** | React Context + useReducer |
| **Data Storage** | LocalStorage (MVP) |
| **Export** | jsPDF, html2canvas |
| **Icons** | Lucide React |

**Note on LocalStorage:** The MVP uses browser LocalStorage for data persistence. This means meal plans and ingredient customisations are stored per-device and per-browser. Operators should use the PDF export feature to preserve weekly plans for kitchen use.

---

## 5. Feature Specifications

### 5.1 Core Features (MVP)

#### F1: Smart Meal Plan Generator
**Description:** Automatically generates weekly meal plans optimised for nutrition and budget

**User Stories:**
- As a canteen operator, I want to generate a week's meal plan so that I can save planning time
- As a canteen operator, I want to see multiple meal options so that I can choose based on availability

**Acceptance Criteria:**
- Generate 5-day weekly meal plan
- Each meal targets Suku-Suku Separuh serving ratio (±10% tolerance)
- Total cost per meal between RM3.50 – RM4.00
- Display nutritional breakdown per meal
- Show estimated cost per student

**Priority:** P0 (Must-have)

---

#### F2: Malaysian Ingredient Database
**Description:** Pre-populated database of common Malaysian school canteen ingredients with current pricing

**User Stories:**
- As a canteen operator, I want to select from familiar ingredients so that I can plan realistic meals
- As a canteen operator, I want to update prices when market rates change

**Acceptance Criteria:**
- 50+ common Malaysian ingredients pre-loaded
- Ingredients categorised by type (carb/protein/veg/fruit)
- Price editable by user
- Search and filter functionality
- Add custom ingredients

**Priority:** P0 (Must-have)

---

#### F3: Budget Compliance Dashboard
**Description:** Real-time visualisation of meal costs against RMT budget constraints

**User Stories:**
- As a canteen operator, I want to see if my meals are within budget before finalising
- As a canteen operator, I want to understand which ingredients affect cost most

**Acceptance Criteria:**
- Visual indicator for budget status (green: within, yellow: near limit, red: over)
- Breakdown of cost per ingredient
- Weekly budget summary

**Priority:** P0 (Must-have)

---

#### F4: Nutrition Visualiser
**Description:** Visual representation of Suku-Suku Separuh compliance

**User Stories:**
- As a canteen operator, I want to see if my meals meet MOH guidelines visually
- As a canteen operator, I want to understand portion ratios intuitively

**Acceptance Criteria:**
- Pie chart showing carb/protein/veg-fruit ratios by serving size
- Comparison with ideal 25%/25%/50% split
- Colour coding for compliance (green/yellow/red)
- Per-meal view

**Priority:** P1 (Should-have)

---

#### F5: Export & Print
**Description:** Generate printable meal plans and shopping lists

**User Stories:**
- As a canteen operator, I want to print my meal plan for kitchen reference
- As a canteen operator, I want a shopping list to take to the market

**Acceptance Criteria:**
- PDF export of weekly meal plan
- Shopping list with quantities aggregated
- Print-friendly formatting

**Priority:** P1 (Should-have)

---

### 5.2 Future Features (Post-MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| F6: Cloud Sync | Cross-device meal plan persistence via Firebase | P1 |
| F7: Multi-School Dashboard | Admin view for district officers to monitor compliance across schools | P2 |
| F8: Allergen Management | Track and flag common allergens in meal plans | P2 |
| F9: Seasonal Price Prediction | ML-based price forecasting for better budget planning | P3 |
| F10: Waste Analytics | Track and optimise based on food waste data | P3 |

---

## 6. User Interface Design

### 6.1 Key Screens

**Dashboard (Main View):**
```
┌─────────────────────────────────────────────────┐
│  NutriBudget MY                    [Export]     │
├─────────────────────────────────────────────────┤
│                                                 │
│  Week of: [March 30 - April 3]    [Generate]    │
│                                                 │
│  ┌─────────────┐  ┌─────────────┐               │
│  │ Budget      │  │ Nutrition   │               │
│  │ Status      │  │ Score       │               │
│  │ 🟢 RM3.75   │  │ 🟢 94%      │               │
│  │ (within)    │  │ (compliant) │               │
│  └─────────────┘  └─────────────┘               │
│                                                 │
│  Monday          Tuesday         Wednesday      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐     │
│  │ Nasi     │   │ Mi       │   │ Nasi     │     │
│  │ Ayam     │   │ Sup      │   │ Ikan     │     │
│  │ Goreng   │   │ Ayam     │   │ Kari     │     │
│  │ Sayur    │   │ Sayur    │   │ Sayur    │     │
│  │ Campur   │   │ Campur   │   │ Campur   │     │
│  │          │   │          │   │          │     │
│  │ RM3.80   │   │ RM3.50   │   │ RM3.95   │     │
│  │ ✅       │   │ ✅       │   │ ✅       │     │
│  └──────────┘   └──────────┘   └──────────┘     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 6.2 Design Principles

1. **Simplicity First:** Minimal clicks to generate meal plan
2. **Visual Clarity:** Immediate understanding of budget/nutrition status
3. **Cultural Relevance:** Familiar Malaysian food names and terms in BM
4. **Mobile Responsive:** Many canteen operators use smartphones
5. **Offline Capable:** Core generation works without internet (LocalStorage)

---

## 7. Development Timeline

### Phase 1: Foundation (March 28 - March 31)
- [x] PRD finalisation and approval
- [x] Technical architecture setup
- [x] Ingredient database seeding (50 items)
- [x] Lovable project initialisation

### Phase 2: Core Features (April 1 - April 2)
- [ ] Meal generation algorithm implementation (serving-size ratio scoring)
- [ ] Basic dashboard UI
- [ ] Ingredient manager
- [ ] Budget compliance checker

### Phase 3: Polish & Testing (April 3)
- [ ] Nutrition visualiser
- [ ] Export/print functionality
- [ ] Internal testing against MOH guidelines
- [ ] Bug fixes and optimisation

### Phase 4: Submission (April 4)
- [ ] Final documentation
- [ ] Pitch deck creation
- [ ] Pitching video recording
- [ ] Submission before 23:59 MYT

---

## 8. Impact & Scalability

### 8.1 Direct Impact

**What we can honestly claim at MVP stage:**

NutriBudget MY directly serves school canteen operators — the people responsible for planning and preparing student meals. Each operator who uses the tool to generate a Suku-Suku Separuh compliant weekly plan produces measurable, documented value:

- A complete 5-day meal plan generated in under 5 minutes, replacing a manual process with no existing digital equivalent in Malaysia
- Every generated meal is verified against both the MOH nutrition ratio and the RM3.50–4.00 RMT budget constraint before being shown to the operator
- A printed PDF meal plan and shopping list the operator can use directly in their kitchen and at the market

**Scale context (not a growth claim):** A typical Malaysian primary school canteen serves 300–500 students per day. A single operator using NutriBudget MY consistently means those students receive meals that have been systematically checked against MOH guidelines — something that previously relied entirely on the operator's knowledge and experience.

**Immediate (MVP, 0–3 months):**
- Internal prototype validated with 1–3 canteen operators or school stakeholders
- Documented feedback used to refine ingredient database and algorithm scoring

**Near-term (3–12 months):**
- Expansion of ingredient database based on operator input
- Cloud sync to support cross-device use
- Exploration of pilot partnership with a school or district education office

**Long-term (12+ months):**
- Multi-school dashboard for district-level compliance monitoring
- Integration with MOH compliance reporting workflows
- Potential expansion to preschools (TASKA/TADIKA)

### 8.2 Scalability Path

```
Phase 1: Single Canteen Operator (MVP — LocalStorage)
  ↓
Phase 2: School-Wide (Firebase — multi-user, persistent)
  ↓
Phase 3: District-Level (PostgreSQL + API — multi-school)
  ↓
Phase 4: National (Government-grade infrastructure + MOH integration)
```

Each phase requires a deliberate partnership, funding, or validation milestone before proceeding. This roadmap is directionally credible, not a committed delivery plan.

### 8.3 Sustainability Model

**Revenue Streams (Future):**
- Freemium model: Core meal generation free; advanced analytics and multi-school dashboards paid
- District licensing for school administrators

**Cost Structure:**
- MVP: Near-zero operational cost (Lovable hosting + LocalStorage)
- Phase 2: ~RM200–500/month for Firebase infrastructure

---

## 9. Judging Criteria Alignment

This section presents an honest assessment of where the project stands relative to each judging criterion, including identified gaps.

### 9.1 Creativity & Innovation (25%)

**Strength:** NutriBudget MY is, to our knowledge, the first digital tool that specifically addresses the Suku-Suku Separuh compliance and RMT budget constraint together in a single automated workflow. No comparable tool exists for Malaysian school canteens.

**Gap:** The underlying algorithm (constraint satisfaction + scoring) is well-established in computer science. The novelty is in the domain application and localisation, not the algorithmic technique itself.

### 9.2 Technical Feasibility (30%)

**Strength:** The tech stack (React 18, TypeScript, Vite, jsPDF) is proven and appropriate for the scope. The constraint satisfaction algorithm is computationally feasible for the ingredient database size (50+ items). The serving-size ratio scoring approach is technically sound and aligned with MOH's weight-based guidelines.

**Gap:** MVP uses LocalStorage, which limits multi-device use and data persistence. Real-time price data integration is not implemented; prices are user-editable static values. Both are known limitations with documented mitigation paths.

### 9.3 Impact (20%)

**Strength:** The problem is real, documented, and affects every Malaysian school canteen operating under RMT. The tool directly reduces a canteen operator's compliance risk with zero existing digital alternative.

**Gap:** Impact at MVP stage is limited to the operators who use the tool. Broader student-level impact is downstream and indirect. No third-party validation or pilot data exists at submission time.

### 9.4 Scalability & Sustainability (15%)

**Strength:** Clear, phased technical roadmap from LocalStorage to national infrastructure. Low operational cost at MVP stage. Freemium model is appropriate for the target market.

**Gap:** No partnership, pilot school, or distribution channel has been established. Scalability is a credible plan, not a proven path.

### 9.5 Presentation & Communication (10%)

**Strength:** Clear problem-solution narrative grounded in specific regulatory context (MOH guidelines, RMT budget). Visual prototype demonstrates the full user journey.

**Gap:** No live user testimonials or operator feedback available at submission time.

---

## 10. AI Tools Disclosure

| Tool | Purpose | Usage in Project |
|------|---------|------------------|
| **Claude Code** | PRD writing, architecture planning, code generation | Used to create this PRD, design technical architecture, and generate React components |
| **Lovable** | MVP development, UI/UX design | Primary platform for building the web application |

**Transparency Statement:**
NutriBudget MY was developed with AI assistance for documentation and code generation. The core algorithm logic, nutritional calculations, and business logic were designed with human oversight. All AI-generated outputs were reviewed and validated by the team.

---

## 11. Risk Assessment & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Serving size data missing or inaccurate in ingredient database | **High** | **High** | Pre-populate `servingSize` field for all 50+ ingredients based on standard Malaysian dietary reference values (Malaysian Food Composition Database, Nutrient Composition of Malaysian Foods). Make serving size editable by operator. |
| Algorithm returns zero valid combinations for some ingredient sets | **Medium** | **High** | Widen budget tolerance to ±RM0.20 as a fallback; surface a "no valid plan found" message with actionable guidance (e.g. "add more vegetable options to unlock combinations"). Do not silently return an empty result. |
| Canteen operators resistant to technology adoption | **Medium** | **High** | Prioritise mobile-first UI. Ensure first meal plan can be generated in under 5 minutes with no tutorial required. Offer one-page printed quick-start guide. |
| LocalStorage data loss (browser cleared) | **High** | **Medium** | Clearly communicate LocalStorage limitation in UI. Prompt operator to export PDF after every generated plan. Document Firebase upgrade path. |
| MOH "Suku-Suku Separuh" guidelines updated | **Low** | **High** | Store target ratios as configurable constants, not hardcoded values. Design UI to surface the ratio targets so operators can verify alignment. |
| Combinatorial explosion with large ingredient sets | **Low** | **Medium** | Current ingredient ceiling (~50 items across 4 categories) is computationally safe on client-side. Implement early-exit at 50 valid candidates per day to prevent UI lag if database grows significantly. |

---

## 12. Success Metrics

### 12.1 MVP Success Criteria
- [ ] Generate a valid meal plan in under 5 seconds on a mid-range mobile device
- [ ] 100% of generated meals meet Suku-Suku Separuh serving ratio (±10% tolerance)
- [ ] 100% of generated meals fall within RM3.50–4.00 budget
- [ ] PDF export works correctly on both mobile and desktop browsers
- [ ] First-time user can complete a meal plan generation without any instruction

### 12.2 Post-Launch KPIs (if deployed)
- Meal Plans Generated: target 50+/week in first month
- Export Rate: >60% of generated plans exported as PDF (indicates real-world use)
- Return Visits: operator returns to generate a new plan the following week

---

## 13. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| **Suku-Suku Separuh** | Malaysian MOH nutrition guideline: 1/4 carbs, 1/4 protein, 1/2 vegetables and fruit by serving size |
| **RMT** | Rancangan Makanan Tambahan — Supplementary Food Plan |
| **MOH** | Ministry of Health Malaysia (Kementerian Kesihatan Malaysia) |
| **KPM** | Kementerian Pendidikan Malaysia — Ministry of Education |
| **Constraint Satisfaction** | Algorithmic approach to finding solutions within defined constraints |
| **servingSize** | The standard gram weight of one serving of an ingredient, used to calculate plate proportion ratios |

### Appendix B: Reference Data

**RMT Budget Breakdown (Example):**
- Target: RM3.75 per meal (midpoint of RM3.50–4.00 range)
- Indicative cost distribution:
  - Ingredients: RM2.80 (75%)
  - Labor: RM0.60 (16%)
  - Overhead: RM0.35 (9%)

**Sample Meal Costs:**
| Meal | Ingredients | Est. Cost |
|------|-------------|-----------|
| Nasi Ayam + Sayur | Rice, chicken, mixed vegetables | RM3.60 |
| Mi Sup Ayam | Noodles, chicken, soup base, vegetables | RM3.40 |
| Nasi Ikan Kari | Rice, fish curry, vegetables | RM3.80 |

**Data Sources:**
- MOH Malaysia. *Suku Suku Separuh* nutrition guidelines. Kementerian Kesihatan Malaysia.
- Tee E Siong et al. *Nutrient Composition of Malaysian Foods* (4th ed.). Malaysian Food Composition Database.
- KPM. *Garis Panduan Rancangan Makanan Tambahan (RMT)*. Kementerian Pendidikan Malaysia.

---

**Document End**

*PRD Version 1.1 — Revised for PutraHack 2026 submission. Changes from v1.0: Section 4.2 algorithm logic corrected to use serving-size ratios; Section 8 impact claims revised to reflect MVP scope; Section 9 self-assessment replaced with honest gap analysis; Section 11 risk table expanded with serving-size data risk and LocalStorage risk.*
