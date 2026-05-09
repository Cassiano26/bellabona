import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./dictionaries";
import { geistSans, geistMono } from "../layout";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SiteSettings = { title?: string; description?: string; seo?: any } | null;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const settings = await client.fetch<SiteSettings>(siteSettingsQuery);

  const title = settings?.seo?.metaTitle || settings?.title || "Bellabona";
  const description =
    settings?.seo?.metaDescription || settings?.description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: lang,
    },
    ...(settings?.seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
