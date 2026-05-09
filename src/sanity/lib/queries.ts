import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    seo {
      metaTitle,
      metaDescription,
      ogImage,
      noIndex,
    },
    email,
    socialLinks,
  }
`;

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug && language == $language][0]{
    title,
    slug,
    language,
    sections[]{
      _type,
      _key,
      ...,
      // Hero
      _type == "hero" => {
        heading,
        description,
        ctaText,
        ctaLink,
        image,
        foodBadges,
      },
      // Social Proof
      _type == "socialProof" => {
        title,
        logos[]{
          name,
          logo,
        },
        stats[]{
          value,
          label,
        },
      },
      // Meal Options
      _type == "mealOptions" => {
        heading,
        ctaText,
        ctaLink,
        meals[]{
          tag,
          name,
          image,
          rating,
          reviews,
        },
      },
    },
    seo,
  }
`;

export const allPagesQuery = groq`
  *[_type == "page"]{
    slug,
    language,
  }
`;
