import { defineConfig, presetIcons, presetWind4, transformerVariantGroup } from "unocss";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  shortcuts: [
    {
      "flex-center": "flex items-center justify-center",
      hstack: "flex items-center",
      "shadow-c": "shadow shadow-gray-300 dark:shadow-neutral-900",
      "pane-container": "h-full rounded-xl",
      "zoom-button":
        "flex-center size-10 text-lg hover:bg-blue-600 focus-visible:bg-blue-600"
    }
  ],
  presets: [
    presetWind4(),
    presetIcons({
      extraProperties: {
        display: "inline-block"
      }
    }),
    presetAnimations(),
    presetShadcn(
      {
        color: {
          base: "blue",
          light: {
            background: "1 0 0",
            foreground: "0.45 0.04 257",
            secondary: "0.92 0.02 255",
            "secondary-foreground": "0.25 0.05 255"
          } as any
        }
      },
      {
        componentLibrary: "reka",
        globals: true
      }
    )
  ],
  transformers: [transformerVariantGroup()],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        "(components|src)/**/*.{js,ts}"
      ]
    }
  }
});
