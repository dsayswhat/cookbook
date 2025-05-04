---
layout: layouts/recipe.liquid
title: Test Recipe
date: 2024-05-03
categories: [Test]
tags: [test, debug]
servings: 1
prepTime: 1 minute
cookTime: 1 minute
---

# Test Content

This is a test of markdown processing.

## Subheading

- List item 1
- List item 2
- List item 3

1. Numbered item 1
2. Numbered item 2
3. Numbered item 3

**Bold text** and *italic text*

## Content with Curly Braces

Here is some text with curly braces: \{{ this should be plain text }}

## Content with Template Variables

Here is a template variable: {{ title }}

## Content with Both

Here is both: \{{ this should be plain text }} and {{ title }}

## Test Section 1: Plain Text
This is plain text that should render normally.

## Test Section 2: Curly Braces
Here is some text with curly braces: \{{ this should be plain text }}
And more: \{% this should also be plain text %}

## Test Section 3: Variables
Here is a variable-like text: \{{ variable }}
And a tag-like text: \{% tag %}

## Test Section 4: Escaped Content
Here is escaped content: \{{ escaped }}
And: \{% escaped %}

## Test Section 5: HTML
Here is some <b>HTML</b> that should render as HTML.

## Test Section 6: Markdown
Here is some **markdown** that should render as markdown. 