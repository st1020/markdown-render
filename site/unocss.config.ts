import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
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
  preflights: [
    {
      getCSS: () => `
        :root {
          --success: 142 71% 29%;
          --info: 224 77% 48%;
        }

        .dark {
          --success: 142 76% 40%;
          --info: 209 87% 57%;
        }
      `
    }
  ],
  theme: {
    breakpoints: {
      sm: "641px",
      md: "769px",
      lg: "1025px"
    },
    colors: {
      success: "hsl(var(--success))",
      info: "hsl(var(--info))"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block"
      }
    }),
    presetAnimations(),
    presetShadcn(
      {
        color: {
          base: "orange",
          light: {
            background: "0 0% 100%",
            foreground: "215 25% 27%",
            card: "0 0% 100%",
            "card-foreground": "215 25% 27%",
            popover: "0 0% 100%",
            "popover-foreground": "215 25% 27%",
            secondary: "220 13% 91%",
            "secondary-foreground": "220.9 39.3% 11%", // gray
            muted: "220 14.3% 95.9%", // gray
            "muted-foreground": "220 8.9% 46.1%", // gray
            accent: "220 14.3% 95.9%", // gray
            "accent-foreground": "220.9 39.3% 11%", // gray
            border: "216 12% 85%",
            input: "216 12% 85%"
          }
        }
      },
      false
    )
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      include: [/\.ts/, /\.vue$/, /\.vue\?vue/]
    }
  }
});
