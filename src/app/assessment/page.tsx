"use client";

import { useState, useMemo } from "react";
import { questionsRawData } from "@/lib/questions_data";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, History, Activity, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Parse valid questions
const allQuestions = questionsRawData.slice(2).filter(row => row[4] && row[4].trim() !== "");

export default function AssessmentPage() {
  const { t } = useLanguage();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinishedState, setIsFinishedState] = useState(false);
  
  const sections = Array.from(new Set(questionsRawData.slice(2).map(q => q[2] ? `${q[1]} - ${q[2]}` : q[1]).filter(Boolean)));
  const currentSectionName = sections[currentSectionIndex] || "";

  const sectionQuestions = questionsRawData.slice(2).filter(q => {
    const qSectionName = q[2] ? `${q[1]} - ${q[2]}` : q[1];
    return qSectionName === currentSectionName;
  });
  
  const handleNext = async () => {
    const unanswered = sectionQuestions.filter(q => {
      const isRequired = q[21] === "Có";
      const qType = q[6] || "";
      const isSingleCb = qType.includes("Check box") || qType.includes("Checkbox");
      const ans = answers[q[0]];
      
      if (!isRequired) return false;
      if (isSingleCb) return ans !== true;
      if (Array.isArray(ans)) return ans.length === 0;
      return !ans || (typeof ans === 'string' && ans.trim() === "");
    });

    if (unanswered.length > 0) {
      alert(t.assessment.validationError);
      return;
    }

    if (currentSectionIndex === sections.length - 1) {
      setIsSubmitting(true);
      try {
        const payload = {
          timestamp: new Date().toISOString(),
          company: answers['A01'] || 'Không rõ',
          answers: answers
        };
        // Lưu local để qua trang report đọc
        localStorage.setItem('invamax_assessment_result', JSON.stringify(payload));
        
        await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.error(e);
      }
      setIsSubmitting(false);
      window.location.href = '/report';
    } else {
      setCurrentSectionIndex(curr => curr + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswerChange = (qId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [qId]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background pb-32 font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="pt-8 pb-12 text-center relative px-4">
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <Button variant="outline" className="rounded-full bg-card border-border text-muted-foreground hover:bg-secondary hover:text-foreground shadow-sm">
            <History className="w-4 h-4 mr-2" />
            {t.assessment.history}
          </Button>
        </div>
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <div className="text-3xl font-extrabold tracking-tight">
              <span className="text-foreground">INVA</span>
              <span className="text-primary">MAX</span>
            </div>
          </Link>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">{t.assessment.title}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">{t.assessment.desc}</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {currentSectionIndex + 1}. {currentSectionName === 'A - Bối cảnh' ? t.assessment.infoSection : currentSectionName.replace(/^[A-Z] - /, '')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-muted-foreground text-base">
            {currentSectionName === 'A - Bối cảnh' 
              ? t.assessment.infoDesc 
              : t.assessment.generalDesc}
          </p>
        </div>

        <div className="space-y-5">
          {sectionQuestions.map((q, index) => {
            const qId = q[0];
            const qGroup = q[3];
            let qText = q[4];
            if (qText.startsWith("Check box: ")) {
              qText = qText.substring(11);
            }
            const qDesc = q[5];
            const qType = q[6] || "";
            const isRequired = q[21] === "Có";
            
            const options = [];
            for (let i = 7; i <= 19; i++) {
              if (q[i] && q[i].trim() !== "") {
                options.push(q[i]);
              }
            }

            return (
              <div key={qId} className="bg-card border border-border/60 rounded-2xl p-5 md:p-7 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 text-sm font-semibold text-primary bg-primary/10 rounded-full">
                      {qId.replace(/\D/g,'')}
                    </span>
                    <div>
                      <h3 className="text-[17px] font-semibold text-foreground leading-snug mt-1">
                        {qText} {isRequired && <span className="text-red-500 font-bold ml-1">*</span>}
                      </h3>
                      {qDesc && <p className="text-muted-foreground text-[14px] mt-1.5 leading-relaxed">{qDesc}</p>}
                    </div>
                  </div>
                  {qGroup && (
                    <div className="shrink-0 text-[11px] font-bold tracking-widest text-muted-foreground uppercase mt-1 md:mt-1.5">
                      {qGroup}
                    </div>
                  )}
                </div>

                <div className="mt-5 md:pl-14">
                  {(() => {
                    const isMultiSelect = qType.includes("Nhiều lựa chọn") || qType.includes("Chọn tối đa");
                    const isSingleCheckbox = qType.includes("Check box") || qType.includes("Checkbox");
                    const isText = !isSingleCheckbox && (qType.includes("Văn bản") || qType.includes("Điền số") || options.length === 0);

                    if (isSingleCheckbox) {
                      const isChecked = !!answers[qId];
                      return (
                        <div onClick={() => handleAnswerChange(qId, !isChecked)} className={`flex items-start space-x-3 border p-3.5 rounded-xl cursor-pointer transition-all w-full md:w-2/3 ${isChecked ? 'border-primary bg-accent shadow-sm' : 'border-border bg-card hover:border-strong hover:bg-secondary'}`}>
                          <Checkbox checked={isChecked} id={`${qId}-single`} className="w-5 h-5 mt-0.5 rounded border-strong data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0" />
                          <Label htmlFor={`${qId}-single`} className={`flex-1 cursor-pointer transition-colors text-[14px] leading-snug font-medium pointer-events-none ${isChecked ? 'text-foreground' : 'text-muted-foreground'}`}>Đồng ý</Label>
                        </div>
                      );
                    }

                    if (isText) {
                      return qType.includes("Văn bản, giới hạn") ? (
                        <Textarea 
                          placeholder={qDesc || qText} 
                          value={answers[qId] || ""}
                          onChange={(e) => handleAnswerChange(qId, e.target.value)}
                          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl min-h-[80px] focus-visible:ring-primary/30 focus-visible:border-primary text-[15px] p-3.5"
                        />
                      ) : (
                        <Input 
                          type={qType.includes("Điền số") ? "number" : "text"} 
                          placeholder={qDesc || qText} 
                          value={answers[qId] || ""}
                          onChange={(e) => handleAnswerChange(qId, e.target.value)}
                          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground rounded-xl h-12 px-4 text-[15px] focus-visible:ring-primary/30 focus-visible:border-primary"
                        />
                      );
                    }

                    if (isMultiSelect) {
                      const selectedValues = answers[qId] || [];
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                          {options.map((opt, idx) => {
                            const isSelected = selectedValues.includes(opt);
                            return (
                              <div key={idx} onClick={() => {
                                let newVals = [...selectedValues];
                                if (isSelected) {
                                  newVals = newVals.filter(v => v !== opt);
                                } else {
                                  newVals.push(opt);
                                }
                                handleAnswerChange(qId, newVals);
                              }} className={`flex items-start space-x-3 border p-3.5 rounded-xl cursor-pointer transition-all h-full ${isSelected ? 'border-primary bg-accent shadow-sm' : 'border-border bg-card hover:border-strong hover:bg-secondary'}`}>
                                <Checkbox checked={isSelected} id={`${qId}-opt-${idx}`} className="w-5 h-5 mt-0.5 rounded border-strong data-[state=checked]:bg-primary data-[state=checked]:border-primary shrink-0" />
                                <Label htmlFor={`${qId}-opt-${idx}`} className={`flex-1 cursor-pointer transition-colors text-[14px] leading-snug font-medium pointer-events-none ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>{opt}</Label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }

                    return (
                      <RadioGroup 
                        value={answers[qId] || ""} 
                        onValueChange={(val) => handleAnswerChange(qId, val)}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2"
                      >
                        {options.map((opt, idx) => (
                          <div key={idx} className={`flex items-start space-x-3 border p-3.5 rounded-xl cursor-pointer transition-all h-full ${answers[qId] === opt ? 'border-primary bg-accent shadow-sm' : 'border-border bg-card hover:border-strong hover:bg-secondary'}`}>
                            <RadioGroupItem value={opt} id={`${qId}-opt-${idx}`} className="w-5 h-5 mt-0.5 border-strong text-primary focus:ring-primary data-[state=checked]:border-primary shrink-0" />
                            <Label htmlFor={`${qId}-opt-${idx}`} className={`flex-1 cursor-pointer transition-colors text-[14px] leading-snug font-medium ${answers[qId] === opt ? 'text-foreground' : 'text-muted-foreground'}`}>{opt}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center pb-12">
          <Button 
            size="lg" 
            onClick={handleNext} 
            disabled={isSubmitting}
            className={`rounded-full px-12 h-14 text-[17px] font-bold shadow-xl transition-all ${
              currentSectionIndex === sections.length - 1 
                ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' 
                : 'bg-primary hover:bg-[#DC6815] shadow-primary/20'
            } text-white hover:-translate-y-1`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Activity className="w-5 h-5 animate-spin" /> {t.assessment.submitting}
              </span>
            ) : currentSectionIndex === sections.length - 1 ? (
              <span className="flex items-center gap-2">
                {t.assessment.finish} <CheckCircle2 className="w-5 h-5" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {t.assessment.next} <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </div>
      </main>
    </div>
  );
}

