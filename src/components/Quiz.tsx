/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { translations, Language, TranslationKey } from "@/lib/translations";

export interface Question {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
}

export default function Quiz({ questions, title = "Knowledge Check" }: { questions: Question[], title?: string }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [lang, setLang] = useState<Language>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    const t = (key: TranslationKey) => translations[lang][key] || key;

    const handleSelect = (index: number) => {
        if (isSubmitted) return;
        setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        if (selectedAnswer === null) return;

        setIsSubmitted(true);
        if (selectedAnswer === questions[currentQuestion].correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            setIsFinished(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setScore(0);
        setIsFinished(false);
    };

    if (isFinished) {
        return (
            <div className="my-8 bg-bg-lavender border-4 border-border-dark rounded-brutal p-8 text-center shadow-[6px_6px_0px_var(--color-purple)]">
                <h3 className="text-3xl font-display font-black mb-4">{t("quiz_complete")}</h3>
                <div className="text-6xl font-black mb-6">
                    <span className={score === questions.length ? "text-lime" : score > 0 ? "text-orange" : "text-red"}>
                        {score}
                    </span>
                    <span className="text-gray-400">/{questions.length}</span>
                </div>
                <p className="text-xl font-bold mb-8">
                    {score === questions.length ? t("quiz_perfect") :
                        score > questions.length / 2 ? t("quiz_good") :
                            t("quiz_retry")}
                </p>
                <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 bg-white px-6 py-3 border-2 border-border-dark rounded-brutal shadow-[4px_4px_0px_var(--color-purple)] hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--color-purple)] transition-all font-bold text-lg"
                >
                    <RotateCcw className="w-5 h-5" />
                    {t("btn_try_again")}
                </button>
            </div>
        );
    }

    const q = questions[currentQuestion];

    return (
        <div className="my-8 bg-white border-4 border-border-dark rounded-brutal p-6 md:p-8 shadow-[6px_6px_0px_var(--color-purple)]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-dashed border-gray-300">
                <h3 className="text-xl font-display font-bold text-purple">{title}</h3>
                <span className="bg-yellow px-3 py-1 rounded-full border-2 border-border-dark text-sm font-bold shadow-[2px_2px_0px_var(--color-border-dark)]">
                    {t("lbl_question")} {currentQuestion + 1} {t("lbl_of")} {questions.length}
                </span>
            </div>

            <h4 className="text-2xl font-bold mb-6 leading-tight">{q.prompt}</h4>

            <div className="space-y-4 mb-8">
                {q.options.map((option, idx) => {
                    let btnClass = "w-full text-left p-4 border-2 rounded-xl transition-all font-medium text-lg flex items-start gap-4 ";

                    if (!isSubmitted) {
                        btnClass += selectedAnswer === idx
                            ? "bg-purple text-white border-border-dark shadow-[4px_4px_0px_var(--color-border-dark)]"
                            : "bg-white border-gray-300 hover:border-purple hover:bg-purple/5";
                    } else {
                        if (idx === q.correctIndex) {
                            btnClass += "bg-lime/20 border-lime text-text-dark shadow-[4px_4px_0px_var(--color-lime)]";
                        } else if (selectedAnswer === idx) {
                            btnClass += "bg-red/10 border-red/50 text-red";
                        } else {
                            btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            disabled={isSubmitted}
                            className={btnClass}
                            aria-pressed={selectedAnswer === idx}
                        >
                            <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold ${!isSubmitted && selectedAnswer === idx ? 'border-none bg-lime text-text-dark' :
                                isSubmitted && idx === q.correctIndex ? 'border-lime bg-lime text-white' :
                                    isSubmitted && selectedAnswer === idx ? 'border-red bg-red text-white' :
                                        'border-gray-300 bg-white'
                                }`}>
                                {String.fromCharCode(65 + idx)} {/* A, B, C, D */}
                            </span>
                            <span className="pt-0.5">{option}</span>

                            {/* Icons for correct/incorrect */}
                            {isSubmitted && idx === q.correctIndex && (
                                <CheckCircle2 className="w-6 h-6 text-lime ml-auto flex-shrink-0" />
                            )}
                            {isSubmitted && selectedAnswer === idx && idx !== q.correctIndex && (
                                <XCircle className="w-6 h-6 text-red ml-auto flex-shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex-1 flex w-full">
                    {isSubmitted && (
                        <div className={`p-4 rounded-xl border-2 w-full ${selectedAnswer === q.correctIndex ? 'bg-lime/10 border-lime' : 'bg-red/10 border-red/30'}`}>
                            <p className="font-bold mb-1">
                                {selectedAnswer === q.correctIndex ? t("lbl_correct") : t("lbl_incorrect")}
                            </p>
                            {q.explanation && (
                                <p className="text-sm text-gray-700">{q.explanation}</p>
                            )}
                        </div>
                    )}
                </div>

                <button
                    onClick={isSubmitted ? handleNext : handleSubmit}
                    disabled={!isSubmitted && selectedAnswer === null}
                    className="w-full sm:w-auto px-8 py-4 bg-lime text-text-dark font-display font-bold text-xl border-4 border-border-dark shadow-[4px_4px_0px_var(--color-border-dark)] hover:shadow-[2px_2px_0px_var(--color-border-dark)] hover:translate-y-1 transition-all rounded-brutal disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_var(--color-border-dark)]"
                >
                    {isSubmitted ? (currentQuestion === questions.length - 1 ? t("btn_finish") : t("btn_next")) : t("btn_submit")}
                </button>
            </div>
        </div>
    );
}
