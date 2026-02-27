"use client";

import { useState, useEffect } from "react";
import { Language } from "@/lib/translations";

export function Tr({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    return (
        <div className={lang === "tr" ? "block" : "hidden"}>
            {children}
        </div>
    );
}

export function En({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>("tr");

    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    return (
        <div className={lang === "en" ? "block" : "hidden"}>
            {children}
        </div>
    );
}
