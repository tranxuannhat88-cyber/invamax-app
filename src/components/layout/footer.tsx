"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background text-muted-foreground py-16 text-sm border-t border-border font-sans">
      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="text-foreground">INVA</span>
              <span className="text-primary">MAX</span>
              <span className="text-muted-foreground ml-1.5 font-bold tracking-normal">FA</span>
            </div>
          </Link>
          <p className="max-w-xs text-muted-foreground font-medium leading-relaxed">
            {t.nav.platform}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-foreground font-bold tracking-widest text-xs uppercase mb-6">Platform</h4>
          <ul className="space-y-3 font-medium text-muted-foreground">
            <li><Link href="/fca-internal" className="hover:text-foreground transition-colors">{t.nav.internal}</Link></li>
            <li><Link href="/fca-external" className="hover:text-foreground transition-colors">{t.nav.external}</Link></li>
            <li><Link href="/assessments" className="hover:text-foreground transition-colors">{t.nav.assessments}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-4">
          <h4 className="text-foreground font-bold tracking-widest text-xs uppercase mb-6">Company</h4>
          <ul className="space-y-3 font-medium text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground transition-colors">{t.nav.about}</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">{t.nav.contact}</Link></li>
            <li><Link href="/privacy" className="hover:text-foreground transition-colors">{t.nav.privacy}</Link></li>
            <li><Link href="/terms" className="hover:text-foreground transition-colors">{t.nav.terms}</Link></li>
          </ul>
        </div>
        
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between font-medium">
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} INVAMAX. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 text-muted-foreground">
          <a href="https://invamax.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">INVAMAX.com</a>
        </div>
      </div>
    </footer>
  );
}
