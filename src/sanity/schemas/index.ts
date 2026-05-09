import { seo } from "./seo";
import { siteSettings } from "./siteSettings";
import { page } from "./page";
import { hero } from "./sections/hero";
import { socialProof } from "./sections/socialProof";
import { mealOptions } from "./sections/mealOptions";

export const schemaTypes = [
  // Object types
  seo,
  hero,
  socialProof,
  mealOptions,
  // Document types
  page,
  siteSettings,
];
