# Contributing Guide

This guide explains the project structure and how to make changes to the resume website, from development to deployment.

## 📁 Project Structure

```
better-everyday/
├── .github/workflows/     # CI/CD pipelines
│   ├── ci.yml            # Continuous Integration
│   └── cd.yml            # Continuous Deployment
├── src/                  # Source code
│   ├── main.ts           # Main application logic
│   ├── resume-data.ts    # Resume content data
│   ├── pdf-generator.ts  # PDF export functionality
│   └── style.css         # Terminal styling
├── index.html            # HTML entry point
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript configuration
├── biome.json            # Code quality configuration
└── vite.config.ts        # Build tool configuration
```

## 🏗 Code Architecture

### Core Components

1. **`resume-data.ts`** - Central data store
   - Contains all resume information (experience, skills, education)
   - TypeScript interfaces define data structure
   - Easy to update without touching UI code

2. **`main.ts`** - Application logic
   - `TerminalResume` class manages the UI
   - Boot sequence animation
   - Terminal command rendering
   - Event handling for interactions

3. **`pdf-generator.ts`** - Export functionality
   - Uses jsPDF library for document generation
   - Professional formatting for HR systems
   - Reads from same data source as web UI

4. **`style.css`** - Terminal theming
   - CSS custom properties for consistent colors
   - Responsive design for mobile/desktop
   - Authentic terminal styling (fonts, animations)

## 🔄 Making Changes: Complete Workflow

### 1. Update Resume Content

**Edit `src/resume-data.ts`:**

```typescript
export const resumeData: ResumeData = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... update any fields
  experience: [
    {
      title: "New Job Title",
      company: "Company Name",
      dates: "Start - End",
      description: [
        "Achievement 1",
        "Achievement 2"
      ]
    }
    // ... add more entries
  ]
}
```

### 2. Local Development & Testing

```bash
# Install dependencies (first time)
npm install

# Start development server
npm run dev
# → Visit http://localhost:3000 to see changes live

# Run quality checks
npm run typecheck    # TypeScript validation
npm run check       # Biome linting & formatting

# Test production build
npm run build
npm run preview
```

### 3. Code Quality Standards

Before committing, ensure:

- **TypeScript**: No compilation errors (`npm run typecheck`)
- **Code Style**: Biome formatting applied (`npm run check`)
- **Build Success**: Production build works (`npm run build`)

### 4. Git Workflow with Pull Requests

```bash
# Create and checkout feature branch
git checkout -b update-resume-content

# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: Update work experience and skills section"

# Push to feature branch
git push origin update-resume-content

# Create Pull Request to main branch
gh pr create --title "Update resume content" --body "Updated work experience and skills sections with latest information"
# Or create PR through GitHub web interface
```

### 5. Pull Request Process

#### Automated CI Checks
When PR is created, CI pipeline automatically runs:
1. **Multi-Node Testing**: Tests on Node.js 18 & 20
2. **Quality Gates**: 
   - TypeScript compilation check
   - Biome code quality validation
   - Production build verification
3. **Status Checks**: PR shows green ✅ when all checks pass

#### Code Review Process
1. **Automated checks must pass** before review
2. **Reviewer examines**:
   - Code quality and consistency
   - Resume content accuracy
   - Visual/functional changes
3. **Approval required** before merge

#### Merge to Main
```bash
# After PR approval and CI passing:
# Merge via GitHub interface (Squash & Merge recommended)
# Or via CLI:
gh pr merge --squash
```

### 6. Automated Deployment

Once merged to `main` branch:

#### CD Pipeline (`cd.yml`) - Deploys automatically:
1. **Build Production Assets**: Optimized for web
2. **Deploy to GitHub Pages**: Live website update
3. **Zero-Downtime**: Safe concurrent deployment

### 7. Verify Deployment

- **GitHub Actions**: Check workflow status in repository "Actions" tab
- **Live Site**: Changes appear at GitHub Pages URL within 2-5 minutes
- **PDF Export**: Test download button functionality

## 🎨 Customization Options

### Visual Theming

Edit CSS custom properties in `src/style.css`:

```css
:root {
  --terminal-bg: #0d1117;        /* Background color */
  --terminal-text: #00ff00;      /* Main text color */
  --terminal-accent: #39ff14;    /* Highlight color */
  --terminal-dim: #008000;       /* Subdued text */
}
```

### Terminal Behavior

Modify `src/main.ts` for:
- **Boot sequence**: Edit `bootMessages` array
- **Typing speed**: Adjust timing in `typeText()` method
- **ASCII art**: Update the header art
- **Commands**: Add new terminal commands/outputs

### PDF Formatting

Customize `src/pdf-generator.ts` for:
- **Layout**: Margins, spacing, font sizes
- **Colors**: Professional color scheme
- **Sections**: Add/remove resume sections
- **Styling**: Headers, bullet points, formatting

## 🚀 Advanced Development

### Adding New Features

1. **Update TypeScript interfaces** in `resume-data.ts`
2. **Extend UI rendering** in `main.ts`
3. **Update PDF generation** in `pdf-generator.ts`
4. **Add corresponding styles** in `style.css`
5. **Test thoroughly** before committing

### Performance Optimization

- Images: Add to `public/` folder for Vite optimization
- Bundle analysis: Use `npm run build -- --analyze`
- Lazy loading: Consider for large resume content

## 🐛 Troubleshooting

### Common Issues

- **Build failures**: Check TypeScript errors with `npm run typecheck`
- **Style issues**: Verify CSS syntax and custom properties
- **PDF problems**: Test jsPDF compatibility with content changes
- **Deployment fails**: Check GitHub Pages settings and permissions

### Getting Help

1. **Check GitHub Actions logs** for CI/CD failures
2. **Review browser console** for runtime errors  
3. **Verify data structure** matches TypeScript interfaces
4. **Test locally** before pushing changes

---

## 🎯 Development Philosophy

This project demonstrates:
- **Separation of Concerns**: Data, UI, and styling are cleanly separated
- **Type Safety**: TypeScript ensures data consistency across components
- **Quality Gates**: Automated checks prevent broken deployments
- **Modern Tooling**: Vite, Biome, and GitHub Actions for professional workflow
- **Code Review Culture**: Pull request workflow ensures code quality

Happy coding! 🚀