import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import MealOptions from "@/components/MealOptions";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[];
  dict: Dictionary;
};

export default function SectionRenderer({ sections, dict }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} dict={dict.hero} data={section} />;
          case "socialProof":
            return (
              <SocialProof
                key={section._key}
                dict={dict.socialProof}
                data={section}
              />
            );
          case "mealOptions":
            return (
              <MealOptions
                key={section._key}
                dict={dict.mealOptions}
                data={section}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
