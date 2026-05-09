import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  projectId: "5lanl5gc",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function uploadImage(filePath: string, filename: string) {
  const fullPath = join(process.cwd(), "public", filePath);
  const buffer = readFileSync(fullPath);
  const contentType = filePath.endsWith(".svg")
    ? "image/svg+xml"
    : filePath.endsWith(".png")
      ? "image/png"
      : "image/jpeg";

  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType,
  });

  return {
    _type: "image" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function seed() {
  console.log("Uploading images...");

  const [heroImage, ifcoLogo, atollsLogo, ...mealImages] = await Promise.all([
    uploadImage("hero.png", "hero.png"),
    uploadImage("logos/ifco.svg", "ifco.svg"),
    uploadImage("logos/atolls.svg", "atolls.svg"),
    uploadImage("meals/salad-pears-tofu.png", "salad-pears-tofu.png"),
    uploadImage("meals/tuna-egg-rice.png", "tuna-egg-rice.png"),
    uploadImage("meals/thai-chicken-salad.png", "thai-chicken-salad.png"),
    uploadImage("meals/bacon-cheeseburger.png", "bacon-cheeseburger.png"),
    uploadImage("meals/greek-chopped-salad.png", "greek-chopped-salad.png"),
    uploadImage("meals/hawaiian-chicken-poke.png", "hawaiian-chicken-poke.png"),
  ]);

  console.log("Images uploaded. Creating pages...");

  const enPage = {
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    language: "en",
    sections: [
      {
        _type: "hero",
        _key: "hero-en",
        heading: "Offer Lunch to\nBuild Culture &\nCut Costs",
        description:
          "30+ fresh, chef-made meals weekly, delivered straight to the office, employees order via app – all diets, no admin",
        ctaText: "Book a free team lunch",
        ctaLink: "#book",
        image: heroImage,
        foodBadges: [
          { _key: "fb1", name: "Schnitzel", icon: "🍽️", metric: "⭐ 4.9" },
          { _key: "fb2", name: "Kebab Bowl", icon: "🥗", metric: "❤️ 257" },
          { _key: "fb3", name: "Greek Salad", icon: "🥬", metric: "⭐ 5.0" },
        ],
      },
      {
        _type: "socialProof",
        _key: "socialproof-en",
        title: "Loved by +X00 customers",
        logos: [
          { _key: "l1", name: "IFCO", logo: ifcoLogo },
          { _key: "l2", name: "atolls", logo: atollsLogo },
        ],
        stats: [
          { _key: "s1", value: "9/10", label: "Employee Satisfaction" },
          { _key: "s2", value: "30-40%", label: "More teams in the office" },
          {
            _key: "s3",
            value: "1.2 MM",
            label: "Meals delivered in Munich & Berlin",
          },
        ],
      },
      {
        _type: "mealOptions",
        _key: "mealoptions-en",
        heading:
          "30+ Meal Options Every Week.\nMade Fresh Daily. For Every Diet.",
        ctaText: "Download the menu now",
        ctaLink: "#menu",
        meals: [
          {
            _key: "m1",
            tag: "Seasonal Specials",
            name: "Fresh Salad with Pears & Tofu",
            image: mealImages[0],
            rating: 94,
            reviews: 171,
          },
          {
            _key: "m2",
            tag: "High-Protein Meals",
            name: "High-Protein Tuna Egg Rice Bowl",
            image: mealImages[1],
            rating: 98,
            reviews: 322,
          },
          {
            _key: "m3",
            tag: "Gluten- & Lactose-Free",
            name: "Thai Chicken Salad",
            image: mealImages[2],
            rating: 92,
            reviews: 186,
          },
          {
            _key: "m4",
            tag: "International Cuisine",
            name: "Bacon Cheeseburger",
            image: mealImages[3],
            rating: 99,
            reviews: 532,
          },
          {
            _key: "m5",
            tag: "Vegan & Veggie Variety",
            name: "Greek Chopped Salad",
            image: mealImages[4],
            rating: 94,
            reviews: 202,
          },
          {
            _key: "m6",
            tag: "Allergy & Halal Friendly",
            name: "Hawaiian Chicken Poke",
            image: mealImages[5],
            rating: 97,
            reviews: 254,
          },
        ],
      },
    ],
    seo: {
      _type: "seo",
      metaTitle: "Bellabona – Office Lunch Delivery",
      metaDescription:
        "30+ fresh, chef-made meals weekly, delivered straight to the office.",
    },
  };

  const dePage = {
    _type: "page",
    title: "Startseite",
    slug: { _type: "slug", current: "home" },
    language: "de",
    sections: [
      {
        _type: "hero",
        _key: "hero-de",
        heading: "Team stärken &\nBudget entlasten\n– mit smartem Lunch",
        description:
          "30+ tägliche Optionen, alle Ernährungsweisen, ins Büro geliefert – günstiger als auswärts essen.",
        ctaText: "Bestellung starten",
        ctaLink: "#book",
        image: heroImage,
        foodBadges: [
          { _key: "fb1", name: "Schnitzel", icon: "🍽️", metric: "⭐ 4.9" },
          { _key: "fb2", name: "Kebab Bowl", icon: "🥗", metric: "❤️ 257" },
          { _key: "fb3", name: "Greek Salad", icon: "🥬", metric: "⭐ 5.0" },
        ],
      },
      {
        _type: "socialProof",
        _key: "socialproof-de",
        title: "Geliebt von +X00 Kunden",
        logos: [
          { _key: "l1", name: "IFCO", logo: ifcoLogo },
          { _key: "l2", name: "atolls", logo: atollsLogo },
        ],
        stats: [
          { _key: "s1", value: "9/10", label: "Mitarbeiterzufriedenheit" },
          { _key: "s2", value: "30-40%", label: "Mehr Teams im Büro" },
          {
            _key: "s3",
            value: "1,2 Mio",
            label: "Mahlzeiten in München & Berlin geliefert",
          },
        ],
      },
      {
        _type: "mealOptions",
        _key: "mealoptions-de",
        heading:
          "Jede Woche 30+ Gerichte.\nTäglich frisch. Für jede Ernährung.",
        ctaText: "Jetzt Menü herunterladen",
        ctaLink: "#menu",
        meals: [
          {
            _key: "m1",
            tag: "Saisonale Specials",
            name: "Frischer Salat mit Birnen & Tofu",
            image: mealImages[0],
            rating: 94,
            reviews: 171,
          },
          {
            _key: "m2",
            tag: "Proteinreiche Gerichte",
            name: "Protein Thunfisch-Ei-Reis Bowl",
            image: mealImages[1],
            rating: 98,
            reviews: 322,
          },
          {
            _key: "m3",
            tag: "Gluten- & Laktosefrei",
            name: "Thai-Hähnchensalat",
            image: mealImages[2],
            rating: 92,
            reviews: 186,
          },
          {
            _key: "m4",
            tag: "Internationale Küche",
            name: "Bacon Cheeseburger",
            image: mealImages[3],
            rating: 99,
            reviews: 532,
          },
          {
            _key: "m5",
            tag: "Vegan & Veggie",
            name: "Griechischer Salat",
            image: mealImages[4],
            rating: 94,
            reviews: 202,
          },
          {
            _key: "m6",
            tag: "Allergie- & Halal-freundlich",
            name: "Hawaiian Chicken Poke",
            image: mealImages[5],
            rating: 97,
            reviews: 254,
          },
        ],
      },
    ],
    seo: {
      _type: "seo",
      metaTitle: "Bellabona – Mittagessen ins Büro",
      metaDescription:
        "30+ täglich frische Gerichte, direkt ins Büro geliefert.",
    },
  };

  const transaction = client.transaction();
  transaction.create(enPage);
  transaction.create(dePage);

  const result = await transaction.commit();
  console.log("Seeded successfully!", result.documentIds);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
