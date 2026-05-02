import type { DocumentStyles } from "../../stores/style"
import { PREVIEW_SELECTOR } from "./render"

export const DEFAULT_STYLES = {
  marginV: 50,
  marginH: 45,
  fontCJK: {
    name: "华康宋体",
    fontFamily: "HKST",
  },
  fontEN: {
    name: "Minion Pro",
  },
  paper: "A4",
} as DocumentStyles

export const DEFAULT_MD_CONTENT = `<div class="text-center">

# Eldrin Nightwhisper

<span class="font-bold text-lg">Applying for: Arcane Research Mage</span><br> <span class="iconify" data-icon="tabler:phone"></span> (+1) 777-888-9999
| <span class="iconify" data-icon="tabler:mail"></span> [eldrin@arcaneguild.magic](mailto:eldrin@arcaneguild.magic)
| <span class="iconify" data-icon="tabler:brand-github"></span> SpellForge
| <span class="iconify" data-icon="charm:person"></span> eldrin.arcana

</div>

## Education

**Grand Academy of Arcane Arts**
~ Silvermoon City

M.S. in Elemental Spell Engineering
~ 09/3021 - 01/3023

**Institute of Mystic Alchemy**
~ Eldoria, Eastern Realm

B.Eng. in Potion Crafting
~ 09/3016 - 07/3020

## Publications

**Magic is All You Need**

<u>Eldrin Nightwhisper</u>, Alaric Stormborn

*Symposium on Advanced Arcane Systems (SAAS), 3099*

**You Only Cast Once: Unified, Real-Time Fireball Control System**

<u>Eldrin Nightwhisper</u>, Alaric Stormborn, Lyra Moonshade, Thorne Blackwood

*Conference on Practical Rune Visualization (CPRV), 3077 **(Best Spell Honorable Mention)***

## Experience

**Arcane Research Intern**
~ WizardrySoft Guild
~ 07/3021 - Present

* Developed an innovative, versatile spellcasting framework applicable across multiple elemental schools, enhancing casting stability and efficiency
* Created a simplified mana-efficient invisibility spell, achieving results comparable to complex high-tier illusions through a novel rune compression technique; published in SAAS 3099
* Designed a modular spellcasting staff that significantly improved research productivity for guild members

**Spell Engineering Apprentice**
~ University of Mystical Sciences, Spellifornia
~ 08/3020 - Present

* Developed a precise fireball potency evaluation technique using mana resonance measurements
* Invented a rapid incantation algorithm, replacing vague spell chanting with quantifiable rune sequences; published in CPRV 3077
* Outperformed state-of-the-art spellcasting methods in both efficiency and destructive accuracy across various elemental tests

**Student Mage**
~ Academy of Arcane Vegetation
~ 03/3020 - 06/3020

* Developed an innovative dual-wand casting system utilizing synchronized gestures
* Engineered a filtering method for magical creature data collection inspired by ancient summoning rituals
* Established two new metrics for evaluating spell originality and mana diversity

**Alchemy Research Intern**
~ SnapSpell Inc.
~ 07/3018 - 08/3018

* Designed two novel potions by recombining ingredients from traditional healing and stamina brews, maximizing alchemical efficiency
* Leveraged ingredient duality to accelerate potion brewing for complementary effects
* Surpassed strong baselines on QWE'15 and ASDF'14 magical datasets

## Awards and Honors

**Gold**, International Wizard Duel Championship (IWDC)
~ 3018

**First Prize**, Royal Scholarship for Outstanding Archmages
~ 3017, 3018

## Skills

**Programming Languages:** <span class="iconify" data-icon="vscode-icons:file-type-python"></span> Pyromancy, <span class="iconify" data-icon="vscode-icons:file-type-js-official"></span> JavaSpell / <span class="iconify" data-icon="vscode-icons:file-type-typescript-official"></span> TypeRune, <span class="iconify" data-icon="vscode-icons:file-type-cpp2"></span> Crystal++, <span class="iconify" data-icon="logos:rust" data-inline="false"></span> Shiny

**Tools and Frameworks:** SpellHub, RuneFlow, TensorMagic, ArcaneNet

**Languages:** Common Language (native), Elvish (proficient)
`

export const DEFAULT_CSS_CONTENT = `/* Backbone CSS for Resume Template 1 */

/* Basic */

:root {
  --md-accent: #377bb5;
}

${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  @apply bg-white text-black text-justify hyphens-auto;
}

${PREVIEW_SELECTOR} {
  @apply text-base;
}

${PREVIEW_SELECTOR} p,
${PREVIEW_SELECTOR} li {
  @apply m-0 leading-tight;
}

/* Headings */

${PREVIEW_SELECTOR} h1 {
  @apply font-bold text-4xl text-[--md-accent];
}

${PREVIEW_SELECTOR} h2 {
  @apply font-bold text-lg leading-normal my-1 text-[--md-accent];
  @apply border-b-solid border-b-1 border-b-[--md-accent];
}

${PREVIEW_SELECTOR} h3 {
  @apply font-bold text-lg leading-normal my-1 text-[--md-accent];
}

/* Links */

${PREVIEW_SELECTOR} a {
  @apply text-[--md-accent];
}

/* Lists */

${PREVIEW_SELECTOR} ul {
  @apply pl-6 my-1 list-circle;
}

${PREVIEW_SELECTOR} ol {
  @apply pl-6 my-1 list-decimal;
}

/* SVG & Images */

${PREVIEW_SELECTOR} svg.iconify {
  @apply align-[-4px];
}

${PREVIEW_SELECTOR} img {
  @apply max-w-full;
}

/* Dark & print mode */

/*
.dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  @apply bg-neutral-900 text-neutral-200;
}

@media print {
  .dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
    @apply bg-white text-black;
  }
}
*/
`
