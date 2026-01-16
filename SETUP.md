# OpenLoanCalc - Setup & Configuration Guide

## Prerequisites

Before you begin, ensure you have:
- Node.js 16+ installed
- A Supabase account (free tier available)
- A Netlify account (free tier available)
- Git for version control
- Basic knowledge of React and Node.js

## Step-by-Step Setup

### 1. Initial Project Setup

```bash
# Clone or create project
cd c:\Users\mohit\source\repos

# Install dependencies
npm install
```

### 2. Supabase Database Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Note your **Project URL** and **API Key**

#### Create Database Table

In Supabase SQL Editor, run:

```sql
-- Create loan_calculations table
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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_email ON loan_calculations(email);
CREATE INDEX idx_loan_type ON loan_calculations(loan_type);
CREATE INDEX idx_created_at ON loan_calculations(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE loan_calculations ENABLE ROW LEVEL SECURITY;

-- Create policies for security
CREATE POLICY "Enable read access for all users"
  ON loan_calculations FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON loan_calculations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable delete for admin users"
  ON loan_calculations FOR DELETE
  USING (true);
```

### 3. Environment Configuration

Create `.env.local` file:

```bash
# Copy from template
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Database Connection (for Netlify Functions)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jorzwetxapgqzthxabrb.supabase.co:5432/postgres

# API Configuration
VITE_API_URL=/.netlify/functions

# App Configuration
VITE_APP_NAME=OpenLoanCalc
```

### 4. Local Development

```bash
# Start development server
npm run dev

# This will:
# - Start Vite dev server on http://localhost:3000
# - Enable hot module reloading
# - Watch for file changes
```

Open http://localhost:3000 in your browser.

### 5. Build for Production

```bash
# Create optimized build
npm run build

# Output will be in ./dist directory
npm run preview  # Preview production build locally
```

## Netlify Deployment

### Prerequisites for Deployment
- GitHub repository with your code
- Netlify account connected to GitHub

### Deployment Steps

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial OpenLoanCalc commit"
git push origin main
```

2. **Connect to Netlify**
   - Go to netlify.com
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Base directory**: (leave empty)

3. **Add Environment Variables**
   - In Netlify: Site Settings → Environment Variables
   - Add these variables:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     ```

4. **Configure Netlify Functions**
   - Functions are in `/netlify/functions/`
   - Netlify automatically deploys functions
   - Accessible at `/.netlify/functions/functionName`

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_SUPABASE_URL` | Yes | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Yes | Supabase anonymous API key |
| `DATABASE_URL` | Yes* | PostgreSQL connection string (*required for Netlify Functions to save data) |
| `VITE_API_URL` | No | API endpoint (default: /.netlify/functions) |
| `VITE_APP_NAME` | No | Application name (default: OpenLoanCalc) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes* | Service role key for Netlify Functions (*required for deployment) |

## Project Structure Explanation

```
src/
├── components/          # React components
│   ├── LoanForm.jsx    # Main form for EMI calculation
│   ├── EmiResult.jsx   # Results display with save button
│   ├── EmiTable.jsx    # Month-wise EMI schedule
│   ├── PartPayment.jsx # Part payment analysis tool
│   └── Charts.jsx      # Chart visualizations
├── pages/              # Full page components
│   ├── Home.jsx       # Main calculator page
│   └── Admin.jsx      # Admin dashboard
├── services/
│   └── api.js         # API calls and Supabase client
├── utils/             # Utility functions
│   ├── emiCalculator.js # EMI calculation logic
│   └── loanRules.js    # Loan types and validation
├── App.jsx            # Main app component
├── App.css            # App-wide styles
├── index.css          # Global styles with Tailwind
└── main.jsx           # React entry point

netlify/functions/     # Serverless functions
├── saveCalculation.js # Save calculation to DB
└── getCalculations.js # Fetch calculations from DB
```

## Testing the Application

### Test EMI Calculation
1. Navigate to the home page
2. Enter test data:
   - Email: test@example.com
   - Loan Type: Personal Loan
   - Amount: 500,000
   - Rate: 10%
   - Tenure: 60 months
3. Expected EMI: ₹9,454

### Test Database Save
1. Complete a calculation
2. Click "Save Calculation"
3. Check Supabase dashboard → loan_calculations table
4. Verify record was inserted

### Test Admin Dashboard
1. Navigate to Admin page
2. View all saved calculations
3. Filter by email or loan type
4. Export as CSV

## Troubleshooting

### Issue: npm install fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Vite not starting
**Solution:**
```bash
# Check Node version
node --version  # Should be 16+

# Kill existing process on port 3000
# Windows: netstat -ano | findstr :3000

# Try with different port
npm run dev -- --port 3001
```

### Issue: Supabase connection error
**Solution:**
```
1. Verify .env.local has correct credentials
2. Check Supabase project is active
3. Verify API key is correct (check Supabase settings)
4. Test connection with curl or Postman
```

### Issue: Netlify Functions not working
**Solution:**
```
1. Ensure netlify.toml exists in root
2. Check functions directory structure
3. Verify environment variables in Netlify dashboard
4. Check Netlify build logs for errors
```

## Performance Optimization

### Frontend
- Vite automatically optimizes assets
- React.lazy() for code splitting
- Images should be < 100KB

### Database
- Indexes created for email, loan_type, created_at
- Use pagination for large result sets
- Archive old records periodically

### Netlify Functions
- Keep function size < 50MB
- Use environment variables for config
- Add error handling and logging

## Security Checklist

- [ ] Environment variables in .env.local (not in git)
- [ ] Supabase RLS policies enabled
- [ ] Service role key only on backend
- [ ] Input validation on both sides
- [ ] HTTPS enforced on Netlify
- [ ] Rate limiting configured (optional)
- [ ] Regular backups of Supabase database
- [ ] Monitor function logs regularly

## Next Steps

1. Customize loan rules in `src/utils/loanRules.js`
2. Add additional loan types as needed
3. Set up email notifications (optional)
4. Add analytics tracking
5. Configure custom domain on Netlify
6. Set up CI/CD pipeline
7. Add unit tests with Jest
8. Set up monitoring and alerts

## Support Resources

- **Vite Docs**: https://vitejs.dev/
- **React Docs**: https://react.dev/
- **Supabase Docs**: https://supabase.com/docs
- **Netlify Docs**: https://docs.netlify.com/
- **Tailwind CSS**: https://tailwindcss.com/docs

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Linting (if configured)
npm run lint             # Check code quality

# Clean up
npm cache clean --force  # Clear npm cache
rm -rf node_modules     # Remove dependencies
rm -rf dist             # Remove build output
```

## Version Information

- React: 18.2.0+
- Vite: 5.0.0+
- Tailwind CSS: 3.3.6+
- Node: 16.0.0+
- npm: 8.0.0+

---

For detailed documentation, see [README.md](../README.md)
