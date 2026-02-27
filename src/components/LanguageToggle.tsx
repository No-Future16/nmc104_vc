"use client";

import { Language } from "@/lib/translations";

interface LanguageToggleProps {
    lang: Language;
    toggleLang: (newLang: Language) => void;
}

export default function LanguageToggle({ lang, toggleLang }: LanguageToggleProps) {
    return (
        <div className="flex bg-white border-2 border-border-dark shadow-[2px_2px_0px_var(--color-border-dark)] rounded overflow-hidden text-sm font-bold" role="group" aria-label="Language Toggle">
            <button
                onClick={() => toggleLang("tr")}
                className={`px-2 py-1 lg:px-3 flex items-center gap-1 transition-colors ${lang === "tr" ? "bg-border-dark text-white" : "text-gray-500 hover:bg-gray-100"}`}
                aria-pressed={lang === "tr"}
                aria-label="Türkçe"
            >
                <span className={lang === "tr" ? "opacity-100" : "opacity-50 grayscale transition-all"}>🇹🇷</span> TR
            </button>
            <div className="w-0.5 bg-border-dark" aria-hidden="true"></div>
            <button
                onClick={() => toggleLang("en")}
                className={`px-2 py-1 lg:px-3 flex items-center gap-1 transition-colors ${lang === "en" ? "bg-border-dark text-white" : "text-gray-500 hover:bg-gray-100"}`}
                aria-pressed={lang === "en"}
                aria-label="English"
            >
                <span className={lang === "en" ? "opacity-100" : "opacity-50 grayscale transition-all"}>🇬🇧</span> EN
            </button>
        </div>
    );
}
