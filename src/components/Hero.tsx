import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/client";

const badgePositions = [
  "left-[12%] top-[68%]",
  "left-[38%] top-[72%]",
  "right-[4%] top-[78%]",
];

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function Hero({ data }: Props) {
  const { heading, description, ctaText, ctaLink, image } = data;
  const heroImageSrc = urlFor(image).width(800).height(600).url();

  const foodBadges = (data.foodBadges ?? []).map(
    (b: { name: string; icon: string; metric: string }, i: number) => ({
      ...b,
      position: badgePositions[i] ?? badgePositions[0],
    })
  );

  return (
    <section className="mx-auto max-w-7xl px-5 py-6 lg:px-10 lg:py-10">
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Green card */}
        <div className="flex flex-col justify-between rounded-3xl bg-green-950 px-8 py-10 lg:w-[45%] lg:px-12 lg:py-14">
          <h1 className="whitespace-pre-line text-3xl font-bold leading-tight text-[#E6FFA9] lg:text-5xl lg:leading-[1.15]">
            {heading}
          </h1>

          <div className="mt-8 lg:mt-auto">
            <p className="max-w-sm text-sm leading-relaxed text-gray-300 lg:text-base">
              {description}
            </p>

            <Link
              href={ctaLink}
              className="mt-6 inline-block rounded-full border-2 border-[#E6FFA9] bg-transparent px-6 py-3 text-sm font-semibold text-[#E6FFA9] transition-colors hover:bg-[#E6FFA9] hover:text-green-950 lg:mt-8"
            >
              {ctaText}
            </Link>
          </div>
        </div>

        {/* Image + badges */}
        <div className="relative flex-1">
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={heroImageSrc}
              alt="Team enjoying lunch together at the office"
              width={800}
              height={600}
              className="h-full w-full object-cover"
              priority
            />

            {/* Food badges */}
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {foodBadges.map((badge: { name: string; icon: string; metric: string; position: string }) => (
                <span
                  key={badge.name}
                  className={`absolute ${badge.position} inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800 shadow-md backdrop-blur-sm`}
                >
                  <span>{badge.icon}</span>
                  {badge.name}
                  <span className="text-[10px] text-gray-500">{badge.metric}</span>
                </span>
              ))}
            </div>

            {/* Store badges – desktop */}
            <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
              <Link href="#" className="flex h-10 items-center" aria-label="Get it on Google Play">
                <Image src="/badge-google-play.png" alt="Google Play" width={100} height={30} className="h-6 w-auto" />
              </Link>
              <Link href="#" className="flex h-10 items-center" aria-label="Download on App Store">
                <Image src="/badge-app-store.png" alt="App Store" width={100} height={30} className="h-6 w-auto" />
              </Link>
              <div className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium shadow-md backdrop-blur-sm">
                <span className="text-lg">G</span>
                <div className="flex text-yellow-400">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i}>{star}</span>
                  ))}
                </div>
                <span className="font-bold text-gray-800">4.7</span>
                <span className="text-gray-500">/5</span>
              </div>
            </div>
          </div>

          {/* Store badges – mobile */}
          <div className="mt-4 flex items-center justify-center gap-2 lg:hidden">
            <Link href="#" className="flex h-10 items-center" aria-label="Get it on Google Play">
              <Image src="/badge-google-play.png" alt="Google Play" width={100} height={30} className="h-6 w-auto" />
            </Link>
            <Link href="#" className="flex h-10 items-center" aria-label="Download on App Store">
              <Image src="/badge-app-store.png" alt="App Store" width={100} height={30} className="h-6 w-auto" />
            </Link>
            <div className="flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium shadow backdrop-blur-sm">
              <span className="text-lg">G</span>
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="font-bold text-gray-800">4.7</span>
              <span className="text-gray-500">/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
