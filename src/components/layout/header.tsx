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
          {/* Language Switcher */}
          <div className="flex items-center text-xs font-bold text-muted-foreground bg-secondary rounded-full p-1 cursor-pointer">
            <div 
              onClick={() => setLocale("en")} 
              className={`px-3 py-1.5 rounded-full transition-all ${locale === 'en' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:text-foreground'}`}
            >
              EN
            </div>
            <div 
              onClick={() => setLocale("vi")} 
              className={`px-3 py-1.5 rounded-full transition-all ${locale === 'vi' ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:text-foreground'}`}
            >
              VI
            </div>
          </div>

          <Link href="/login" className="hidden md:inline-flex text-sm font-semibold text-muted-foreground hover:text-foreground">
            {t.nav.signIn}
          </Link>
          <Link href="/assessment">
            <Button className="rounded-full px-6 font-bold shadow-md">
              {t.nav.startAssessment}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
