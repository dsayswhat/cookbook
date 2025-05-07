/**
 * Pre-deployment check script
 * 
 * Verifies that all necessary files are in place for deployment
 * and that the configuration is correct for GitHub Pages.
 */

const fs = require('fs');
const path = require('path');

// Check if the .github/workflows/deploy.yml file exists
const workflowExists = fs.existsSync(path.join(__dirname, '..', '.github', 'workflows', 'deploy.yml'));
console.log(`GitHub Actions workflow file exists: ${workflowExists ? '✅' : '❌'}`);

// Check if the pathPrefix is configured in .eleventy.js
const eleventyConfig = fs.readFileSync(path.join(__dirname, '..', '.eleventy.js'), 'utf8');
const pathPrefixConfigured = eleventyConfig.includes('pathPrefix');
console.log(`Path prefix configured in .eleventy.js: ${pathPrefixConfigured ? '✅' : '❌'}`);

// Check if the build:github script is in package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const githubBuildScriptExists = packageJson.scripts && packageJson.scripts['build:github'];
console.log(`GitHub Pages build script exists: ${githubBuildScriptExists ? '✅' : '❌'}`);

// Check if cross-env dependency is installed
const crossEnvInstalled = packageJson.devDependencies && packageJson.devDependencies['cross-env'];
console.log(`cross-env dependency installed: ${crossEnvInstalled ? '✅' : '❌'}`);

// Check if _site directory exists (build has been run)
const siteDirectoryExists = fs.existsSync(path.join(__dirname, '..', '_site'));
console.log(`_site directory exists: ${siteDirectoryExists ? '✅' : '❌'}`);

// Overall check
const allChecksPass = workflowExists && pathPrefixConfigured && githubBuildScriptExists && crossEnvInstalled;
console.log('\nDeployment configuration status:');
console.log(allChecksPass ? '✅ All checks passed. Ready for deployment!' : '❌ Some checks failed. Please fix the issues before deploying.');

// If the _site directory doesn't exist, remind to build
if (!siteDirectoryExists) {
  console.log('\n⚠️ The _site directory does not exist. Run `npm run build` or `npm run build:github` before deploying.');
}

// Provide next steps
console.log('\nNext steps:');
console.log('1. Push your changes to GitHub');
console.log('2. GitHub Actions will automatically deploy your site to GitHub Pages');
console.log('3. Visit https://[your-username].github.io/cookbook/ to view your deployed site');
console.log('4. Configure your repository settings to use a custom domain (optional)'); 