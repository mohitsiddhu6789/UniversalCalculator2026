# Contributing to OpenLoanCalc

We love your input! We want to make contributing to OpenLoanCalc as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

### Getting Started

1. Fork the repo and create your branch from `main`
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/openloancalc.git
   cd openloancalc
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original/openloancalc.git
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Development Workflow

1. Make your changes
2. Test thoroughly:
   ```bash
   npm run dev      # Test locally
   npm run build    # Test production build
   ```
3. Ensure no linting issues:
   ```bash
   npm run lint
   ```
4. Commit with clear messages:
   ```bash
   git commit -m "feat: Add amazing feature"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/amazing-feature
   ```
6. Create a Pull Request

## Pull Request Process

1. **Before Submitting:**
   - Update README.md with any new features
   - Update API.md if API changes were made
   - Test on multiple browsers and screen sizes
   - Ensure all tests pass
   - Run `npm run build` successfully

2. **PR Description Template:**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## How Has This Been Tested?
   Describe testing approach

   ## Screenshots (if applicable)
   Include images of changes

   ## Checklist:
   - [ ] My code follows the style guidelines
   - [ ] I have performed a self-review
   - [ ] I have commented complex code
   - [ ] I have updated documentation
   - [ ] My changes generate no new warnings
   - [ ] I have tested on mobile and desktop
   ```

3. **Review Process:**
   - We aim to review PRs within 48 hours
   - We may request changes before merging
   - All CI/CD checks must pass
   - At least one maintainer approval required

## Code Style Guidelines

### JavaScript/React
```javascript
// Use ES6+ syntax
const calculateEMI = (principal, rate, months) => {
  // Always use const/let, avoid var
  const monthlyRate = rate / 100 / 12;
  
  // Add meaningful comments for complex logic
  // Formula: EMI = P × R × (1+R)^N / ((1+R)^N − 1)
  return principal * monthlyRate * Math.pow(1 + monthlyRate, months) 
    / (Math.pow(1 + monthlyRate, months) - 1);
};

// Use arrow functions
const handleClick = () => {
  console.log('Clicked');
};

// Avoid inline styles, use Tailwind classes
const BadComponent = () => (
  <div style={{ color: 'red' }}>Bad</div>
);

const GoodComponent = () => (
  <div className="text-red-500">Good</div>
);
```

### Naming Conventions
- **Variables**: camelCase (`loanAmount`, `interestRate`)
- **Functions**: camelCase (`calculateEMI`, `validateInput`)
- **Components**: PascalCase (`LoanForm`, `EmiResult`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_RATE`, `LOAN_TYPES`)

### Documentation
```javascript
/**
 * Calculate monthly EMI using standard formula
 * 
 * @param {number} principal - Loan amount in rupees
 * @param {number} annualRate - Annual interest rate (%)
 * @param {number} months - Tenure in months
 * @returns {number} Monthly EMI amount
 * 
 * @example
 * const emi = calculateEMI(500000, 10, 60);
 * // Returns: 9454.21
 */
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic changes)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Build process, dependencies, etc.

### Examples:
```bash
git commit -m "feat(emi): Add part payment calculation"
git commit -m "fix(validation): Fix email validation regex"
git commit -m "docs: Update API documentation"
git commit -m "style: Format code with Prettier"
```

## Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: 
   ```
   1. Go to '...'
   2. Click on '...'
   3. See error
   ```
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happened
5. **Screenshots**: If applicable
6. **Environment**:
   - Browser and version
   - Node.js version
   - OS and version
7. **Additional Context**: Any other relevant info

### Bug Report Template:
```markdown
## Description
[Brief description]

## Steps to Reproduce
1. ...
2. ...
3. ...

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: [e.g., Chrome 90]
- Node.js: [e.g., 16.0.0]
- OS: [e.g., Windows 10]

## Screenshots
[Paste screenshots here]
```

## Feature Requests

Suggest new features by opening an issue with:

1. **Title**: Concise description
2. **Problem**: What problem does this solve?
3. **Solution**: How should it work?
4. **Examples**: Use cases

### Feature Request Template:
```markdown
## Description
[Clear description]

## Problem Statement
[What problem does this solve?]

## Proposed Solution
[How should it work?]

## Use Cases
- Use case 1
- Use case 2

## Alternative Solutions
[Other approaches considered]

## Additional Context
[Other relevant information]
```

## Code Review Process

### What We Look For:
- ✅ Code follows style guidelines
- ✅ Tests added/updated
- ✅ Documentation updated
- ✅ No console errors
- ✅ Performance impact minimal
- ✅ Security implications reviewed
- ✅ Works on multiple browsers
- ✅ Mobile responsive

### Common Feedback:
- Add JSDoc comments
- Update documentation
- Add test cases
- Optimize performance
- Improve accessibility
- Check responsive design

## Testing Guidelines

### Unit Tests
```javascript
// Example test structure
describe('calculateEMI', () => {
  test('should calculate EMI correctly', () => {
    const emi = calculateEMI(500000, 10, 60);
    expect(emi).toBeCloseTo(9454.21, 2);
  });

  test('should return 0 for invalid input', () => {
    const emi = calculateEMI(0, 10, 60);
    expect(emi).toBe(0);
  });
});
```

### Manual Testing
1. Test on multiple devices
2. Test with different data sets
3. Test error scenarios
4. Test accessibility
5. Test performance

## Documentation Style

### README.md
- Clear, concise sections
- Code examples where relevant
- Links to other docs
- Feature list with checkmarks

### Code Comments
- Explain the "why", not the "what"
- Keep comments up-to-date
- Use // for single line, /* */ for multi-line

```javascript
// Good: Explains why
// We use reducing balance method as it's standard in India
const monthlyRate = annualRate / 100 / 12;

// Bad: Explains what we can already see
// Calculate monthly rate
const monthlyRate = annualRate / 100 / 12;
```

## Build and Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests (when available)
npm test
```

## Community

### Discussion Topics:
- Design decisions
- Architecture
- Performance optimization
- Feature planning
- Best practices

### Where to Discuss:
- GitHub Discussions
- GitHub Issues
- Pull Request comments

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inspiring community for all.

### Expected Behavior
- Be respectful and inclusive
- Welcome new contributors
- Focus on feedback, not criticism
- Respect different opinions

### Unacceptable Behavior
- Harassment or discrimination
- Offensive comments
- Deliberate disruption
- Threats or violence

## Questions?

- Check existing issues
- Read documentation
- Start a discussion
- Contact maintainers

## Acknowledgments

Thank you for contributing to OpenLoanCalc! 🎉

---

**Happy Contributing!**

Last Updated: January 2026
