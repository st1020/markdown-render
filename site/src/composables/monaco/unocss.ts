import { createAutocomplete } from "@unocss/autocomplete";
import { splitWithVariantGroupRE, type UnoGenerator } from "@unocss/core";
import {
  arbitraryPropertyRE,
  quotedArbitraryValuesRE
} from "@unocss/extractor-arbitrary-variants";
import type * as Monaco from "monaco-editor";
import { getUnoGenerator } from "~/utils/css";

// Ignore `unknownAtRules` option error in Monaco's CSS language service
// @apply is used in UnoCSS and we don't want to show lint errors for it
export const setupUnocssCssOptions = (monaco: typeof Monaco) => {
  monaco.css.cssDefaults.setOptions({ lint: { unknownAtRules: "ignore" } as object });
};

// Ported from https://github.com/unocss/unocss/blob/main/virtual-shared/integration/src/match-positions.ts
const defaultIdeMatchInclude: RegExp[] = [
  // String literals
  /(['"`])[^\x01]*?\1/g,
  // HTML tags
  /<[^/?<>0-9$_!"'](?:"[^"]*"|'[^']*'|[^>])+>/g,
  // CSS directives
  /(@apply|--uno|--at-apply)[^;]*;/g
];

function getMatchedPositions(
  code: string,
  matched: string[]
): Array<[start: number, end: number, token: string]> {
  // Build include ranges from @apply / --at-apply / --uno directives
  const includeRanges: [number, number][] = [];
  for (const regex of defaultIdeMatchInclude) {
    for (const match of code.matchAll(regex))
      includeRanges.push([match.index!, match.index! + match[0].length]);
  }
  if (!includeRanges.length) return [];

  const result: Array<[number, number, string]> = [];
  const plain = new Set(matched);

  // highlight for plain classes
  let start = 0;
  code.split(splitWithVariantGroupRE).forEach((i) => {
    const end = start + i.length;
    if (plain.has(i)) result.push([start, end, i]);
    start = end;
  });

  // highlight for quoted arbitrary values
  for (const match of code.matchAll(quotedArbitraryValuesRE)) {
    const start = match.index!;
    const end = start + match[0].length;
    if (plain.has(match[0])) result.push([start, end, match[0]]);
  }

  // highlight for arbitrary css properties
  for (const match of code.matchAll(arbitraryPropertyRE)) {
    const start = match.index!;
    const end = start + match[0].length;
    if (plain.has(match[0])) {
      // non-quoted arbitrary properties already highlighted by plain class highlighter
      const index = result.findIndex(([s, e]) => s === start && e === end);
      if (index < 0) result.push([start, end, match[0]]);
    }
  }

  return result
    .filter(([start, end]) => {
      if (includeRanges.some(([s, e]) => start >= s && end <= e)) return true;
      return false;
    })
    .sort((a, b) => a[0] - b[0]);
}

async function getPositions(uno: UnoGenerator, code: string) {
  const { matched } = await uno.generate(code, { preflights: false });
  return getMatchedPositions(code, [...matched]);
}

// Completion — ported from registerCompletion() in language-server/capabilities/completion.ts
export const setupUnocssCompletion = async (monaco: typeof Monaco) => {
  const uno = await getUnoGenerator();
  const ac = createAutocomplete(uno, { matchType: "prefix" });

  monaco.languages.registerCompletionItemProvider("css", {
    triggerCharacters: ["-", ":", " "],

    async provideCompletionItems(model, position) {
      const code = model.getValue();
      const offset = model.getOffsetAt(position);
      const result = await ac.suggestInFile(code, offset);
      if (!result?.suggestions.length) return { suggestions: [] };

      return {
        isIncomplete: true,
        suggestions: result.suggestions.slice(0, 1000).map(([value, label]) => {
          const resolved = result.resolveReplacement(value);
          const start = model.getPositionAt(resolved.start);
          const end = model.getPositionAt(resolved.end);
          return {
            label,
            kind: monaco.languages.CompletionItemKind.EnumMember,
            insertText: resolved.replacement,
            range: {
              startLineNumber: start.lineNumber,
              startColumn: start.column,
              endLineNumber: end.lineNumber,
              endColumn: end.column
            }
          };
        })
      };
    },

    // Lazily attach generated CSS — mirrors onCompletionResolve in the language server
    async resolveCompletionItem(item) {
      const label =
        typeof item.label === "string"
          ? item.label
          : (item.label as Monaco.languages.CompletionItemLabel).label;
      const { css } = await uno.generate(new Set([label]), { preflights: false });
      if (css.trim()) item.documentation = { value: `\`\`\`css\n${css.trim()}\n\`\`\`` };
      return item;
    }
  });
};

// Hover — ported from registerHover() in language-server/capabilities/hover.ts
export const setupUnocssHover = async (monaco: typeof Monaco) => {
  const uno = await getUnoGenerator();

  monaco.languages.registerHoverProvider("css", {
    async provideHover(model, position) {
      const code = model.getValue();
      const offset = model.getOffsetAt(position);
      const positions = await getPositions(uno, code);
      const hit = positions.find(([s, e]) => offset >= s && offset <= e);
      if (!hit) return null;

      const { css } = await uno.generate(new Set([hit[2]]), { preflights: false });
      if (!css.trim()) return null;

      const start = model.getPositionAt(hit[0]);
      const end = model.getPositionAt(hit[1]);
      return {
        range: new monaco.Range(
          start.lineNumber,
          start.column,
          end.lineNumber,
          end.column
        ),
        contents: [{ value: `\`\`\`css\n${css.trim()}\n\`\`\`` }]
      };
    }
  });
};

// Decorations — ported from registerDecorations() in language-server/capabilities/decorations.ts
const DECORATION_CLASS = "unocss-underline";

const injectDecorationStyle = () => {
  const id = "unocss-monaco-style";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `.${DECORATION_CLASS} { border-bottom: 1px dashed currentColor; }`;
  document.head.appendChild(style);
};

// Mirror VSCode extension's throttle(updateDecorations, 200)
function throttle<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let lastTime = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    clearTimeout(timer);
    if (now - lastTime >= ms) {
      lastTime = now;
      fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        lastTime = Date.now();
        fn.apply(this, args);
      }, ms);
    }
  } as T;
}

export const setupUnocssDecorations = async (
  monaco: typeof Monaco,
  editor: Monaco.editor.IStandaloneCodeEditor,
  cssModel: Monaco.editor.ITextModel
) => {
  const uno = await getUnoGenerator();
  injectDecorationStyle();

  const decorations = editor.createDecorationsCollection([]);

  const update = async () => {
    if (editor.getModel() !== cssModel) return;
    const code = cssModel.getValue();
    const positions = await getPositions(uno, code);

    decorations.set(
      positions.map(([startOffset, endOffset]) => {
        const start = cssModel.getPositionAt(startOffset);
        const end = cssModel.getPositionAt(endOffset);
        return {
          range: new monaco.Range(
            start.lineNumber,
            start.column,
            end.lineNumber,
            end.column
          ),
          options: { inlineClassName: DECORATION_CLASS }
        };
      })
    );
  };

  const throttledUpdate = throttle(update, 200);

  // Re-apply when switching back to the CSS model
  editor.onDidChangeModel(() => update());
  // Update on content change — throttled as in VSCode extension
  cssModel.onDidChangeContent(() => throttledUpdate());

  update();
};
