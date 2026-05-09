"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type Props = {
  lang: string;
  dict: Dictionary["header"];
};

export default function Header({ lang, dict }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const switchLangHref = (targetLang: string) => {
    const segments = pathname.split("/");
    segments[1] = targetLang;
    return segments.join("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center px-5 py-4 lg:px-10">
        {/* Logo + nav */}
        <div className="flex items-center gap-10">
          <Link href={`/${lang}`} className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Bellabona"
              width={160}
              height={32}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href={`/${lang}#daily-lunch`}
            className="text-sm font-medium text-gray-800 transition-colors hover:text-green-900"
          >
            {dict.dailyLunch}
          </Link>

          <button className="flex items-center gap-1 text-sm font-medium text-gray-800 transition-colors hover:text-green-900">
            {dict.more}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          </nav>
        </div>

        {/* Desktop actions */}
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <Link
            href="#menu"
            className="text-sm font-medium text-gray-800 underline underline-offset-4 transition-colors hover:text-green-900"
          >
            {dict.downloadMenu}
          </Link>

          <Link
            href="#book"
            className="rounded-full bg-green-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-900"
          >
            {dict.bookFreeTesting}
          </Link>

          {/* Language toggle */}
          <div className="flex overflow-hidden rounded-full border border-gray-300 text-xs font-medium">
            <Link
              href={switchLangHref("en")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "en"
                  ? "bg-green-950 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              EN
            </Link>
            <Link
              href={switchLangHref("de")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "de"
                  ? "bg-green-950 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              DE
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ml-auto lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href={`/${lang}#daily-lunch`}
              className="text-sm font-medium text-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              {dict.dailyLunch}
            </Link>
            <button className="flex items-center gap-1 text-left text-sm font-medium text-gray-800">
              {dict.more}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </nav>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="#menu"
              className="text-sm font-medium text-gray-800 underline underline-offset-4"
              onClick={() => setMenuOpen(false)}
            >
              {dict.downloadMenu}
            </Link>
            <Link
              href="#book"
              className="inline-flex w-full justify-center rounded-full bg-green-950 px-5 py-2.5 text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              {dict.bookFreeTesting}
            </Link>
          </div>

          {/* Language toggle mobile */}
          <div className="mt-4 flex overflow-hidden rounded-full border border-gray-300 text-xs font-medium w-fit">
            <Link
              href={switchLangHref("en")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "en"
                  ? "bg-green-950 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              EN
            </Link>
            <Link
              href={switchLangHref("de")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "de"
                  ? "bg-green-950 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              DE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
