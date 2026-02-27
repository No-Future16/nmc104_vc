"use client";

import { useState, useEffect } from "react";
import { Language } from "@/lib/translations";

export default function DynamicWeekHeader({ frontmatter }: { frontmatter: any }) {
    const [lang, setLang] = useState<Language>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    const weekStr = lang === "tr" && frontmatter.week_tr ? frontmatter.week_tr : (frontmatter.week || "Week X");
    const dateStr = lang === "tr" && frontmatter.date_tr ? frontmatter.date_tr : frontmatter.date;
    const titleStr = lang === "tr" && frontmatter.title_tr ? frontmatter.title_tr : frontmatter.title;
    const descStr = lang === "tr" && frontmatter.description_tr ? frontmatter.description_tr : frontmatter.description;

    const isFinal = (frontmatter.week || "").includes("15");

    const shadowClass = isFinal
        ? "drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]"
        : "drop-shadow-[4px_4px_0px_var(--color-border-dark)]";

    const subTextClass = isFinal
        ? "text-gray-800"
        : "text-purple-100";

    return (
        <>
            <div className="flex items-center gap-4 mb-4">
                <span className="bg-lime text-border-dark font-bold px-3 py-1 rounded-full border-2 border-border-dark text-sm inline-block">
                    {weekStr}
                </span>
                <span className={`font-semibold ${subTextClass}`}>{dateStr}</span>
            </div>
            <h1 className={`text-5xl font-display font-bold leading-tight ${shadowClass}`}>
                {titleStr}
            </h1>
            {descStr && (
                <p className={`mt-4 text-xl font-medium ${subTextClass}`}>
                    {descStr}
                </p>
            )}
        </>
    );
}
