# Recipe Project Memory Bank

## Project Overview
A recipe management system that captures recipes from various sources (paper and online) and stores them in a structured YAML format. The system will publish recipes both as a web interface for kitchen use and generate PDFs for offline access.

## Core Requirements
- Store recipes in YAML format with comprehensive metadata
- Support categorization by type, cuisine, dietary restrictions, and tags
- Generate both web pages and PDF outputs from the same source data
- Provide search and filtering capabilities
- Maintain source attribution for captured recipes
- Support recipe variations and notes

## Success Criteria
- Easy capture and editing of recipes in YAML format
- Fast, searchable web interface for kitchen use
- Professional PDF output for sharing/printing
- Organized by multiple taxonomies (categories, tags, cuisine)
- Maintainable and extensible codebase

## Constraints
- Must use text-based storage format (YAML chosen)
- Static site generation preferred (Eleventy selected)
- Must preserve attribution to original sources
- PDF generation must be automated 