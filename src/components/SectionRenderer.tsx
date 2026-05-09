import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import MealOptions from "@/components/MealOptions";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections: any[];
};

export default function SectionRenderer({ sections }: Props) {
  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero":
            return <Hero key={section._key} data={section} />;
          case "socialProof":
            return <SocialProof key={section._key} data={section} />;
          case "mealOptions":
            return <MealOptions key={section._key} data={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
