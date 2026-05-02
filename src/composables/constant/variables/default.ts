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

# Haha Ha

<span class="font-bold text-lg">Applying for: Cooking Engineer</span><br>
<span class="iconify" data-icon="tabler:phone"></span> (+1) 123-456-7890
| <span class="iconify" data-icon="tabler:mail"></span> icancook@email.com
| <span class="iconify" data-icon="tabler:brand-github"></span> Renovamen
| <span class="iconify" data-icon="charm:person"></span> zxh.me
</div>

<!-- Important: Replace all template content, especially contact details, with your own information. -->


## Education

**Harvest University**
  ~ Cambridge, MA

M.S. in Cooking Science
  ~ 09/2021 - 01/2023

**Huangdu Institute of Tofu**
  ~ Shanghai, China

B.Eng. in Salad Engineering
  ~ 09/2016 - 07/2020


## Publications

**Eating is All You Need**

<u>Haha Ha</u>, San Zhang

*Conference on Nutritional Ingredients Processing Systems (NIPS), 2099*

**You Only Cook Once: Unified, Real-Time Mapo Tofu Recipe**

<u>Haha Ha</u>, San Zhang, Si Li, Wu Wang

*Culinary Visualization and Potato Roasting Conference (CVPR), 2077 **(Best Paper Honorable Mention)***


## Experience

**Cooking Engineer Intern**
  ~ Microwavesoft
  ~ 07/2021 - Present

- Developed an innovative, versatile cooking methodology applicable across diverse ingredients, incorporating and improving upon recent culinary trends
- Created a streamlined cream of mushroom soup recipe, achieving results comparable to complex state-of-the-art techniques through a novel mushroom-cutting approach; published in NIPS 2099
- Designed a specialized cooking pan that enhanced research efficiency for team members


**Engineering Chef Intern**
  ~ University of California, Berkebake
  ~ 08/2020 - Present

- Developed a precise mapo tofu quality assessment technique using thermometer-based measurements
- Invented a rapid stir-frying algorithm for tofu cooking, replacing vague instructions like "add as much as you can" with specific hot sauce measurements; published in CVPR 2077
- Outperformed SOTA cooking methods in both efficiency and quality across experiments with popular tofu types


**Student Chef**
  ~ Cabbage Melon University
  ~ 03/2020 - 06/2020

- Developed an innovative mapo tofu consumption framework utilizing a spoon-chopstick combination
- Engineered a filtering method for tofu dataset creation, inspired by bean grinding techniques
- Established two new metrics for evaluating eating plan novelty and diversity


**Research Chef Intern**
  ~ Snapchopstick
  ~ 07/2018 - 08/2018

- Designed two novel sandwiches by repurposing breads and meat from traditional bacon cheeseburgers, maximizing resource efficiency
- Leveraged structure duality to boost cooking speed for two complementary tasks based on shared ingredients
- Surpassed strong baselines on QWE'15 and ASDF'14 dataset


## Awards and Honors

**Gold**, International Collegiate Catching Fish Contest (ICCFC)
  ~ 2018

**First Prize**, China National Scholarship for Outstanding Dragon Killers
  ~ 2017, 2018


## Skills

**Programming Languages:** <span class="iconify" data-icon="vscode-icons:file-type-python"></span> Frython, <span class="iconify" data-icon="vscode-icons:file-type-js-official"></span> JavaSauce / <span class="iconify" data-icon="vscode-icons:file-type-typescript-official"></span> TypeSauce, <span class="iconify" data-icon="vscode-icons:file-type-cpp2"></span> Cheese++, <span class="iconify" data-icon="logos:java" data-inline="false"></span> Java Bean

**Tools and Frameworks:** GrillHub, PanFlow, TensorFork, SpiceNet, $\\LaTeX$

**Languages:** Chinese (native), English (proficient)
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
