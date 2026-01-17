-- =====================================================
-- EMI Calculator Database Schema - PostgreSQL
-- =====================================================

-- Create database (if using local PostgreSQL)
-- CREATE DATABASE emi_calculator_db;
-- \c emi_calculator_db;

-- =====================================================
-- 1. EMI Calculations Table
-- =====================================================
CREATE TABLE IF NOT EXISTS emi_calculations (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  loan_type VARCHAR(50) NOT NULL,
  emi_type VARCHAR(20) NOT NULL,
  principal DECIMAL(15, 2) NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  tenure_months INTEGER NOT NULL,
  monthly_emi DECIMAL(15, 2) NOT NULL,
  total_interest DECIMAL(15, 2) NOT NULL,
  total_payment DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE emi_calculations IS 'Stores EMI calculations from the home screen';
COMMENT ON COLUMN emi_calculations.id IS 'Unique calculation ID';
COMMENT ON COLUMN emi_calculations.email IS 'User email address';
COMMENT ON COLUMN emi_calculations.loan_type IS 'Type of loan (Personal, Home, Auto, Education, Business)';
COMMENT ON COLUMN emi_calculations.emi_type IS 'EMI calculation type (reducing, flat)';
COMMENT ON COLUMN emi_calculations.principal IS 'Loan principal amount';
COMMENT ON COLUMN emi_calculations.interest_rate IS 'Annual interest rate (%)';
COMMENT ON COLUMN emi_calculations.tenure_months IS 'Loan tenure in months';
COMMENT ON COLUMN emi_calculations.monthly_emi IS 'Calculated monthly EMI';
COMMENT ON COLUMN emi_calculations.total_interest IS 'Total interest payable';
COMMENT ON COLUMN emi_calculations.total_payment IS 'Total amount to be paid (principal + interest)';
COMMENT ON COLUMN emi_calculations.created_at IS 'Calculation creation timestamp';
COMMENT ON COLUMN emi_calculations.updated_at IS 'Last update timestamp';

-- Create indexes
CREATE INDEX idx_email ON emi_calculations(email);
CREATE INDEX idx_loan_type ON emi_calculations(loan_type);
CREATE INDEX idx_created_at ON emi_calculations(created_at);
CREATE INDEX idx_email_loan_type ON emi_calculations(email, loan_type);
CREATE INDEX idx_email_created_at ON emi_calculations(email, created_at);

-- =====================================================
-- 2. EMI Schedule Details Table
-- =====================================================
CREATE TABLE IF NOT EXISTS emi_schedules (
  id BIGSERIAL PRIMARY KEY,
  calculation_id BIGINT NOT NULL,
  month_number INTEGER NOT NULL,
  month_emi DECIMAL(15, 2) NOT NULL,
  principal_paid DECIMAL(15, 2) NOT NULL,
  interest_paid DECIMAL(15, 2) NOT NULL,
  remaining_balance DECIMAL(15, 2) NOT NULL,
  FOREIGN KEY (calculation_id) REFERENCES emi_calculations(id) ON DELETE CASCADE
);

COMMENT ON TABLE emi_schedules IS 'Stores month-by-month EMI schedule details';
COMMENT ON COLUMN emi_schedules.id IS 'Unique schedule entry ID';
COMMENT ON COLUMN emi_schedules.calculation_id IS 'Reference to parent calculation';
COMMENT ON COLUMN emi_schedules.month_number IS 'Month number in the schedule';
COMMENT ON COLUMN emi_schedules.month_emi IS 'EMI for this month';
COMMENT ON COLUMN emi_schedules.principal_paid IS 'Principal portion paid in this month';
COMMENT ON COLUMN emi_schedules.interest_paid IS 'Interest portion paid in this month';
COMMENT ON COLUMN emi_schedules.remaining_balance IS 'Outstanding balance after this month';

-- Create indexes
CREATE INDEX idx_schedule_calculation_id ON emi_schedules(calculation_id);
CREATE INDEX idx_schedule_month_number ON emi_schedules(month_number);

-- =====================================================
-- 3. Part Payments Table
-- =====================================================
CREATE TABLE IF NOT EXISTS part_payments (
  id BIGSERIAL PRIMARY KEY,
  calculation_id BIGINT NOT NULL,
  payment_month INTEGER NOT NULL,
  payment_amount DECIMAL(15, 2) NOT NULL,
  penalty_percent DECIMAL(5, 2) NOT NULL,
  penalty_amount DECIMAL(15, 2) NOT NULL,
  strategy VARCHAR(20) NOT NULL,
  interest_saved DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (calculation_id) REFERENCES emi_calculations(id) ON DELETE CASCADE
);

COMMENT ON TABLE part_payments IS 'Stores part payment details and analysis';
COMMENT ON COLUMN part_payments.id IS 'Unique part payment ID';
COMMENT ON COLUMN part_payments.calculation_id IS 'Reference to parent calculation';
COMMENT ON COLUMN part_payments.payment_month IS 'Month when part payment is made';
COMMENT ON COLUMN part_payments.payment_amount IS 'Amount of part payment';
COMMENT ON COLUMN part_payments.penalty_percent IS 'Prepayment penalty percentage';
COMMENT ON COLUMN part_payments.penalty_amount IS 'Calculated penalty amount';
COMMENT ON COLUMN part_payments.strategy IS 'Strategy applied (emi, tenure, principal)';
COMMENT ON COLUMN part_payments.interest_saved IS 'Interest saved by this part payment';
COMMENT ON COLUMN part_payments.created_at IS 'Part payment creation timestamp';

-- Create indexes
CREATE INDEX idx_payment_calculation_id ON part_payments(calculation_id);
CREATE INDEX idx_payment_month ON part_payments(payment_month);

-- =====================================================
-- 4. Users Table (Optional - for user management)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE users IS 'Stores user information';
COMMENT ON COLUMN users.id IS 'Unique user ID';
COMMENT ON COLUMN users.email IS 'User email address';
COMMENT ON COLUMN users.full_name IS 'User full name';
COMMENT ON COLUMN users.phone IS 'User phone number';
COMMENT ON COLUMN users.is_admin IS 'Admin user flag';
COMMENT ON COLUMN users.created_at IS 'User registration timestamp';
COMMENT ON COLUMN users.updated_at IS 'Last update timestamp';

-- Create indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_is_admin ON users(is_admin);

-- =====================================================
-- 5. Audit Log Table (Optional - for tracking changes)
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_email VARCHAR(255),
  action VARCHAR(50) NOT NULL,
  table_name VARCHAR(50) NOT NULL,
  record_id BIGINT,
  changes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE audit_logs IS 'Audit trail for all database operations';
COMMENT ON COLUMN audit_logs.id IS 'Unique audit log ID';
COMMENT ON COLUMN audit_logs.user_email IS 'Email of user performing action';
COMMENT ON COLUMN audit_logs.action IS 'Action performed (CREATE, UPDATE, DELETE)';
COMMENT ON COLUMN audit_logs.table_name IS 'Table affected';
COMMENT ON COLUMN audit_logs.record_id IS 'ID of affected record';
COMMENT ON COLUMN audit_logs.changes IS 'JSON object storing what changed';
COMMENT ON COLUMN audit_logs.created_at IS 'Action timestamp';

-- Create indexes
CREATE INDEX idx_audit_user_email ON audit_logs(user_email);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- View: Summary of all calculations by email
CREATE OR REPLACE VIEW v_calculations_summary AS
SELECT 
  email,
  COUNT(*) as total_calculations,
  ROUND(AVG(monthly_emi)::NUMERIC, 2) as avg_monthly_emi,
  ROUND(SUM(principal)::NUMERIC, 2) as total_principal,
  ROUND(AVG(interest_rate)::NUMERIC, 2) as avg_interest_rate,
  MAX(created_at) as last_calculation
FROM emi_calculations
GROUP BY email;

-- View: Statistics by loan type
CREATE OR REPLACE VIEW v_loan_type_stats AS
SELECT 
  loan_type,
  COUNT(*) as total_loans,
  ROUND(AVG(principal)::NUMERIC, 2) as avg_principal,
  ROUND(AVG(monthly_emi)::NUMERIC, 2) as avg_emi,
  ROUND(AVG(interest_rate)::NUMERIC, 2) as avg_rate,
  ROUND(SUM(total_interest)::NUMERIC, 2) as total_interest_collected
FROM emi_calculations
GROUP BY loan_type;

-- =====================================================
-- FUNCTIONS FOR AUTOMATION
-- =====================================================

-- Function: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update emi_calculations timestamp
CREATE TRIGGER update_emi_calculations_updated_at
BEFORE UPDATE ON emi_calculations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger: Update users timestamp
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORED PROCEDURES (FUNCTIONS IN POSTGRESQL)
-- =====================================================

-- Function: Get calculation details with schedule
CREATE OR REPLACE FUNCTION get_calculation_details(p_calculation_id BIGINT)
RETURNS TABLE (
  calc_id BIGINT,
  calc_email VARCHAR,
  calc_loan_type VARCHAR,
  calc_emi_type VARCHAR,
  calc_principal DECIMAL,
  calc_interest_rate DECIMAL,
  calc_tenure_months INTEGER,
  calc_monthly_emi DECIMAL,
  calc_total_interest DECIMAL,
  calc_total_payment DECIMAL,
  schedule_month INTEGER,
  schedule_emi DECIMAL,
  schedule_principal DECIMAL,
  schedule_interest DECIMAL,
  schedule_balance DECIMAL
) AS $$
SELECT 
  ec.id,
  ec.email,
  ec.loan_type,
  ec.emi_type,
  ec.principal,
  ec.interest_rate,
  ec.tenure_months,
  ec.monthly_emi,
  ec.total_interest,
  ec.total_payment,
  es.month_number,
  es.month_emi,
  es.principal_paid,
  es.interest_paid,
  es.remaining_balance
FROM emi_calculations ec
LEFT JOIN emi_schedules es ON ec.id = es.calculation_id
WHERE ec.id = p_calculation_id
ORDER BY es.month_number;
$$ LANGUAGE SQL;

-- Function: Get user's calculation history
CREATE OR REPLACE FUNCTION get_user_calculations(p_email VARCHAR(255))
RETURNS TABLE (
  id BIGINT,
  email VARCHAR,
  loan_type VARCHAR,
  emi_type VARCHAR,
  principal DECIMAL,
  interest_rate DECIMAL,
  tenure_months INTEGER,
  monthly_emi DECIMAL,
  total_interest DECIMAL,
  total_payment DECIMAL,
  created_at TIMESTAMP
) AS $$
SELECT 
  ec.id,
  ec.email,
  ec.loan_type,
  ec.emi_type,
  ec.principal,
  ec.interest_rate,
  ec.tenure_months,
  ec.monthly_emi,
  ec.total_interest,
  ec.total_payment,
  ec.created_at
FROM emi_calculations ec
WHERE ec.email = p_email
ORDER BY ec.created_at DESC;
$$ LANGUAGE SQL;

-- Function: Get loan statistics
CREATE OR REPLACE FUNCTION get_loan_statistics()
RETURNS TABLE (
  loan_type VARCHAR,
  total_loans BIGINT,
  avg_principal DECIMAL,
  avg_emi DECIMAL,
  avg_rate DECIMAL,
  total_interest DECIMAL
) AS $$
SELECT 
  ec.loan_type,
  COUNT(*)::BIGINT,
  ROUND(AVG(ec.principal)::NUMERIC, 2),
  ROUND(AVG(ec.monthly_emi)::NUMERIC, 2),
  ROUND(AVG(ec.interest_rate)::NUMERIC, 2),
  ROUND(SUM(ec.total_interest)::NUMERIC, 2)
FROM emi_calculations ec
GROUP BY ec.loan_type;
$$ LANGUAGE SQL;

-- =====================================================
-- SAMPLE DATA INSERT (Optional - for testing)
-- =====================================================

-- INSERT INTO emi_calculations (
--   email, loan_type, emi_type, principal, interest_rate, tenure_months, 
--   monthly_emi, total_interest, total_payment
-- ) VALUES (
--   'user@example.com', 'Personal Loan', 'reducing', 500000, 10, 60,
--   9454.29, 67257.40, 567257.40
-- );

-- =====================================================
-- GRANTS AND PERMISSIONS (Adjust as needed)
-- =====================================================

-- Create application role (if needed)
-- CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_password';
-- GRANT CONNECT ON DATABASE emi_calculator_db TO app_user;
-- GRANT USAGE ON SCHEMA public TO app_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- =====================================================
-- END OF POSTGRESQL SCHEMA
-- =====================================================
