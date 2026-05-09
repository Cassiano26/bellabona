import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { client } from "@/sanity/lib/client";
import { pageQuery, siteSettingsQuery, allPagesQuery } from "@/sanity/lib/queries";
import Header from "@/components/Header";
import SectionRenderer from "@/components/SectionRenderer";
import Footer from "@/components/Footer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityPage = { title: string; sections: any[]; seo?: any } | null;

export async function generateStaticParams() {
  const pages = await client.fetch<
    { slug: { current: string }; language: string }[]
  >(allPagesQuery);

  return pages
    .filter((p) => p.slug?.current && p.slug.current !== "home")
    .map((p) => ({ lang: p.language, slug: p.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const [page, settings] = await Promise.all([
    client.fetch<SanityPage>(pageQuery, { slug, language: lang }),
    client.fetch(siteSettingsQuery),
  ]);

  if (!page) return {};

  const seo = page.seo;
  const fallbackTitle =
    settings?.seo?.metaTitle || settings?.title || "Bellabona";

  return {
    title: seo?.metaTitle || `${page.title} | ${fallbackTitle}`,
    description:
      seo?.metaDescription ||
      settings?.seo?.metaDescription ||
      settings?.description ||
      "",
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const [dict, page] = await Promise.all([
    getDictionary(lang as Locale),
    client.fetch<SanityPage>(pageQuery, { slug, language: lang }),
  ]);

  if (!page) notFound();

  return (
    <>
      <Header lang={lang} dict={dict.header} />
      <main>
        {page.sections?.length ? (
          <SectionRenderer sections={page.sections} />
        ) : (
          <section className="mx-auto max-w-4xl px-5 py-16 lg:px-10 lg:py-20">
            <h1 className="text-4xl font-bold text-gray-900">{page.title}</h1>
          </section>
        )}
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
