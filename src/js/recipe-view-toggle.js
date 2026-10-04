// Table / Lists toggle for recipes that have a tabular "At a Glance" view.
// Without JavaScript both views show; with it, only the chosen one does.
// The choice is remembered across recipes.
(function() {
  'use strict';

  const STORAGE_KEY = 'recipe-view';
  const LIST_SECTIONS = ['ingredients', 'instructions'];

  const toggle = document.getElementById('recipe-view-toggle');
  const table = document.getElementById('tabular-recipe');
  const content = document.querySelector('.recipe-content');
  if (!toggle || !table || !content) {
    return;
  }

  // The markdown renders as flat headings and lists, so group each
  // Ingredients / Instructions h2 with everything up to the next h2.
  // Notes, timing and nutrition stay visible in both views.
  const listElements = [];
  let inListSection = false;
  for (const element of content.children) {
    if (element.tagName === 'H2') {
      inListSection = LIST_SECTIONS.includes(element.textContent.trim().toLowerCase());
    }
    if (inListSection) {
      listElements.push(element);
    }
  }

  const buttons = toggle.querySelectorAll('button[data-view]');

  function readSavedView() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function saveView(view) {
    try {
      localStorage.setItem(STORAGE_KEY, view);
    } catch (err) {
      // Storage unavailable (private mode etc.) - the toggle still works
    }
  }

  function showView(view) {
    const showTable = view !== 'lists';
    table.hidden = !showTable;
    listElements.forEach(element => {
      element.hidden = showTable;
    });
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.view === (showTable ? 'table' : 'lists')));
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      showView(button.dataset.view);
      saveView(button.dataset.view);
    });
  });

  toggle.hidden = false;
  showView(readSavedView() || 'table');
})();
