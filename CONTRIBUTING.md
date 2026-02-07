# Contributing to Beau Bremer's Blog

Thanks for your interest! This is a personal blog, but I welcome contributions for:

- Typo fixes
- Broken link reports
- Security vulnerability reports
- Suggestions for improvements

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/KnowOneActual/beaubremer-blog.git
   cd beaubremer-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

   The site will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## Code Standards

This project uses automated linting and formatting:

- **Mega-Linter**: Runs on all pull requests via GitHub Actions
- **Prettier**: For code formatting (run `npm run format`)
- **Security**: All dependencies are regularly audited

### Before Submitting a PR

1. Ensure the site builds locally without errors
2. Run the linters (they'll auto-run on PR, but save time by testing first)
3. Test your changes in multiple browsers if possible

## Security Issues

**Do not open public issues for security vulnerabilities.**

Please review our [Security Policy](security-policy.md) and report vulnerabilities privately.

## Questions?

Feel free to open an issue for discussion or reach out via [beaubremer.com contact form](https://beaubremer.com#contact).