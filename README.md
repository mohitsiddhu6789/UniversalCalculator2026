# Universal - Free EMI & Loan Calculator

A modern, user-friendly web application to calculate EMI, loan repayment schedules, and analyze part payment strategies.

## Features

- ✅ **EMI Calculator** - Calculate monthly EMI for any loan
- ✅ **Repayment Schedule** - View month-wise breakdown
- ✅ **Part Payment Analysis** - Analyze prepayment benefits
- ✅ **Save Calculations** - Store calculations in database
- ✅ **Admin Dashboard** - View all saved calculations
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **SEO Optimized** - Full SEO implementation

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Vite
- **Backend**: Netlify Functions
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- Netlify account

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd c:\Users\mohit\source\repos

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Update .env.local with your credentials
```

### Environment Setup

Edit `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_postgresql_connection_string
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Netlify (with GitHub)
# Push to GitHub and connect to Netlify
```

## Project Structure

```
src/
├── components/          # React components
│   ├── SEO.jsx         # SEO meta tags
│   ├── LoanForm.jsx    # Loan input form
│   ├── EmiResult.jsx   # Results display
│   ├── PartPayment.jsx # Part payment analyzer
│   └── Charts.jsx      # Visualizations
├── pages/              # Full page components
│   ├── Home.jsx        # Main calculator
│   ├── PartPaymentCalculator.jsx # Part payment page
│   └── Admin.jsx       # Admin dashboard
├── services/
│   └── api.js          # API calls
├── utils/
│   ├── emiCalculator.js # EMI calculation logic
│   └── loanRules.js    # Loan type rules
└── App.jsx             # Main component

netlify/functions/
├── saveCalculation.js  # Save to database
├── savePartPaymentEmail.js # Save email
└── getCalculations.js  # Fetch calculations
```

## API Endpoints

### POST /.netlify/functions/saveCalculation
Save a calculation to database
```json
{
  "email": "user@example.com",
  "loanType": "personal",
  "principal": 500000,
  "interestRate": 10,
  "tenureMonths": 60,
  "emi": 9454,
  "totalInterest": 67241,
  "totalPayment": 567241
}
```

### POST /.netlify/functions/savePartPaymentEmail
Save part payment email
```json
{
  "email": "user@example.com",
  "partPaymentData": { ... }
}
```

### GET /.netlify/functions/getCalculations
Fetch calculations with optional filters
```
?email=user@example.com&loanType=personal
```

## Database Schema

```sql
CREATE TABLE loan_calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  loan_type VARCHAR(50) NOT NULL,
  principal NUMERIC NOT NULL,
  interest_rate NUMERIC NOT NULL,
  tenure_months INTEGER NOT NULL,
  emi NUMERIC NOT NULL,
  total_interest NUMERIC NOT NULL,
  total_payment NUMERIC NOT NULL,
  calculation_type VARCHAR(50) DEFAULT 'standard',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## SEO Features

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph & Twitter Cards
- ✅ Canonical URLs
- ✅ Structured Data (Schema.org)
- ✅ Robots.txt & Sitemap.xml
- ✅ Mobile optimization
- ✅ Performance optimization

## Troubleshooting

### 404 Error on API calls
- Verify .env.local has correct credentials
- Check netlify.toml exists
- Ensure functions are deployed

### Database connection error
- Verify Supabase credentials
- Check DATABASE_URL format
- Ensure RLS policies are enabled

### SEO not working
- Check Helmet component is loaded
- Verify canonical URLs are correct
- Test with Google Search Console

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, please open a GitHub issue.
