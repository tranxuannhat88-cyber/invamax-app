"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, CheckCircle2, ArrowLeft } from "lucide-react";

export default function FCAExternalPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
        <Search className="w-96 h-96 text-foreground" />
      </div>

      <div className="max-w-3xl text-center relative z-10">
        <div className="inline-block bg-primary/10 text-primary font-black text-xs tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
          {t.modules.comingSoon}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">{t.methods.external.title}</h1>
        <p className="text-xl text-muted-foreground whitespace-pre-line mb-12 leading-relaxed max-w-2xl mx-auto">
          {t.methods.external.subtitle}
        </p>
        
        <div className="bg-card p-8 rounded-2xl shadow-md border border-border mb-12 max-w-xl mx-auto text-left">
          <p className="text-card-foreground mb-8 text-lg">{t.methods.external.desc}</p>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.methods.external.outputsLabel}</div>
          <ul className="space-y-3">
            {t.methods.external.outputs.map((out, i) => (
              <li key={i} className="flex items-center text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> {out}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/">
          <Button variant="outline" className="bg-transparent border-border text-foreground hover:bg-secondary rounded-full px-8 h-14 text-base font-bold transition-all">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
