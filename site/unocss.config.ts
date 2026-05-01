import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
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
  theme: {
    breakpoints: {
      sm: "641px",
      md: "769px",
      lg: "1025px"
    }
  },
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block"
      }
    }),
    presetAnimations(),
    presetShadcn(
      {
        color: "blue"
      },
      {
        componentLibrary: "reka",
        globals: true
      }
    )
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
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
