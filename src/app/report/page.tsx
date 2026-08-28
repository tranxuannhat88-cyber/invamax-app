"use client";

import { useEffect, useState } from "react";
import { questionsRawData } from "@/lib/questions_data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { Activity, AlertTriangle, CheckCircle2, Crown, Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ReportPage() {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { t } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('invamax_assessment_result');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const answers = parsed.answers || {};
        
        let wScore = 0, wWeight = 0;
        let sScore = 0, sWeight = 0;
        let mScore = 0, mWeight = 0;

        questionsRawData.slice(2).forEach(q => {
          const qId = q[0];
          const qPart = q[1];
          const qType = q[6];
          const weight = parseFloat(q[20]) || 0;
          
          if (!answers[qId]) return;
          
          let val = 0;
          if (qType === 'Thang điểm 0-4' || (qType && qType.includes('Thang điểm'))) {
            val = parseInt(answers[qId].split(' - ')[0]) || 0;
          }

          if (qPart.startsWith('B')) {
            wScore += val * weight;
            wWeight += weight;
          } else if (qPart.startsWith('C')) {
            sScore += val * weight;
            sWeight += weight;
          } else if (qPart.startsWith('D')) {
            mScore += val * weight;
            mWeight += weight;
          }
        });

        const wAvg = wWeight > 0 ? wScore / wWeight : 0;
        const sAvg = sWeight > 0 ? sScore / sWeight : 0;
        const mAvg = mWeight > 0 ? mScore / mWeight : 0;

        const warningScore = ((wAvg * 0.4 + sAvg * 0.4 + mAvg * 0.2) / 4) * 100;
        const healthScore = Math.max(0, Math.round(100 - warningScore));

        const chartData = [
          { subject: 'Quy trình & Lãng phí', A: Math.round(100 - (wAvg/4)*100), fullMark: 100 },
          { subject: 'Hiện trường (5S)', A: Math.round(100 - (sAvg/4)*100), fullMark: 100 },
          { subject: 'Hệ thống Quản trị', A: Math.round(100 - (mAvg/4)*100), fullMark: 100 },
          { subject: 'Chất lượng', A: Math.round(100 - (sAvg*0.8/4)*100), fullMark: 100 },
          { subject: 'Nhân sự', A: Math.round(100 - (mAvg*0.9/4)*100), fullMark: 100 },
        ];

        setReportData({
          company: parsed.company,
          healthScore,
          chartData
        });
      } catch (e) {
        console.error(e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background">{t.assessment.analyzing}</div>;
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <h2 className="text-2xl font-bold mb-4">{t.assessment.noData}</h2>
        <Link href="/assessment">
          <Button>{t.assessment.retake}</Button>
        </Link>
      </div>
    );
  }

  const { healthScore, chartData, company } = reportData;
  
  let statusText = t.assessment.danger;
  let statusColor = "text-red-500";
  if (healthScore >= 80) { statusText = t.assessment.excellent; statusColor = "text-green-500"; }
  else if (healthScore >= 60) { statusText = t.assessment.good; statusColor = "text-blue-500"; }
  else if (healthScore >= 40) { statusText = t.assessment.average; statusColor = "text-yellow-600"; }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border pt-6 pb-6 px-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center max-w-5xl">
          <Link href="/" className="inline-block">
            <div className="text-2xl font-extrabold tracking-tight">
              <span className="text-foreground">INVA</span>
              <span className="text-primary">MAX</span>
            </div>
          </Link>
          <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {t.assessment.reportTitle}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-5xl mt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{t.assessment.reportTitle}</h1>
          <p className="text-lg text-muted-foreground">{t.assessment.infoSection}: <strong className="text-foreground">{company}</strong></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Score Card */}
          <Card className="col-span-1 border-none shadow-xl shadow-border/50 rounded-3xl overflow-hidden bg-card">
            <div className="bg-primary h-2 w-full"></div>
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg text-muted-foreground uppercase tracking-wider">{t.assessment.healthScore}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8 pt-4">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                    strokeDasharray={440} 
                    strokeDashoffset={440 - (440 * healthScore) / 100}
                    className="text-primary transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-foreground">{healthScore}</span>
                  <span className="text-sm text-muted-foreground mt-1">/ 100</span>
                </div>
              </div>
              <div className="mt-6">
                <div className={`text-xl font-bold ${statusColor}`}>{statusText}</div>
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <Card className="col-span-1 md:col-span-2 border-none shadow-xl shadow-border/50 rounded-3xl bg-card p-2">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">{t.assessment.radarTitle}</CardTitle>
              <CardDescription>{t.assessment.radarDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Score" dataKey="A" stroke="#F47A20" fill="#F47A20" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Crown className="w-48 h-48" />
          </div>
          <div className="relative z-10">
            <Crown className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{t.assessment.upgradeTitle}</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg">
              {t.assessment.upgradeDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-[#DC6815] text-white rounded-full px-8 text-lg h-14">
                {t.assessment.upgradeBtn}
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 rounded-full px-8 text-lg h-14 bg-transparent hover:text-white">
                {t.assessment.contactBtn}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


