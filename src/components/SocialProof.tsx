import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function SocialProof({ data }: Props) {
  const { title, logos, stats } = data;

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-20">
      <div className="flex flex-col items-center gap-4 text-center lg:flex-row lg:justify-center lg:gap-12">
        <p className="text-xl font-medium text-gray-800 lg:text-2xl">
          {title}
        </p>
        <div className="flex items-center gap-6">
          {(logos ?? []).map((logo: { name: string; logo: { asset: unknown } }) => (
            <Image
              key={logo.name}
              src={urlFor(logo.logo).width(160).url()}
              alt={logo.name}
              width={80}
              height={32}
              className="h-auto w-auto opacity-60 grayscale"
            />
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16">
        {(stats ?? []).map((stat: { value: string; label: string }) => (
          <div
            key={stat.value}
            className="rounded-2xl bg-gray-100 px-6 py-8 lg:px-8 lg:py-10"
          >
            <p className="text-5xl font-bold text-gray-900 lg:text-6xl">
              {stat.value}
            </p>
            <p className="mt-6 text-sm text-gray-600 lg:text-base">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
