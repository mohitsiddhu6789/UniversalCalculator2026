# ⚠️ Post-Installation Setup

## What Happened
Node.js v25.3.0 has been installed successfully via Windows Package Manager (winget).

## What You Need To Do

### Step 1: Close and Reopen PowerShell
1. **Close** the current PowerShell window completely
2. **Open** a new PowerShell window
   - Press `Win + R`
   - Type `powershell` or `pwsh`
   - Press Enter

### Step 2: Verify Installation
In the **new** PowerShell window, run:
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v25.3.0 and 10.x.x)

### Step 3: Install Dependencies
Navigate to your project folder:
```powershell
cd "c:\Users\mohit\source\repos"
npm install
```

This will install all required packages (React, Vite, Tailwind, etc.)

### Step 4: Start Development Server
```powershell
npm run dev
```

This will start the Vite development server on http://localhost:3000

---

## Important Notes

- **PATH Update**: Windows needs to refresh its environment variables after Node.js installation
- **Restart Required**: Simply closing and opening a new PowerShell/Command Prompt window will fix this
- **Don't use CMD**: Use PowerShell or Windows Terminal for better compatibility

---

## Quick Start Commands (After Restart)

```powershell
# Navigate to project
cd "c:\Users\mohit\source\repos"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Troubleshooting

If you still get "npm not recognized" after restarting:
1. Open System Properties (Win + R → sysdm.cpl)
2. Click "Environment Variables"
3. Under "System variables", find "Path"
4. Look for a line containing "NodeJS" or similar
5. If not found, manually add: `C:\Program Files\nodejs`
6. Click OK and restart PowerShell again

---

## Next: Follow SETUP.md

After npm installation, follow [SETUP.md](SETUP.md) for:
- Setting up Supabase database
- Configuring environment variables
- Running the application locally

Good luck! 🚀
