# OpenLoanCalc - Testing & Verification Guide

## Quick Start Verification

Follow these steps to verify the installation is working correctly.

## 1. Installation Verification

```bash
# Check Node.js version
node --version
# Should show version 16.0.0 or higher

# Check npm version
npm --version
# Should show version 8.0.0 or higher

# Install dependencies
npm install

# Verify build works
npm run build
# Should complete without errors
```

## 2. Run Development Server

```bash
npm run dev
# Should start server on http://localhost:3000
```

## 3. Test EMI Calculation

### Test Case 1: Personal Loan
| Input | Value |
|-------|-------|
| Email | test@example.com |
| Loan Type | Personal Loan |
| Principal | ₹5,00,000 |
| Interest Rate | 10% p.a. |
| Tenure | 60 months |

**Expected Output:**
- Monthly EMI: ₹9,454
- Total Interest: ₹67,253
- Total Payment: ₹5,67,253

**Calculation Verification:**
- Formula: EMI = P × R × (1+R)^N / ((1+R)^N - 1)
- Monthly Rate: 10 / 100 / 12 = 0.008333
- Calculation: 500000 × 0.008333 × (1.008333)^60 / ((1.008333)^60 - 1)

---

### Test Case 2: Home Loan
| Input | Value |
|-------|-------|
| Email | home@example.com |
| Loan Type | Home Loan |
| Principal | ₹20,00,000 |
| Interest Rate | 6.5% p.a. |
| Tenure | 240 months (20 years) |

**Expected Output:**
- Monthly EMI: ₹13,267
- Total Interest: ₹1,18,408
- Total Payment: ₹21,18,408

---

### Test Case 3: Car Loan
| Input | Value |
|-------|-------|
| Email | car@example.com |
| Loan Type | Car Loan |
| Principal | ₹15,00,000 |
| Interest Rate | 8% p.a. |
| Tenure | 60 months |

**Expected Output:**
- Monthly EMI: ₹30,552
- Total Interest: ₹1,83,120
- Total Payment: ₹16,83,120

---

### Test Case 4: Education Loan
| Input | Value |
|-------|-------|
| Email | edu@example.com |
| Loan Type | Education Loan |
| Principal | ₹10,00,000 |
| Interest Rate | 7% p.a. |
| Tenure | 84 months (7 years) |

**Expected Output:**
- Monthly EMI: ₹14,205
- Total Interest: ₹1,93,220
- Total Payment: ₹11,93,220

---

## 4. Test Features

### Feature 1: EMI Table Generation
1. Complete a calculation (Test Case 1)
2. Scroll down to "EMI Schedule" table
3. Verify:
   - 60 rows for 60 months
   - First month EMI = ₹9,454
   - Principal + Interest = EMI for each month
   - Last month balance ≈ 0
   - Interest decreases each month

### Feature 2: Charts & Visualization
1. After calculation, check "Visual Analysis" section
2. Verify pie chart shows:
   - Principal: ~88%
   - Interest: ~12%
3. Verify line chart shows:
   - Decreasing balance from ₹500K to 0
   - Smooth curve

### Feature 3: Part Payment Analysis
1. Complete a calculation
2. Click "Part Payment Analysis"
3. Add part payment:
   - Month: 12
   - Amount: ₹100,000
   - Charge: 1%
4. Verify:
   - New EMI is lower
   - Interest saved is positive
   - Total charges calculated

### Feature 4: Save Calculation
1. Complete a calculation
2. Click "Save Calculation"
3. Verify message: "✓ Calculation saved successfully!"

## 5. Test Admin Dashboard

### Admin Dashboard Tests

1. Navigate to Admin page (👨‍💼 Admin button)
2. Verify:
   - Table shows all saved calculations
   - Can view email, loan type, EMI, etc.
   - Total records count displayed

### Test Filters

1. Enter email: test@example.com
2. Click "Apply Filters"
3. Verify: Only calculations with this email show

### Test Export

1. Click "Export as CSV"
2. Verify:
   - File downloads as CSV
   - Contains all columns
   - Data is correctly formatted

### Test Delete

1. Click "Delete" on any row
2. Confirm deletion
3. Verify: Row removed from table

## 6. Database Verification

### Verify Supabase Connection

```sql
-- In Supabase SQL Editor
SELECT COUNT(*) FROM loan_calculations;
-- Should show number of saved calculations

-- Verify data structure
SELECT * FROM loan_calculations LIMIT 1;
-- Should show all columns with correct data types
```

### Verify Indexes

```sql
-- Check indexes exist
SELECT indexname FROM pg_indexes 
WHERE tablename = 'loan_calculations';
-- Should show idx_email, idx_loan_type, idx_created_at
```

## 7. Validation Testing

### Test Input Validation

#### Test Case: Invalid Email
- Email: "invalidemail"
- Expected: Error message "Please enter a valid email address"

#### Test Case: Principal Too Low
- Loan Type: Personal Loan
- Principal: ₹5,000 (below min ₹10K)
- Expected: Error "Minimum principal for Personal Loan is ₹10,000"

#### Test Case: Rate Too High
- Loan Type: Personal Loan
- Rate: 25% (above max 20%)
- Expected: Error "Maximum interest rate for Personal Loan is 20%"

#### Test Case: Tenure Too Short
- Loan Type: Home Loan
- Tenure: 36 months (below min 60M)
- Expected: Error "Minimum tenure for Home Loan is 60 months"

## 8. Responsive Design Testing

### Mobile (375px width)
```bash
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select iPhone 12
4. Verify:
   - Form stacks properly
   - Cards are readable
   - Buttons are clickable
   - Tables scroll horizontally
```

### Tablet (768px width)
```bash
1. Select iPad in DevTools
2. Verify:
   - Two-column layout on some sections
   - Charts display properly
   - Navigation works
```

### Desktop (1440px width)
```bash
1. Full browser window
2. Verify:
   - Form on left, results on right
   - Charts side-by-side
   - Admin table fully visible
```

## 9. Performance Testing

### Lighthouse Check
```bash
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Run audit
4. Expected:
   - Performance: > 80
   - Accessibility: > 85
   - Best Practices: > 90
```

### Bundle Size
```bash
npm run build
# Check dist/ folder size
# Should be < 500KB (all assets)
```

## 10. Browser Compatibility

Test on these browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 11. Testing Checklist

### Functionality
- [ ] Calculate EMI correctly
- [ ] Generate 12-month table
- [ ] Display charts
- [ ] Save calculation to database
- [ ] View saved calculations
- [ ] Filter calculations
- [ ] Export CSV
- [ ] Delete calculations

### Validation
- [ ] Email validation works
- [ ] Amount validation works
- [ ] Rate validation works
- [ ] Tenure validation works
- [ ] Error messages display

### UI/UX
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Charts render properly
- [ ] Forms are user-friendly
- [ ] Navigation works

### Performance
- [ ] Page loads fast
- [ ] Calculations are instant
- [ ] Database queries are fast
- [ ] No console errors
- [ ] No memory leaks

### Security
- [ ] Email validated
- [ ] Input sanitized
- [ ] No sensitive data in console
- [ ] Environment variables protected

## 12. Sample Test Data

### Pre-filled Test Cases

```javascript
// Test Case 1: Quick Test
{
  email: "quick@test.com",
  loanType: "personal",
  principal: "100000",
  interestRate: "9",
  tenure: "36"
}

// Test Case 2: Large Loan
{
  email: "large@test.com",
  loanType: "home",
  principal: "5000000",
  interestRate: "5.5",
  tenure: "300"
}

// Test Case 3: Short Tenure
{
  email: "short@test.com",
  loanType: "car",
  principal: "500000",
  interestRate: "12",
  tenure: "12"
}
```

## 13. Troubleshooting Tests

### If EMI is wrong:
1. Check formula in `emiCalculator.js`
2. Verify monthly rate calculation
3. Test with online calculator
4. Check for rounding errors

### If charts don't show:
1. Verify Chart.js installed
2. Check console for errors
3. Verify data format
4. Clear browser cache

### If database save fails:
1. Check Supabase connection
2. Verify environment variables
3. Check table exists
4. Verify email validation
5. Check browser console

### If admin page is empty:
1. Save a calculation first
2. Check database has records
3. Verify filters are correct
4. Check RLS policies

## 14. Load Testing

```bash
# Simulate multiple calculations
for i in {1..100}; do
  curl -X POST http://localhost:3000/api/saveCalculation \
    -H "Content-Type: application/json" \
    -d '{
      "email": "load'$i'@test.com",
      "loan_type": "personal",
      "principal": 500000,
      "emi": 9454.21,
      "total_interest": 67252.60,
      "total_payment": 567252.60
    }'
done
```

## 15. Final Checklist

- [ ] All features working
- [ ] No console errors
- [ ] Database populated
- [ ] Admin dashboard functional
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] Documentation complete
- [ ] Code clean and commented

---

## Quick Test Command

```bash
# One-command test
npm install && npm run build && npm run dev
# Then navigate to http://localhost:3000
```

---

**Remember to test on real devices, not just browser DevTools!**

Last Updated: January 2026
