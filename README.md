# Better Everyday - Terminal Resume

A retro terminal-themed resume website built with modern web technologies, demonstrating the power of AI-assisted development with professional CI/CD practices.

## 🚀 Project Overview

This project showcases how a coding agent (Claude Code) can rapidly build a complete, production-ready web application from concept to deployment. The resume website features:

- **Retro Terminal Aesthetic**: Authentic Unix terminal interface with green text, ASCII art, and typing animations
- **Interactive Experience**: Boot sequence, command-line interface, and responsive terminal feedback
- **Professional Content**: Real resume data with structured sections for experience, skills, and education  
- **PDF Export**: HR-compatible resume download with clean formatting
- **Modern Tech Stack**: TypeScript, Vite, Biome for optimal developer experience

## 🛠 Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **Build Tool**: Vite
- **Code Quality**: Biome (linting & formatting)
- **PDF Generation**: jsPDF
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🔄 CI/CD Pipeline

### Continuous Integration (`ci.yml`)
- **Multi-Node Testing**: Validates on Node.js 18 & 20
- **Quality Checks**: TypeScript compilation, Biome linting
- **Build Validation**: Ensures production build succeeds
- **Artifact Storage**: Preserves build outputs for inspection

### Continuous Deployment (`cd.yml`)  
- **Automated Deployment**: Pushes to GitHub Pages on main branch
- **Production Builds**: Optimized assets for web deployment
- **Zero-Downtime**: Concurrent deployment protection

## 🎯 Development Philosophy

This project demonstrates:
- **AI-Assisted Development**: Rapid prototyping to production-ready code
- **Best Practices**: Modern tooling, clean architecture, automated quality gates
- **User Experience Focus**: Engaging interface that tells a professional story
- **DevOps Integration**: Complete CI/CD pipeline following industry standards

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Moshisho/better-everyday.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run quality checks
npm run typecheck
npm run check
```

## 📱 Live Demo

Visit the live website: [GitHub Pages URL will be generated after first deployment]

## 🤖 Built with Claude Code

This entire project was created through collaboration with Claude Code, Anthropic's AI coding assistant, demonstrating how AI can accelerate development while maintaining professional code quality and industry best practices.