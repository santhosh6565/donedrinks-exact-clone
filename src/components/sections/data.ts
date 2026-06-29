import flavorChocolate from "@/assets/flavor-chocolate.png";
import flavorCaramel from "@/assets/flavor-caramel.png";
import flavorStrawberry from "@/assets/flavor-strawberry.png";
import benefitBowl from "@/assets/benefit-bowl.jpg";
import benefitLifestyle from "@/assets/benefit-lifestyle.jpg";
import benefitCollection from "@/assets/benefit-collection.jpg";
import benefitHarvest from "@/assets/benefit-harvest.jpg";

export interface ProcessStage {
  number: string;
  title: string;
  description: string;
  accent: string;
}

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Sustainably Harvested",
    description:
      "Our premium Makhana is carefully harvested from the finest Euryale ferox farms, ensuring exceptional quality and freshness from the source.",
    accent: "var(--sage)",
  },
  {
    number: "02",
    title: "Naturally Dried & Roasted",
    description:
      "The harvested seeds are naturally dried and expertly roasted to develop their signature light, crunchy texture.",
    accent: "var(--cream)",
  },
  {
    number: "03",
    title: "Popped to Perfection",
    description:
      "Using traditional techniques, each seed is perfectly popped to create the crisp, airy snack loved by all.",
    accent: "var(--blush)",
  },
  {
    number: "04",
    title: "Infused with Signature Flavours",
    description:
      "From classic spices to bold gourmet seasonings, every batch is coated with carefully crafted flavours for an unforgettable taste.",
    accent: "var(--coral)",
  },
  {
    number: "05",
    title: "Packed with Your Favourite Flavour",
    description:
      "Freshly packed using hygienic, freshness-lock packaging to preserve the crunch, aroma, and delicious flavour in every bite.",
    accent: "var(--coral-deep)",
  },
];

export interface Flavor {
  name: string;
  description: string;
  image: string;
  bg: string;
  text: string;
  accent: string;
  ingredients: string[];
}

export const flavors: Flavor[] = [
  {
    name: "Chocolate",
    description:
      "Rich Belgian-style cocoa folded into crisp lotus pops. Dessert energy, no guilt.",
    image: flavorChocolate,
    bg: "oklch(0.94 0.03 60)",
    text: "var(--cocoa)",
    accent: "var(--cocoa)",
    ingredients: ["Cocoa", "Vanilla", "Sea salt"],
  },
  {
    name: "Salted Caramel",
    description:
      "Slow-cooked caramel meets flaky sea salt — buttery, golden, and impossibly crunchy.",
    image: flavorCaramel,
    bg: "oklch(0.92 0.07 75)",
    text: "var(--cocoa)",
    accent: "var(--coral-deep)",
    ingredients: ["Caramel", "Butter", "Sea salt"],
  },
  {
    name: "Strawberry",
    description:
      "Sun-ripened strawberry dusted onto airy makhana. Bright, tart, and a little playful.",
    image: flavorStrawberry,
    bg: "oklch(0.92 0.05 20)",
    text: "var(--coral-deep)",
    accent: "var(--coral-deep)",
    ingredients: ["Strawberry", "Beet", "Vanilla"],
  },
];

export type BenefitItem =
  | {
      kind: "text";
      title: string;
      description: string;
      bg: string;
      text: string;
      tall?: boolean;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      tall?: boolean;
    };

export const benefits: BenefitItem[] = [
  {
    kind: "text",
    title: "20g of plant-rich protein.",
    description:
      "Every pouch is engineered for the busy days — protein that actually keeps you going.",
    bg: "var(--cocoa)",
    text: "var(--cream)",
    tall: true,
  },
  { kind: "image", src: benefitBowl, alt: "Bowl of popped makhana", tall: false },
  {
    kind: "text",
    title: "Zero added sugar.",
    description: "Sweetness from real ingredients. Nothing sneaky on the back of the pack.",
    bg: "var(--coral)",
    text: "var(--cocoa)",
  },
  {
    kind: "image",
    src: benefitLifestyle,
    alt: "Woman enjoying makhana snack",
    tall: true,
  },
  {
    kind: "text",
    title: "Light, crisp, addictive.",
    description: "Airy texture, big crunch, small calories — the snack that doesn't quit.",
    bg: "var(--blush)",
    text: "var(--coral-deep)",
  },
  {
    kind: "image",
    src: benefitCollection,
    alt: "Collection of makhana pouches",
  },
  {
    kind: "text",
    title: "Naturally gluten-free.",
    description: "Wholesome, simple, and friendly to every kind of pantry.",
    bg: "var(--sage)",
    text: "var(--cocoa)",
    tall: true,
  },
  {
    kind: "image",
    src: benefitHarvest,
    alt: "Lotus pods and seeds harvest",
  },
];
