"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BarChart3, Search, Target, CheckCircle2, Factory, LayoutDashboard } from "lucide-react";

export default function PlatformHomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="pt-20 pb-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          {/* Eyebrow & Full-width Headline */}
          <div className="mb-12">
            <div className="text-[11px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
              {t.hero.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-foreground leading-[1.15] tracking-tight whitespace-pre-line max-w-5xl">
              {t.hero.headline}
            </h1>
          </div>

          {/* Subheadline + CTAs and Dashboard Mockup */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 w-full max-w-xl">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground whitespace-pre-line mb-10 leading-relaxed">
                {t.hero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Link href="/assessment">
                  <Button className="w-full sm:w-auto bg-primary hover:bg-[#DC6815] text-primary-foreground rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-primary/10 transition-transform active:scale-95">
                    {t.hero.cta1} <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/fca-external">
                  <Button variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-secondary rounded-full px-8 h-14 text-base font-bold shadow-sm">
                    {t.hero.cta2}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg">
              {/* Minimalist Dashboard Mockup (Dark Sidebar + Light Workspace) */}
              <div className="flex h-72 w-full rounded-[1.5rem] overflow-hidden shadow-2xl border border-border/50">
                {/* Dark Sidebar */}
                <div className="w-16 bg-secondary flex flex-col items-center py-6 border-r border-border">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center mb-8">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                  </div>
                  <div className="space-y-6">
                    <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center"><LayoutDashboard className="w-3.5 h-3.5 text-white" /></div>
                    <div className="w-6 h-6 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-[#5F6966]" /></div>
                    <div className="w-6 h-6 flex items-center justify-center"><Target className="w-3.5 h-3.5 text-[#5F6966]" /></div>
                  </div>
                </div>
                {/* Light Workspace */}
                <div className="flex-1 bg-[#F5F6F6] p-6 relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  <div className="text-[10px] font-bold text-[#828A87] uppercase tracking-widest mb-1">CAPABILITY SCORE</div>
                  <div className="text-4xl font-black text-[#17201E] mb-6">74<span className="text-lg text-[#828A87] font-medium">/100</span></div>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Management System", val: "82%" },
                      { name: "Waste & Flow", val: "65%" },
                      { name: "Quality Control", val: "90%" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center px-4 py-2.5 rounded-lg bg-white border border-[#E3E6E5]">
                        <span className="text-xs font-semibold text-[#5F6966]">{item.name}</span>
                        <span className="text-xs font-bold text-[#17201E]">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW FA WORKS */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-foreground">{t.howItWorks.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/8 right-1/8 h-[1px] bg-border -z-10"></div>
            
            {[
              { t: t.howItWorks.s1Title, d: t.howItWorks.s1Desc, icon: Target },
              { t: t.howItWorks.s2Title, d: t.howItWorks.s2Desc, icon: Factory },
              { t: t.howItWorks.s3Title, d: t.howItWorks.s3Desc, icon: BarChart3 },
              { t: t.howItWorks.s4Title, d: t.howItWorks.s4Desc, icon: CheckCircle2 }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto bg-secondary border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-foreground mb-3">{step.t}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px] mx-auto">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TWO ASSESSMENT METHODS */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{t.methods.title}</h2>
            <p className="text-lg text-muted-foreground whitespace-pre-line">{t.methods.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INTERNAL CARD */}
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-md flex flex-col transition-transform hover:-translate-y-1">
              <div className="text-primary font-black text-xs tracking-widest uppercase mb-4">FCA Internal</div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2">{t.methods.internal.title}</h3>
              <p className="text-muted-foreground font-medium whitespace-pre-line mb-8 leading-relaxed">{t.methods.internal.subtitle}</p>
              <p className="text-muted-foreground mb-8 text-sm">{t.methods.internal.desc}</p>
              
              <div className="mb-8 flex-1">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.methods.internal.suitableFor}</div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.methods.internal.targets.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary text-foreground text-xs font-semibold rounded-md border border-border">{t}</span>
                  ))}
                </div>
                
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.methods.internal.outputsLabel}</div>
                <ul className="space-y-3">
                  {t.methods.internal.outputs.map((out, i) => (
                    <li key={i} className="flex items-start text-foreground text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-3 mt-0.5 shrink-0" /> {out}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-secondary rounded-xl mb-8 text-center text-xs font-bold text-muted-foreground tracking-widest uppercase border border-border">
                {t.methods.internal.flow}
              </div>

              <Link href="/assessment" className="mt-auto">
                <Button className="w-full bg-primary hover:bg-[#DC6815] text-primary-foreground rounded-xl h-12 text-sm font-bold">
                  {t.methods.internal.cta}
                </Button>
              </Link>
            </div>

            {/* EXTERNAL CARD */}
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-md flex flex-col transition-transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-secondary pointer-events-none">
                <Search className="w-32 h-32 opacity-20" />
              </div>
              <div className="text-primary font-black text-xs tracking-widest uppercase mb-4 relative z-10">FCA External</div>
              <h3 className="text-2xl font-bold text-card-foreground mb-2 relative z-10">{t.methods.external.title}</h3>
              <p className="text-muted-foreground font-medium whitespace-pre-line mb-8 leading-relaxed relative z-10">{t.methods.external.subtitle}</p>
              <p className="text-muted-foreground mb-8 text-sm relative z-10">{t.methods.external.desc}</p>
              
              <div className="mb-8 flex-1 relative z-10">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.methods.external.suitableFor}</div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {t.methods.external.targets.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-secondary text-foreground text-xs font-semibold rounded-md border border-border">{t}</span>
                  ))}
                </div>
                
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">{t.methods.external.outputsLabel}</div>
                <ul className="space-y-3">
                  {t.methods.external.outputs.map((out, i) => (
                    <li key={i} className="flex items-start text-foreground text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-3 mt-0.5 shrink-0" /> {out}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-secondary rounded-xl mb-8 text-center text-xs font-bold text-muted-foreground tracking-widest uppercase border border-border relative z-10">
                {t.methods.external.flow}
              </div>

              <Link href="/fca-external" className="mt-auto relative z-10">
                <Button variant="outline" className="w-full bg-transparent border-border text-foreground hover:bg-secondary rounded-xl h-12 text-sm font-bold">
                  {t.methods.external.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON SECTION */}
      <section className="py-24 bg-secondary text-[#F7F8F8] border-y border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold">{t.comparison.title}</h2>
          </div>
          
          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <div className="grid grid-cols-3 border-b border-border text-xs font-bold tracking-widest uppercase text-[#828A87] bg-secondary">
              <div className="p-6"></div>
              <div className="p-6 text-center text-[#F7F8F8] border-x border-border">FCA Internal</div>
              <div className="p-6 text-center text-[#F7F8F8]">FCA External</div>
            </div>
            
            {[
              { l: t.comparison.purpose, i: t.comparison.purposeInt, e: t.comparison.purposeExt },
              { l: t.comparison.evaluator, i: t.comparison.evaluatorInt, e: t.comparison.evaluatorExt },
              { l: t.comparison.focus, i: t.comparison.focusInt, e: t.comparison.focusExt },
              { l: t.comparison.evidence, i: t.comparison.evidenceInt, e: t.comparison.evidenceExt },
              { l: t.comparison.output, i: t.comparison.outputInt, e: t.comparison.outputExt },
              { l: t.comparison.question, i: t.comparison.questionInt, e: t.comparison.questionExt },
            ].map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 border-b border-border text-sm font-medium hover:bg-background transition-colors">
                <div className="p-5 flex items-center text-[#B7BFBC]">{row.l}</div>
                <div className="p-5 flex items-center justify-center text-center text-[#F7F8F8] bg-background/50 border-x border-border">{row.i}</div>
                <div className="p-5 flex items-center justify-center text-center text-[#B7BFBC]">{row.e}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ASSESS WHAT MATTERS (MODULES) */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">{t.modules.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.modules.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              t.modules.m1, t.modules.m2, t.modules.m3, t.modules.m4,
              t.modules.m5, t.modules.m6, t.modules.m7, t.modules.m8,
              t.modules.m9, t.modules.m10, t.modules.m11
            ].map((mod, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-xl flex items-center justify-center text-center hover:border-primary/50 transition-colors group">
                <span className="text-foreground font-semibold text-sm">{mod}</span>
              </div>
            ))}
            <div className="bg-secondary border border-border border-dashed p-6 rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-muted-foreground font-medium text-sm mb-2">More Modules</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-sm">{t.modules.comingSoon}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAPABILITY MODEL */}
      <section className="py-20 bg-secondary border-y border-border px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">{t.model.title}</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">{t.model.subtitle}</p>
          <div className="bg-card p-6 rounded-xl border border-border font-bold text-sm tracking-widest text-primary uppercase mb-6 inline-block w-full overflow-x-auto whitespace-nowrap shadow-sm">
            {t.model.flow}
          </div>
          <p className="text-muted-foreground text-sm font-medium">{t.model.poweredBy}</p>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-24 px-4 text-center bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">{t.finalCta.headline}</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">{t.finalCta.subheadline}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button className="w-full sm:w-auto bg-primary hover:bg-[#DC6815] text-primary-foreground rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-primary/10 transition-transform active:scale-95">
                {t.finalCta.cta1}
              </Button>
            </Link>
            <Link href="/fca-external">
              <Button variant="outline" className="w-full sm:w-auto border-border text-foreground hover:bg-secondary rounded-full px-8 h-14 text-base font-bold shadow-sm">
                {t.finalCta.cta2}
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}


