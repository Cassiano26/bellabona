import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

type Meal = {
  tag: string;
  name: string;
  image: { asset: unknown };
  rating: number;
  reviews: number;
};

function MealCard({ meal }: { meal: Meal }) {
  const imgSrc = urlFor(meal.image).width(400).height(400).url();

  return (
    <div className="flex min-w-[220px] flex-col rounded-2xl bg-white p-4">
      <span className="mb-3 flex w-fit items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
        {meal.tag}
        <svg className="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      <div className="overflow-hidden rounded-xl">
        <Image src={imgSrc} alt={meal.name} width={400} height={400} className="aspect-square w-full object-cover" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-gray-900">{meal.name}</h3>
      <p className="mt-1 flex items-center gap-1 text-xs text-gray-600">
        <span>👍</span>
        <span className="font-semibold text-gray-900">{meal.rating}%</span>
        <span className="text-gray-400">({meal.reviews} reviews)</span>
      </p>
    </div>
  );
}

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function MealOptions({ data }: Props) {
  const { heading, ctaText, ctaLink } = data;
  const meals: Meal[] = data.meals ?? [];
  return (
    <section className="bg-[#E6FFA9]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
        <h2 className="whitespace-pre-line text-center text-3xl font-bold leading-tight text-green-950 lg:text-5xl lg:leading-tight">
          {heading}
        </h2>

        {/* Mobile: horizontal scroll */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-4 lg:hidden">
          {meals.map((meal) => (
            <MealCard key={meal.name} meal={meal} />
          ))}
        </div>

        {/* Desktop: 3x2 grid */}
        <div className="mt-12 hidden grid-cols-3 gap-5 lg:grid">
          {meals.map((meal) => (
            <MealCard key={meal.name} meal={meal} />
          ))}
        </div>

        <div className="mt-10 flex justify-center lg:mt-14">
          <Link
            href={ctaLink}
            className="rounded-full bg-green-950 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-900"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
