"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function FCAInternalPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-3xl text-center">
        <div className="text-primary font-black text-sm tracking-widest uppercase mb-6">FCA Internal</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">{t.methods.internal.title}</h1>
        <p className="text-xl text-muted-foreground whitespace-pre-line mb-12 leading-relaxed max-w-2xl mx-auto">
          {t.methods.internal.subtitle}
        </p>
        
        <div className="bg-card p-8 rounded-2xl shadow-md border border-border mb-12 max-w-xl mx-auto text-left">
          <p className="text-card-foreground mb-8 text-lg">{t.methods.internal.desc}</p>
          <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.methods.internal.outputsLabel}</div>
          <ul className="space-y-3 mb-8">
            {t.methods.internal.outputs.map((out, i) => (
              <li key={i} className="flex items-center text-foreground font-medium">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" /> {out}
              </li>
            ))}
          </ul>
        </div>

        <Link href="/assessment">
          <Button className="bg-primary hover:bg-[#DC6815] text-primary-foreground rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-primary/10 transition-transform active:scale-95">
            {t.methods.internal.cta} <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
