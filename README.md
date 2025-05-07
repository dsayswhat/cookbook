# Cookbook

A recipe management system that captures recipes from various sources and stores them in a structured YAML format. The system publishes recipes both as a web interface for kitchen use and generates PDFs for offline access.

## Features

- Store recipes in YAML format with comprehensive metadata
- Support categorization by type, cuisine, dietary restrictions, and tags
- Generate both web pages and PDF outputs from the same source data
- Provide search and filtering capabilities
- Maintain source attribution for captured recipes
- Support recipe variations and notes

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm start
```

### Building

Generate the static site:
```bash
npm run build
```

Generate PDFs:
```bash
npm run pdf
```

### Deployment

The project is set up for automatic deployment to GitHub Pages using GitHub Actions.

#### Automatic Deployment
Any push to the `main` branch will trigger the GitHub Actions workflow that:
1. Builds the site with the correct path prefix for GitHub Pages
2. Generates PDF files
3. Deploys the build to the `gh-pages` branch

#### Manual Deployment
To build the site for GitHub Pages manually:
```bash
npm run build:github
```

To deploy manually (requires appropriate GitHub permissions):
```bash
npm run deploy
```

## Project Structure

```
src/
  _data/           # Data files (YAML, JSON)
    recipes/       # Individual recipe files
  _includes/       # Template includes
    layouts/       # Layout templates
    components/    # Reusable components
  assets/          # Static assets (images, CSS, JS)
```

## License

ISC 