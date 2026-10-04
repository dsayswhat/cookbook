// Renders a recipe's `recipe_table` frontmatter as a tabular recipe:
// ingredients down the left, each step a cell spanning the rows it combines.
// See doc/recipe-format.md for the data format.

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Ingredients are plain strings; steps are { step, with: [...] }.
function isStep(node) {
  return node !== null && typeof node === "object" && !Array.isArray(node);
}

// Walk the tree, assigning each ingredient a row and each step a column.
// A step sits one column to the right of its deepest input, so steps that
// happen at the same "stage" line up even when their branches differ in depth.
function layout(node, rows) {
  if (!isStep(node)) {
    const row = rows.length;
    rows.push(String(node));
    return { col: 0, firstRow: row, rowCount: 1, children: [] };
  }

  const inputs = node.with || [];
  if (inputs.length === 0) {
    throw new Error(`recipe_table step "${node.step}" has no "with" inputs`);
  }

  const firstRow = rows.length;
  const children = inputs.map(input => layout(input, rows));
  const col = Math.max(...children.map(child => child.col)) + 1;

  return {
    col,
    firstRow,
    rowCount: rows.length - firstRow,
    text: node.step,
    children
  };
}

// Collect step cells, plus blank filler cells wherever an input skips
// columns to reach a later step (e.g. salt joining at the "fold in" stage).
// Neighbouring inputs that skip the same columns share one merged blank cell.
function collectCells(laidOut, cells) {
  let previousGap = null;
  for (const child of laidOut.children) {
    if (child.col + 1 < laidOut.col) {
      const col = child.col + 1;
      if (previousGap && previousGap.col === col) {
        previousGap.rowspan += child.rowCount;
      } else {
        previousGap = {
          row: child.firstRow,
          col,
          rowspan: child.rowCount,
          colspan: laidOut.col - col,
          text: null
        };
        cells.push(previousGap);
      }
    } else {
      previousGap = null;
    }
    collectCells(child, cells);
  }

  if (laidOut.text !== undefined) {
    cells.push({
      row: laidOut.firstRow,
      col: laidOut.col,
      rowspan: laidOut.rowCount,
      colspan: 1,
      text: laidOut.text
    });
  }
}

function renderRecipeTable(table) {
  if (!table || !table.steps) {
    return "";
  }

  const rows = [];
  const tree = layout(table.steps, rows);
  const cells = [];
  collectCells(tree, cells);
  const totalCols = tree.col + 1;

  const cellAttrs = cell =>
    (cell.rowspan > 1 ? ` rowspan="${cell.rowspan}"` : "") +
    (cell.colspan > 1 ? ` colspan="${cell.colspan}"` : "");

  const fullWidthRow = (text, className) =>
    `<tr><td class="${className}" colspan="${totalCols}">${escapeHtml(text)}</td></tr>`;

  const html = ['<table class="tabular-recipe">', "<tbody>"];

  for (const text of table.before || []) {
    html.push(fullWidthRow(text, "tabular-recipe-prep"));
  }

  rows.forEach((ingredient, rowIndex) => {
    const rowCells = cells
      .filter(cell => cell.row === rowIndex)
      .sort((a, b) => a.col - b.col);

    html.push("<tr>");
    html.push(`<td class="tabular-recipe-ingredient">${escapeHtml(ingredient)}</td>`);
    for (const cell of rowCells) {
      if (cell.text === null) {
        html.push(`<td class="tabular-recipe-empty"${cellAttrs(cell)}></td>`);
      } else {
        html.push(`<td class="tabular-recipe-step"${cellAttrs(cell)}>${escapeHtml(cell.text)}</td>`);
      }
    }
    html.push("</tr>");
  });

  for (const text of table.after || []) {
    html.push(fullWidthRow(text, "tabular-recipe-finish"));
  }

  html.push("</tbody>", "</table>");
  return html.join("\n");
}

module.exports = { renderRecipeTable };
