"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Language, translations, TranslationKey } from "@/lib/translations";
import LanguageToggle from "@/components/LanguageToggle";

export default function BackNavigation({ returnTo = "#timeline" }: { returnTo?: string }) {
    const [lang, setLang] = useState<Language>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    const toggleLang = (newLang: Language) => {
        setLang(newLang);
        localStorage.setItem("nmc104-lang", newLang);
        // Refresh to apply language (simple approach for static routes without context providers)
        window.location.reload();
    };

    const t = (key: TranslationKey) => translations[lang][key] || key;

    return (
        <div className="flex justify-between items-start mb-8">
            <Link href={`/${returnTo}`} className="inline-block px-4 py-2 border-2 border-border-dark bg-white text-border-dark font-bold text-sm shadow-[4px_4px_0px_var(--color-border-dark)] hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--color-border-dark)] transition-all rounded-brutal">
                &larr; {t("nav_back")}
            </Link>
            <LanguageToggle lang={lang} toggleLang={toggleLang} />
        </div>
    );
}
