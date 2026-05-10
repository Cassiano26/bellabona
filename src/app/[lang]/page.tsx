import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { client } from "@/sanity/lib/client";
import { pageQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import SectionRenderer from "@/components/SectionRenderer";
import Footer from "@/components/Footer";

export const revalidate = 0;

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityPage = { sections: any[]; seo?: any } | null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const [page, settings] = await Promise.all([
    client.fetch<SanityPage>(pageQuery, { slug: "home", language: lang }),
    client.fetch(siteSettingsQuery),
  ]);

  const seo = page?.seo;
  const fallbackTitle = settings?.seo?.metaTitle || settings?.title || "Bellabona";
  const fallbackDesc = settings?.seo?.metaDescription || settings?.description || "";

  return {
    title: seo?.metaTitle || fallbackTitle,
    description: seo?.metaDescription || fallbackDesc,
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const [dict, page] = await Promise.all([
    getDictionary(lang as Locale),
    client.fetch<SanityPage>(pageQuery, { slug: "home", language: lang }),
  ]);

  return (
    <>
      <Header lang={lang} dict={dict.header} />
      <main>
        <SectionRenderer sections={page?.sections ?? []} />
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
