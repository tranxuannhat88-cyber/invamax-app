"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Header() {
  const { t, locale, setLocale } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        {/* Logo */}
        <Link href="/" className="flex flex-col justify-center transition-transform hover:scale-105 group py-1">
          <div className="text-xl md:text-2xl font-extrabold tracking-tight leading-tight">
            <span className="text-foreground">INVA</span>
            <span className="text-primary">MAX</span>
            <span className="text-muted-foreground ml-1.5 font-bold tracking-normal">FA</span>
          </div>
          <span className="text-[9px] md:text-[10px] font-semibold tracking-wider uppercase text-muted-foreground mt-0.5 whitespace-nowrap">
            {t.nav.platform}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">{t.nav.home}</Link>
          <Link href="/fca-internal" className="hover:text-foreground transition-colors">{t.nav.internal}</Link>
          <Link href="/fca-external" className="hover:text-foreground transition-colors">{t.nav.external}</Link>
          <Link href="/assessments" className="hover:text-foreground transition-colors">{t.nav.assessments}</Link>
          <Link href="/about" className="hover:text-foreground transition-colors">{t.nav.about}</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/login" className="hidden md:inline-flex text-sm font-semibold text-muted-foreground hover:text-foreground">
            {t.nav.signIn}
          </Link>
          <Link href="/assessment">
            <Button className="bg-primary hover:bg-[#DC6815] text-primary-foreground rounded-full px-5 h-10 text-sm font-bold shadow-md shadow-primary/20 transition-transform active:scale-95">
              {t.nav.startAssessment}
            </Button>
          </Link>

          {/* Language Switcher (Tiếng Việt / English with Flags) */}
          <div className="flex items-center gap-2.5 text-xs font-semibold border border-white/10 rounded-full px-3 py-1.5 bg-black/20 backdrop-blur-sm shrink-0">
            <button
              onClick={() => setLocale("vi")}
              className={`flex items-center gap-1.5 transition-all cursor-pointer ${
                locale === 'vi' 
                  ? 'text-primary font-bold opacity-100' 
                  : 'text-muted-foreground opacity-70 hover:opacity-100 hover:text-foreground'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg" 
                alt="VN" 
                className="w-4 h-2.5 rounded-[2px] object-cover shadow-sm"
              />
              <span>Tiếng Việt</span>
            </button>
            
            <span className="text-white/20 select-none">/</span>

            <button
              onClick={() => setLocale("en")}
              className={`flex items-center gap-1.5 transition-all cursor-pointer ${
                locale === 'en' 
                  ? 'text-primary font-bold opacity-100' 
                  : 'text-muted-foreground opacity-70 hover:opacity-100 hover:text-foreground'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" 
                alt="EN" 
                className="w-4 h-2.5 rounded-[2px] object-cover shadow-sm"
              />
              <span>English</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
