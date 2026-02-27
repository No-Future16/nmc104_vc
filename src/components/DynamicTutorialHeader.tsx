"use client";

import { useState, useEffect } from "react";
import { Language } from "@/lib/translations";

export default function DynamicTutorialHeader({ frontmatter }: { frontmatter: any }) {
    const [lang, setLang] = useState<Language>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    const titleStr = lang === "tr" && frontmatter.title_tr ? frontmatter.title_tr : frontmatter.title;
    const descStr = lang === "tr" && frontmatter.description_tr ? frontmatter.description_tr : frontmatter.description;

    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                <span className="bg-pink text-white font-bold px-3 py-1 rounded-full border-2 border-border-dark text-sm inline-block">
                    {lang === 'tr' ? 'Yetenek Rehberi' : 'Skill Tutorial'}
                </span>
            </div>
            <h1 className="text-5xl font-display font-black leading-tight drop-shadow-[4px_4px_0px_var(--color-pink)] text-white">
                {titleStr}
            </h1>
            {descStr && (
                <p className="mt-4 text-xl font-medium max-w-2xl">
                    {descStr}
                </p>
            )}
        </>
    );
}
