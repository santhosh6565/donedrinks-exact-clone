import creamOnion from "@/assets/products/lotferox-cream-onion-makhana-25gm.webp";
import himalayanSaltPepper from "@/assets/products/lotferox-himalayan-salt-pepper-makhana-25gm.webp";
import mintPudina from "@/assets/products/lotferox-mint-pudina-makhana-25gm.webp";
import mixMasala from "@/assets/products/lotferox-mix-masala-makhana-25gm.webp";
import periPeri from "@/assets/products/lotferox-peri-peri-makhana-25gm.webp";
import rawMakhana from "@/assets/products/lotferox-raw-makhana-25gm.webp";
import tangyCheese from "@/assets/products/lotferox-tangy-cheese-makhana-25gm.webp";
import tomatoTango from "@/assets/products/lotferox-tomato-tango-makhana-25gm.webp";
import benefitBowl from "@/assets/sections/benefit-makhana-bowl.webp";
import benefitLifestyle from "@/assets/sections/benefit-healthy-snacking-lifestyle.webp";
import benefitCollection from "@/assets/sections/benefit-makhana-collection.webp";
import benefitHarvest from "@/assets/sections/benefit-makhana-harvest.webp";

export const companyInfo = {
  name: "LotFerox Nuts",
  address: "Chennai - 600130, Tamil Nadu",
  fssai: "12426008001442",
  email: "lotferoxnuts@gmail.com",
  phone: "+91 72001 78469",
  whatsappNumber: "917200178469",
};

export interface ProcessStage {
  number: string;
  title: string;
  description: string;
  accent: string;
}

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Quality Fox Nuts Selected",
    description:
      "LoTFerox starts with carefully selected makhana, also known as fox nuts, chosen for a light and crisp snacking experience.",
    accent: "var(--sage)",
  },
  {
    number: "02",
    title: "Roasted, Not Fried",
    description:
      "Each batch is roasted to build crunch without deep frying, making it a smarter everyday snack.",
    accent: "var(--cream)",
  },
  {
    number: "03",
    title: "Light & Crunchy Texture",
    description:
      "The fox nuts are popped into airy bites with the signature light, crunchy and delicious texture printed on every pack.",
    accent: "var(--blush)",
  },
  {
    number: "04",
    title: "Eight Makhana Products",
    description:
      "Choose from the full LoTFerox lineup of seasoned makhana flavours and premium Raw Makhana.",
    accent: "var(--coral)",
  },
  {
    number: "05",
    title: "Packed Fresh for Everyday Snacking",
    description:
      "Every flavour is packed for quick snacking at work, school, travel or home.",
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
    name: "Mint Pudina",
    description:
      "A cool, refreshing roasted makhana flavour with minty pudina notes for crisp, smart snacking.",
    image: mintPudina,
    bg: "linear-gradient(135deg, #123c24 0%, #5fbf72 100%)",
    text: "#f8fff1",
    accent: "#8de08d",
    ingredients: ["Vegan", "Roasted Not Fried", "Cool Mint"],
  },
  {
    name: "Himalayan Salt & Pepper",
    description:
      "Classic salted makhana with a peppery kick, made for people who like clean crunch with bold taste.",
    image: himalayanSaltPepper,
    bg: "linear-gradient(135deg, #1b1b1b 0%, #8c8f91 52%, #f0b389 100%)",
    text: "#ffffff",
    accent: "#f0b389",
    ingredients: ["Gluten Free", "Light & Crunchy", "Pepper Kick"],
  },
  {
    name: "Cream & Onion",
    description:
      "Creamy, savoury roasted fox nuts with onion-style seasoning for a smooth and addictive crunch.",
    image: creamOnion,
    bg: "linear-gradient(135deg, #241024 0%, #8d3c96 52%, #6fc56f 100%)",
    text: "#fff7ff",
    accent: "#b673c2",
    ingredients: ["Guilt Free", "Snack Smart", "Creamy Bite"],
  },
  {
    name: "Mix Masala",
    description:
      "A lively Indian masala makhana flavour with warm spice notes for snack-time cravings.",
    image: mixMasala,
    bg: "linear-gradient(135deg, #3d1f10 0%, #c46b1f 58%, #f1dfbd 100%)",
    text: "#fff8ec",
    accent: "#f0a13a",
    ingredients: ["Roasted", "Delicious", "Masala Spice"],
  },
  {
    name: "Tomato Tango",
    description:
      "Tangy tomato-style roasted makhana with a playful punch of flavour in every crunchy bite.",
    image: tomatoTango,
    bg: "linear-gradient(135deg, #233f8f 0%, #d9364d 54%, #f495a8 100%)",
    text: "#fff7f8",
    accent: "#ff6b6b",
    ingredients: ["Vegan", "Weight Friendly", "Tangy Tomato"],
  },
  {
    name: "Tangy Cheese",
    description:
      "A cheesy, tangy roasted makhana flavour with a savoury punch for crunchy snack cravings.",
    image: tangyCheese,
    bg: "linear-gradient(135deg, #4b2608 0%, #d47b18 54%, #ffd166 100%)",
    text: "#fff8ec",
    accent: "#ffd166",
    ingredients: ["Roasted", "Cheesy Tang", "Crunchy Bite"],
  },
  {
    name: "Raw Makhana",
    description:
      "Premium raw fox nuts for light, crunchy and naturally delicious everyday snacking.",
    image: rawMakhana,
    bg: "linear-gradient(135deg, #fff2d8 0%, #f28a20 48%, #6f2d90 100%)",
    text: "#2b211b",
    accent: "#f28a20",
    ingredients: ["Raw Fox Nuts", "Gluten Free", "Naturally Light"],
  },
  {
    name: "Peri Peri",
    description:
      "A spicy, tangy roasted makhana flavour with a peri peri kick for a bold and addictive crunch.",
    image: periPeri,
    bg: "linear-gradient(135deg, #233f8f 0%, #8f2430 48%, #d9364d 72%, #f495a8 100%)",
    text: "#fff7f8",
    accent: "#ff6b6b",
    ingredients: ["Roasted", "Spicy Peri", "Crunchy Bite"],
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
    title: "Roasted, not fried.",
    description:
      "LoTFerox roasted makhana gives you the crunch you want without the heaviness of fried snacks.",
    bg: "var(--cocoa)",
    text: "var(--cream)",
    tall: true,
  },
  { kind: "image", src: benefitBowl, alt: "Bowl of popped makhana", tall: false },
  {
    kind: "text",
    title: "Vegan and gluten free.",
    description: "A front-of-pack promise for smart snackers looking for simple everyday munching.",
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
    title: "Light. Crunchy. Delicious.",
    description: "Light, crunchy fox nuts with bold seasoning.",
    bg: "var(--blush)",
    text: "var(--coral-deep)",
  },
  {
    kind: "image",
    src: benefitCollection,
    alt: "Lotus pods and seeds harvest",
  },
  {
    kind: "text",
    title: "Eight smart products.",
    description:
      "Seasoned makhana flavours plus premium Raw Makhana in handy packs.",
    bg: "var(--sage)",
    text: "var(--cocoa)",
    tall: true,
  },
  {
    kind: "image",
   
    src: benefitHarvest,
    alt: "Collection of makhana pouches",
  },
];
