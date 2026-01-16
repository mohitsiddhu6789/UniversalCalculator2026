# OpenLoanCalc - API Documentation

## Overview

OpenLoanCalc provides both frontend utilities and backend APIs for EMI calculations and data management.

## Frontend API

### EMI Calculator Functions

#### `calculateEMI(principal, annualRate, months)`

Calculates the monthly Equated Monthly Installment (EMI).

**Parameters:**
- `principal` (number): Loan amount in rupees
- `annualRate` (number): Annual interest rate as percentage (e.g., 10 for 10%)
- `months` (number): Tenure in months

**Returns:** (number) Monthly EMI amount

**Example:**
```javascript
import { calculateEMI } from './utils/emiCalculator';

const emi = calculateEMI(500000, 10, 60);
// Returns: 9454.21
```

---

#### `calculateTotalInterest(emi, months, principal)`

Calculates the total interest payable over the loan tenure.

**Parameters:**
- `emi` (number): Monthly EMI amount
- `months` (number): Tenure in months
- `principal` (number): Original loan amount

**Returns:** (number) Total interest payable

**Example:**
```javascript
const totalInterest = calculateTotalInterest(9454.21, 60, 500000);
// Returns: 67252.60
```

---

#### `generateEmiSchedule(principal, annualRate, months)`

Generates a month-by-month EMI payment schedule.

**Parameters:**
- `principal` (number): Loan amount
- `annualRate` (number): Annual interest rate percentage
- `months` (number): Tenure in months

**Returns:** (Array) Array of schedule objects

**Schedule Object Structure:**
```javascript
{
  month: 1,              // Month number
  emi: 9454.21,          // Monthly installment
  principal: 2954.21,    // Principal component
  interest: 6500.00,     // Interest component
  balance: 497045.79     // Outstanding balance
}
```

**Example:**
```javascript
import { generateEmiSchedule } from './utils/emiCalculator';

const schedule = generateEmiSchedule(500000, 10, 60);
// Returns array with 60 objects
console.log(schedule[0]);
// {
//   month: 1,
//   emi: 9454.21,
//   principal: 2954.21,
//   interest: 6500.00,
//   balance: 497045.79
// }
```

---

#### `calculateWithPartPayment(principal, annualRate, months, partPayments)`

Calculates EMI changes after making part payments.

**Parameters:**
- `principal` (number): Original loan amount
- `annualRate` (number): Annual interest rate
- `months` (number): Total tenure in months
- `partPayments` (Array): Array of part payment objects

**Part Payment Object:**
```javascript
{
  month: 12,        // Month when payment is made
  amount: 100000,   // Part payment amount
  chargePercent: 1  // Charge percentage (optional)
}
```

**Returns:** (Object) Calculation result

**Result Object Structure:**
```javascript
{
  originalEMI: 9454.21,          // Original monthly EMI
  newEMI: 8500.00,               // New EMI after part payment
  totalInterestOriginal: 67252.60, // Original total interest
  totalInterestNew: 45000.00,    // Interest after part payment
  interestSaved: 22252.60,       // Interest saved
  totalPartPaymentCharges: 1000  // Charges on part payment
}
```

**Example:**
```javascript
import { calculateWithPartPayment } from './utils/emiCalculator';

const partPayments = [
  { month: 12, amount: 100000, chargePercent: 1 },
  { month: 24, amount: 50000, chargePercent: 1 }
];

const result = calculateWithPartPayment(500000, 10, 60, partPayments);
// Returns comparison data
```

---

#### `calculatePreClosurePenalty(remainingBalance, penaltyPercent, gstPercent)`

Calculates pre-closure penalty on outstanding balance.

**Parameters:**
- `remainingBalance` (number): Outstanding loan balance
- `penaltyPercent` (number): Penalty percentage (default: 2%)
- `gstPercent` (number): GST percentage (default: 18%)

**Returns:** (Object) Penalty breakdown

**Example:**
```javascript
import { calculatePreClosurePenalty } from './utils/emiCalculator';

const penalty = calculatePreClosurePenalty(450000, 2, 18);
// Returns: {
//   penalty: 9000,
//   gst: 1620,
//   totalPenalty: 10620
// }
```

---

#### `validateLoanInput(params)`

Validates loan input parameters.

**Parameters:**
- `params` (Object):
  - `principal` (number): Loan amount
  - `interestRate` (number): Interest rate
  - `tenure` (number): Tenure in months

**Returns:** (Object) Validation result

**Example:**
```javascript
import { validateLoanInput } from './utils/emiCalculator';

const validation = validateLoanInput({
  principal: 500000,
  interestRate: 10,
  tenure: 60
});

// Returns: {
//   isValid: true,
//   errors: []
// }
```

---

### Loan Rules Functions

#### `getLoanRules(loanType)`

Gets rules and constraints for a specific loan type.

**Parameters:**
- `loanType` (string): One of LOAN_TYPES constants

**Returns:** (Object) Loan rules

**Example:**
```javascript
import { getLoanRules } from './utils/loanRules';

const rules = getLoanRules('personal');
// Returns: {
//   name: 'Personal Loan',
//   minPrincipal: 10000,
//   maxPrincipal: 5000000,
//   minRate: 7,
//   maxRate: 20,
//   minTenure: 6,
//   maxTenure: 60,
//   preClosurePenalty: 2,
//   defaultPenalty: 1
// }
```

---

#### `getAllLoanTypes()`

Returns all available loan types.

**Returns:** (Array) Loan type objects

**Example:**
```javascript
import { getAllLoanTypes } from './utils/loanRules';

const loanTypes = getAllLoanTypes();
// Returns: [
//   { id: 'personal', name: 'Personal Loan' },
//   { id: 'home', name: 'Home Loan' },
//   ...
// ]
```

---

#### `validateAgainstRules(loanType, principal, rate, tenure)`

Validates input against loan-type-specific rules.

**Parameters:**
- `loanType` (string): Loan type identifier
- `principal` (number): Loan amount
- `rate` (number): Interest rate
- `tenure` (number): Tenure in months

**Returns:** (Object) Validation result

**Example:**
```javascript
import { validateAgainstRules } from './utils/loanRules';

const validation = validateAgainstRules('home', 5000000, 8, 300);
// Returns: {
//   isValid: true,
//   errors: []
// }
```

---

## Backend API (Netlify Functions)

### Save Calculation

**Endpoint:** `POST /.netlify/functions/saveCalculation`

**Request Body:**
```json
{
  "email": "user@example.com",
  "loan_type": "personal",
  "principal": 500000,
  "interest_rate": 10,
  "tenure_months": 60,
  "emi": 9454.21,
  "total_interest": 67252.60,
  "total_payment": 567252.60
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Calculation saved successfully",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "loan_type": "personal",
    "principal": 500000,
    "created_at": "2026-01-15T10:30:00Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "Missing required fields"
}
```

**Status Codes:**
- `200`: Success
- `400`: Bad request (missing fields)
- `405`: Method not allowed
- `500`: Server error

---

### Get Calculations

**Endpoint:** `GET /.netlify/functions/getCalculations`

**Query Parameters:**
- `email` (optional): Filter by email
- `loanType` (optional): Filter by loan type

**Example Requests:**
```
GET /.netlify/functions/getCalculations
GET /.netlify/functions/getCalculations?email=user@example.com
GET /.netlify/functions/getCalculations?loanType=personal
GET /.netlify/functions/getCalculations?email=user@example.com&loanType=personal
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "loan_type": "personal",
      "principal": 500000,
      "interest_rate": 10,
      "tenure_months": 60,
      "emi": 9454.21,
      "total_interest": 67252.60,
      "total_payment": 567252.60,
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

## Database Schema

### loan_calculations Table

```sql
CREATE TABLE loan_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
```

**Columns:**
- `id`: Unique identifier (UUID)
- `email`: User email address
- `loan_type`: Type of loan (personal, home, car, etc.)
- `principal`: Loan amount in rupees
- `interest_rate`: Annual interest rate as percentage
- `tenure_months`: Loan tenure in months
- `emi`: Monthly EMI amount
- `total_interest`: Total interest payable
- `total_payment`: Total amount to be paid
- `created_at`: Timestamp of record creation

**Indexes:**
- `idx_email`: For filtering by email
- `idx_loan_type`: For filtering by loan type
- `idx_created_at`: For sorting by date

---

## Usage Examples

### Complete Flow Example

```javascript
import { 
  calculateEMI, 
  generateEmiSchedule, 
  validateLoanInput 
} from './utils/emiCalculator';
import { saveCalculation } from './services/api';

// Step 1: Validate input
const validation = validateLoanInput({
  principal: 500000,
  interestRate: 10,
  tenure: 60
});

if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
  return;
}

// Step 2: Calculate EMI
const principal = 500000;
const interestRate = 10;
const months = 60;

const emi = calculateEMI(principal, interestRate, months);
const schedule = generateEmiSchedule(principal, interestRate, months);
const totalInterest = emi * months - principal;
const totalPayment = principal + totalInterest;

// Step 3: Save to database
const result = await saveCalculation({
  email: 'user@example.com',
  loan_type: 'personal',
  principal,
  interest_rate: interestRate,
  tenure_months: months,
  emi: Math.round(emi * 100) / 100,
  total_interest: Math.round(totalInterest * 100) / 100,
  total_payment: Math.round(totalPayment * 100) / 100
});

console.log('Calculation saved:', result);
```

---

## Loan Types Reference

| ID | Name | Min Amount | Max Amount | Min Rate | Max Rate | Min Tenure | Max Tenure |
|---|---|---|---|---|---|---|---|
| `personal` | Personal Loan | ₹10K | ₹50L | 7% | 20% | 6M | 60M |
| `home` | Home Loan | ₹5L | ₹10Cr | 5% | 12% | 60M | 360M |
| `car` | Car Loan | ₹1L | ₹50L | 6% | 15% | 12M | 84M |
| `education` | Education Loan | ₹50K | ₹1Cr | 4% | 12% | 12M | 120M |
| `business` | Business Loan | ₹1L | ₹5Cr | 8% | 18% | 12M | 120M |
| `overdraft` | Overdraft | ₹50K | ₹1Cr | 10% | 18% | 1M | 60M |
| `custom` | Custom Loan | ₹1K | ₹10Cr | 0% | 50% | 1M | 360M |

---

## Error Handling

### Common Errors

**Invalid Email:**
```javascript
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error('Invalid email format');
}
```

**Principal Out of Range:**
```javascript
if (principal < rules.minPrincipal || principal > rules.maxPrincipal) {
  console.error('Principal outside allowed range');
}
```

**Rate Out of Range:**
```javascript
if (rate < rules.minRate || rate > rules.maxRate) {
  console.error('Interest rate outside allowed range');
}
```

---

## Rate Limits

- **Free Tier**: 5,000 requests/day
- **Pro Tier**: Unlimited
- **Rate Limit Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

---

## Changelog

### Version 1.0.0 (2026-01-15)
- Initial release
- 7 loan types supported
- EMI calculation with schedule generation
- Part payment analysis
- Pre-closure penalty calculation
- Email-based history tracking
- Admin dashboard
- CSV export functionality

---

## Support

For API issues or questions:
- Create an issue on GitHub
- Email: support@openloancalc.com
- Check documentation in SETUP.md

---

Last Updated: January 2026
