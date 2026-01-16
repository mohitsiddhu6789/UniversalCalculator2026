# OpenLoanCalc - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install & Run
npm install
npm run dev

# Build
npm run build
npm run preview

# Lint
npm run lint
```

## 📱 Application Pages

### Home Page (`/`)
```
┌─────────────────────────────────────────────────┐
│                  OpenLoanCalc                   │
│        Universal Loan EMI Calculator            │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐    ┌──────────────┐          │
│  │  LoanForm    │    │ EmiResult    │          │
│  │              │    │              │          │
│  │ • Email      │    │ • EMI Amount │          │
│  │ • Loan Type  │    │ • Interest   │          │
│  │ • Amount     │    │ • Payment    │          │
│  │ • Rate       │    │ • Tenure     │          │
│  │ • Tenure     │    └──────────────┘          │
│  │              │                               │
│  │ [Calculate]  │    ┌──────────────┐          │
│  └──────────────┘    │  EmiTable    │          │
│                      │              │          │
│                      │ Schedule     │          │
│                      │ Month-wise   │          │
│                      └──────────────┘          │
│                                                 │
│                   [Charts]                      │
│            [Save]  [Part Payment]              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Admin Page (`/admin`)
```
┌─────────────────────────────────────────────────┐
│              Admin Dashboard                    │
├─────────────────────────────────────────────────┤
│  Filters:                                       │
│  [Email input]  [Loan Type dropdown]  [Filter] │
│                                                 │
│  [Export as CSV]                                │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ Email │ Type │ Amount │ Rate │ EMI │ Del │ │
│  ├───────────────────────────────────────────┤ │
│  │ user1 │ Home │ 5000K  │ 6%   │ 13K │ ✗  │ │
│  │ user2 │ Car  │ 1500K  │ 8%   │ 30K │ ✗  │ │
│  │ user3 │ Pers │ 500K   │ 10%  │ 9K  │ ✗  │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Total Records: 3                              │
└─────────────────────────────────────────────────┘
```

## 📊 EMI Calculation Flow

```
Input Data
├── Email (validation)
├── Loan Type (against rules)
├── Principal (min/max check)
├── Interest Rate (range check)
└── Tenure (valid range)
    ↓
Validation
├── Email format check
├── Numeric validation
├── Range validation
└── Against loan type rules
    ↓
Calculation
├── Monthly Rate = Annual / 12 / 100
├── EMI = P × R × (1+R)^N / ((1+R)^N - 1)
├── Total Interest = EMI × N - P
└── Schedule generation (month-wise)
    ↓
Display Results
├── Summary cards
├── EMI table (12 rows expanded)
├── Charts (Pie + Line)
├── Save option
└── Part payment option
    ↓
Save to Database
├── Email
├── Loan details
├── Calculation results
└── Timestamp
```

## 🔧 Component Hierarchy

```
App
├── Navigation
│   ├── Home Button
│   └── Admin Button
├── Home Page
│   └── LoanForm
│       ├── Email Input
│       ├── Loan Type Select
│       ├── Principal Input
│       ├── Interest Rate Input
│       ├── Tenure Input
│       ├── Error Display
│       └── Calculate Button
│           ↓
│       EmiResult
│       ├── Summary Cards
│       │   ├── Monthly EMI
│       │   ├── Total Interest
│       │   ├── Total Payment
│       │   └── Tenure
│       ├── Save Button
│       ├── Part Payment Button
│       ├── Charts Component
│       │   ├── Pie Chart
│       │   └── Line Chart
│       ├── EmiTable
│       │   ├── Month
│       │   ├── EMI
│       │   ├── Principal
│       │   ├── Interest
│       │   └── Balance
│       └── PartPayment
│           ├── Payment Input
│           ├── Comparison Results
│           └── Interest Saved
└── Admin Page
    └── Admin
        ├── Filters
        │   ├── Email Input
        │   └── Loan Type Select
        ├── Export Button
        └── Calculations Table
            ├── Email
            ├── Loan Type
            ├── Amount
            ├── Rate
            ├── EMI
            ├── Interest
            ├── Date
            └── Delete Button
```

## 📂 File Organization

```
Core Logic (No UI dependencies)
├── utils/emiCalculator.js (Pure functions)
└── utils/loanRules.js (Constants & rules)

Components (React components)
├── LoanForm.jsx (Input & validation)
├── EmiResult.jsx (Display results)
├── EmiTable.jsx (Schedule table)
├── PartPayment.jsx (Part payment analysis)
└── Charts.jsx (Visualizations)

Pages (Full page views)
├── Home.jsx (Calculator page)
└── Admin.jsx (Admin dashboard)

Services (API & external)
└── api.js (Supabase & Axios)

Styles
├── App.css (App-wide styles)
├── index.css (Global styles)
└── Tailwind CSS (Utility classes)

Configuration
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── netlify.toml
```

## 🎯 Function Cheat Sheet

### EMI Calculator
```javascript
// Calculate EMI
const emi = calculateEMI(principal, rate, months);

// Get schedule
const schedule = generateEmiSchedule(principal, rate, months);

// With part payment
const result = calculateWithPartPayment(principal, rate, months, partPayments);

// Pre-closure penalty
const penalty = calculatePreClosurePenalty(balance, penaltyPercent, gstPercent);

// Validate
const validation = validateLoanInput(params);
```

### Loan Rules
```javascript
// Get rules
const rules = getLoanRules(loanType);

// All types
const types = getAllLoanTypes();

// Validate against rules
const valid = validateAgainstRules(type, principal, rate, tenure);
```

### API
```javascript
// Save calculation
await saveCalculation(data);

// Get user calculations
const calcs = await getCalculationsByEmail(email);

// Get all (admin)
const all = await getAllCalculations(filters);

// Delete
await deleteCalculation(id);

// Export
const csv = exportAsCSV(calculations);
```

## 🎨 Colors & Theme

```css
/* Primary Colors */
--primary: #0F172A    /* Slate-900 */
--secondary: #1E293B  /* Slate-800 */
--accent: #3B82F6     /* Blue-500 */

/* Status Colors */
--success: #10B981    /* Green-500 */
--danger: #EF4444     /* Red-500 */
--warning: #F97316    /* Orange-500 */
--info: #8B5CF6       /* Purple-500 */

/* Backgrounds */
--bg-light: #F8FAFC   /* Slate-50 */
--bg-dark: #0F172A    /* Slate-900 */

/* Text Colors */
--text-dark: #0F172A  /* Slate-900 */
--text-light: #94A3B8 /* Slate-400 */
```

## 📈 Loan Rules Limits

```javascript
PERSONAL: {
  minPrincipal: 10000,      // ₹10K
  maxPrincipal: 5000000,    // ₹50L
  minRate: 7,               // 7%
  maxRate: 20,              // 20%
  minTenure: 6,             // 6 months
  maxTenure: 60,            // 60 months
}

HOME: {
  minPrincipal: 500000,     // ₹5L
  maxPrincipal: 100000000,  // ₹10Cr
  minRate: 5,               // 5%
  maxRate: 12,              // 12%
  minTenure: 60,            // 60 months
  maxTenure: 360,           // 360 months
}
// ... and so on
```

## 🔄 State Management Pattern

```javascript
// Form State
const [formData, setFormData] = useState({
  email: '',
  loanType: 'personal',
  principal: '',
  interestRate: '',
  tenure: '',
  tenureType: 'months'
});

// Results State
const [result, setResult] = useState(null);

// Error State
const [errors, setErrors] = useState([]);

// Loading State
const [loading, setLoading] = useState(false);
```

## 🧪 Test Scenarios

```javascript
// Test 1: Quick Calculation
calculateEMI(100000, 9, 36);  // → 3216.92

// Test 2: Large Home Loan
calculateEMI(5000000, 5.5, 300);  // → 28411.25

// Test 3: Short Tenure
calculateEMI(500000, 12, 12);  // → 44347.27

// Test 4: Zero Interest
calculateEMI(100000, 0, 12);  // → 8333.33

// Test 5: Invalid Input
validateLoanInput({ principal: 0, ... });  // → errors
```

## 🚀 Deployment Checklist

```
PRE-DEPLOYMENT:
☐ All features tested locally
☐ Build successful (npm run build)
☐ No console errors
☐ Responsive design verified
☐ Environment variables ready

SETUP:
☐ Supabase project created
☐ Database table created
☐ API keys obtained
☐ GitHub repo ready
☐ Netlify account created

DEPLOY:
☐ Environment variables added to Netlify
☐ Build command set (npm run build)
☐ Publish directory set (dist)
☐ Auto-deploy enabled
☐ Custom domain configured (optional)

POST-DEPLOY:
☐ Test production site
☐ Verify database connectivity
☐ Test all features
☐ Monitor error logs
☐ Setup monitoring/alerts
```

## 🔐 Environment Variables

```env
# Required for frontend
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# Required for backend (Netlify only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# Optional
VITE_API_URL=/.netlify/functions
VITE_APP_NAME=OpenLoanCalc
```

## 📞 Useful Links

- **Repo**: GitHub (your-repo-url)
- **Docs**: README.md, SETUP.md, API.md
- **Issues**: GitHub Issues
- **Live**: https://your-netlify-site.netlify.app

## ✅ Common Tasks

```bash
# Start development
npm run dev

# Build for production
npm run build

# Test production build
npm run preview

# Clean up
rm -rf node_modules dist
npm cache clean --force

# Update dependencies
npm update

# Check outdated packages
npm outdated
```

## 🎓 Learning Path

1. **Day 1**: Setup & Run Locally
   - Install dependencies
   - Configure environment
   - Run on http://localhost:3000

2. **Day 2**: Understand Code
   - Read README.md
   - Review component structure
   - Check utility functions

3. **Day 3**: Deploy
   - Push to GitHub
   - Connect to Netlify
   - Deploy and test

4. **Day 4+**: Extend & Customize
   - Add new loan types
   - Customize rules
   - Add features

---

**Print this guide for quick reference!**

Last Updated: January 2026
