"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { translations, Language, TranslationKey } from "@/lib/translations";
import LanguageToggle from "@/components/LanguageToggle";
import { motion } from "framer-motion";

export default function HubUI({ weeks, tutorials }: { weeks: any[], tutorials: any[] }) {
    const [lang, setLang] = useState<Language>("tr");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const targetRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

    // Load saved lang on mount
    useEffect(() => {
        const saved = localStorage.getItem("nmc104-lang") as Language;
        if (saved === "en" || saved === "tr") {
            setLang(saved);
        }
    }, []);

    // Set HTML lang attribute for accessibility
    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    // Scroll reveal animation observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Auto-scroll to current week on first view of timeline
    useEffect(() => {
        if (!targetRef.current || !contentRef.current || hasAutoScrolled) return;

        const handleScroll = () => {
            if (!targetRef.current || !contentRef.current || hasAutoScrolled) return;
            const rect = targetRef.current.getBoundingClientRect();

            // If the timeline container comes into view
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
                setHasAutoScrolled(true); // Fire once

                const today = new Date();
                today.setHours(0, 0, 0, 0);
                let activeIndex = weeks.findIndex(week => {
                    const d = new Date(`${week.frontmatter.date}, 2026`);
                    return d >= today;
                });

                // If all weeks are in the past, go to last
                if (activeIndex === -1) activeIndex = weeks.length - 1;

                // Only auto-scroll if it's not the very first week (which is already visible)
                if (activeIndex > 0) {
                    const cardEl = document.getElementById(`timeline-${weeks[activeIndex].slug}`);
                    if (cardEl) {
                        const padding = window.innerWidth > 768 ? 48 : 24; // Align with px-6 / px-12 padding
                        const targetX = cardEl.offsetLeft - padding;

                        setTimeout(() => {
                            contentRef.current?.scrollTo({ left: targetX, behavior: 'smooth' });
                        }, 200);
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check immediately in case they load on it

        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasAutoScrolled, weeks]);

    const toggleLang = (newLang: Language) => {
        setLang(newLang);
        localStorage.setItem("nmc104-lang", newLang);
    };

    const t = (key: TranslationKey) => translations[lang][key] || key;
    // Handle HTML string rendering safely for specific keys
    const tHtml = (key: TranslationKey) => ({ __html: translations[lang][key] || key });

    return (
        <div className="min-h-screen bg-bg-light font-sans text-text-dark">
            {/* Navigation */}
            <nav className="border-b-4 border-border-dark bg-yellow px-4 lg:px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <a href="#" className="text-2xl lg:text-3xl font-display font-black tracking-tight text-text-dark hover:text-purple transition-colors">
                    NMC<span className="text-purple">104</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden xl:flex gap-6 font-bold text-sm items-center">
                    <a href="#about" className="hover:text-pink hover:underline decoration-2 underline-offset-4">{t("nav_about")}</a>
                    <a href="#schedule" className="hover:text-pink hover:underline decoration-2 underline-offset-4">{t("nav_schedule" as TranslationKey)}</a>
                    <a href="#timeline" className="hover:text-pink hover:underline decoration-2 underline-offset-4">{t("nav_timeline")}</a>
                    <a href="#tutorials" className="hover:text-pink hover:underline decoration-2 underline-offset-4">{t("nav_tutorials")}</a>
                    <a href="#assessment" className="hover:text-pink hover:underline decoration-2 underline-offset-4">{t("nav_assessment")}</a>
                    <a href="#policies" className="hover:text-pink hover:underline decoration-2 underline-offset-4">{t("nav_policies")}</a>
                </div>

                <div className="flex items-center gap-2 lg:gap-4">
                    {/* Language Toggle */}
                    <LanguageToggle lang={lang} toggleLang={toggleLang} />

                    {/* Mobile Menu Button */}
                    <button
                        className="xl:hidden p-2 border-2 border-border-dark rounded bg-white shadow-[2px_2px_0px_var(--color-border-dark)] relative z-50"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-yellow border-b-4 border-border-dark py-4 px-6 flex flex-col gap-4 font-bold text-lg xl:hidden shadow-lg z-40">
                        <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-pink block">{t("nav_about")}</a>
                        <a href="#schedule" onClick={() => setIsMenuOpen(false)} className="hover:text-pink block">{t("nav_schedule" as TranslationKey)}</a>
                        <a href="#timeline" onClick={() => setIsMenuOpen(false)} className="hover:text-pink block">{t("nav_timeline")}</a>
                        <a href="#tutorials" onClick={() => setIsMenuOpen(false)} className="hover:text-pink block">{t("nav_tutorials")}</a>
                        <a href="#assessment" onClick={() => setIsMenuOpen(false)} className="hover:text-pink block">{t("nav_assessment")}</a>
                        <a href="#policies" onClick={() => setIsMenuOpen(false)} className="hover:text-pink block">{t("nav_policies")}</a>
                    </div>
                )}
            </nav>

            {/* Original Hero Section Recreated */}
            <header className="border-b-4 border-border-dark bg-bg-lavender py-24 px-6 text-center relative overflow-hidden flex flex-col items-center">
                <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
                    <div
                        className="inline-block bg-pink text-white px-4 py-2 font-bold rounded-brutal border-2 border-border-dark shadow-[4px_4px_0px_var(--color-border-dark)] mb-6"
                        dangerouslySetInnerHTML={tHtml("badge_semester")}
                    />
                    <h1 className="text-6xl md:text-8xl font-display font-black leading-tight mb-6">
                        {t("hero_title")}
                        <span className="text-red font-mono animate-[hacker-blink_2s_infinite]">_</span>
                    </h1>
                    <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-10 text-gray-700">
                        {t("hero_subtitle")}
                    </p>
                    <a href="#about" className="inline-block px-8 py-4 bg-lime text-text-dark font-display font-bold text-xl border-4 border-border-dark shadow-[6px_6px_0px_var(--color-border-dark)] hover:shadow-[2px_2px_0px_var(--color-border-dark)] hover:translate-y-1 hover:translate-x-1 hover:bg-yellow transition-all rounded-brutal">
                        {t("hero_btn")}
                    </a>
                </div>

                {/* Decorations representing the original CSS floats */}
                <div className="absolute top-10 left-[10%] text-6xl rotate-12 animate-bounce opacity-80" style={{ animationDuration: '3s' }} aria-hidden="true">🎨</div>
                <div className="absolute top-20 right-[15%] text-6xl -rotate-12 animate-bounce opacity-80 animate-delay-150" style={{ animationDuration: '4s' }} aria-hidden="true">✨</div>
                <div className="absolute bottom-20 left-[20%] text-6xl rotate-45 animate-bounce opacity-80" style={{ animationDuration: '3.5s' }} aria-hidden="true">💻</div>
            </header>

            {/* About Section */}
            <section id="about" className="py-20 px-6 border-b-4 border-border-dark bg-yellow/10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-12 text-center md:text-left">{t("about_title")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <article className="reveal bg-white border-4 border-border-dark rounded-brutal p-8 shadow-[6px_6px_0px_var(--color-purple)] transform -rotate-1 hover:rotate-0 transition-transform h-full flex flex-col">
                            <div className="text-5xl mb-4" aria-hidden="true">🧠</div>
                            <h3 className="text-2xl font-display font-bold mb-3">{t("about_t1")}</h3>
                            <p className="text-lg text-gray-700">{t("about_p1")}</p>
                        </article>
                        <article className="reveal bg-white border-4 border-border-dark rounded-brutal p-8 shadow-[6px_6px_0px_var(--color-pink)] transform rotate-1 hover:rotate-0 transition-transform h-full flex flex-col">
                            <div className="text-5xl mb-4" aria-hidden="true">🛠️</div>
                            <h3 className="text-2xl font-display font-bold mb-3">{t("about_t2")}</h3>
                            <p className="text-lg text-gray-700">{t("about_p2")}</p>
                        </article>
                        <article className="reveal bg-white border-4 border-border-dark rounded-brutal p-8 shadow-[6px_6px_0px_var(--color-lime)] transform -rotate-1 hover:rotate-0 transition-transform h-full flex flex-col">
                            <div className="text-5xl mb-4" aria-hidden="true">🚀</div>
                            <h3 className="text-2xl font-display font-bold mb-3">{t("about_t3")}</h3>
                            <p className="text-lg text-gray-700">{t("about_p3")}</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Announcements Section */}
            <section id="announcements" className="py-16 px-6 border-b-4 border-border-dark bg-purple/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-black mb-6 text-purple">
                        📢 {t("announcement_title" as TranslationKey)}
                    </h2>
                    <div className="bg-white border-4 border-border-dark rounded-brutal shadow-[6px_6px_0px_var(--color-purple)] flex flex-col gap-0">
                        {/* New Announcement (Open by default) */}
                        <details className="group [&_summary::-webkit-details-marker]:hidden border-b-2 border-border-dark" open>
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-bold text-xl hover:bg-purple/10 active:rotate-1 active:scale-[0.99] transition-all duration-300">
                                <div className="flex items-center gap-3">
                                    {t("announcement2_title" as TranslationKey)}
                                    <span className="bg-lime text-text-dark text-xs px-2 py-1 rounded-full border-2 border-border-dark shadow-[2px_2px_0px_var(--color-border-dark)] animate-bounce">
                                        {lang === 'tr' ? 'YENİ' : 'NEW'}
                                    </span>
                                </div>
                                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                            </summary>
                            <div
                                className="p-6 pt-4 text-lg font-medium text-gray-700 text-left border-t-2 border-dashed border-border-dark opacity-0 group-open:opacity-100 transition-opacity duration-300"
                                dangerouslySetInnerHTML={tHtml("announcement2_desc" as TranslationKey)}
                            />
                        </details>

                        {/* Old Announcement */}
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-bold text-xl hover:bg-purple/10 active:rotate-1 active:scale-[0.99] transition-all duration-300">
                                {lang === 'tr' ? '1. Hafta: Aramıza Hoş Geldiniz!' : 'Week 1: Welcome to the Course!'}
                                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                            </summary>
                            <div
                                className="p-6 pt-4 text-lg font-medium text-gray-700 text-left border-t-2 border-dashed border-border-dark opacity-0 group-open:opacity-100 transition-opacity duration-300"
                                dangerouslySetInnerHTML={tHtml("announcement_desc" as TranslationKey)}
                            />
                        </details>
                    </div>
                </div>
            </section>

            {/* Schedule Overview Section */}
            <section id="schedule" className="py-20 px-6 border-b-4 border-border-dark bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-black mb-12 text-center bg-cyan px-6 py-3 inline-block rounded-brutal border-4 border-border-dark shadow-[4px_4px_0px_var(--color-border-dark)] relative left-1/2 -translate-x-1/2">
                        📅 {t("schedule_title" as TranslationKey)}
                    </h2>

                    <div className="bg-white border-4 border-border-dark rounded-brutal shadow-[8px_8px_0px_var(--color-border-dark)] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-border-dark text-white font-display font-bold text-lg md:text-xl">
                                        <th className="p-4 border-r-2 border-white/20">{t("th_week" as TranslationKey)}</th>
                                        <th className="p-4 border-r-2 border-white/20">{t("th_date" as TranslationKey)}</th>
                                        <th className="p-4">{t("th_topic" as TranslationKey)}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {weeks.map((week, index) => {
                                        const wNum = week.frontmatter.week || "";
                                        const isMidterm = wNum === "Week 7";
                                        const isFinal = wNum === "Week 15";
                                        const isHoliday = wNum === "Week 5" || wNum === "Week 12" || wNum === "Week 14";
                                        const isWorkersDay = wNum === "Week 10";

                                        const d = new Date(`${week.frontmatter.date}, 2026`);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);
                                        const isPast = d < today;

                                        let rowClass = "border-t-2 border-border-dark hover:bg-yellow/10 transition-colors";
                                        let badgeColor = "bg-purple text-white";
                                        let textClass = "";

                                        if (isMidterm) {
                                            rowClass += " bg-orange/10 font-bold";
                                            badgeColor = "bg-orange text-white";
                                        } else if (isFinal) {
                                            rowClass += " bg-gold/20 font-bold";
                                            badgeColor = "bg-gold text-text-dark";
                                        } else if (isWorkersDay) {
                                            rowClass += " bg-red/5 text-red-700";
                                            badgeColor = "bg-red text-white";
                                        } else if (isHoliday) {
                                            rowClass += " bg-blue/5 text-blue-700";
                                            badgeColor = "bg-blue text-white";
                                        }

                                        if (isPast) {
                                            rowClass += " opacity-60 bg-gray-50";
                                            textClass = "line-through decoration-2 decoration-gray-500 text-gray-500";
                                        }

                                        let holidayText = lang === 'tr' ? 'Tatil' : 'No Class';
                                        let holidayEmoji = '🌴';
                                        if (wNum === "Week 5") { holidayEmoji = '🍬'; }
                                        else if (wNum === "Week 10") { holidayEmoji = '👷'; }
                                        else if (wNum === "Week 12") { holidayEmoji = '🎤'; }
                                        else if (wNum === "Week 14") { holidayEmoji = '🐮'; }

                                        return (
                                            <tr key={week.slug} className={rowClass}>
                                                <td className={`p-4 font-bold border-r-2 border-border-dark/20 w-32 ${textClass}`}>
                                                    <Link href={`/weeks/${week.slug}`}>
                                                        <span className={`${badgeColor} w-24 text-center px-2 py-1 rounded inline-block text-sm border-2 border-border-dark cursor-pointer hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--color-border-dark)] active:translate-y-0 active:shadow-none transition-all !no-underline`}>
                                                            {lang === 'tr' && week.frontmatter.week_tr ? week.frontmatter.week_tr : week.frontmatter.week}
                                                        </span>
                                                    </Link>
                                                </td>
                                                <td className={`p-4 font-mono font-bold text-sm border-r-2 border-border-dark/20 w-32 ${textClass}`}>
                                                    {lang === 'tr' && week.frontmatter.date_tr ? week.frontmatter.date_tr : week.frontmatter.date}
                                                </td>
                                                <td className={`p-4 font-medium ${textClass}`}>
                                                    {lang === 'tr' && week.frontmatter.title_tr ? week.frontmatter.title_tr : week.frontmatter.title}
                                                    {(isHoliday || isWorkersDay) && (
                                                        <span className={`ml-2 inline-block px-2 py-0.5 bg-gray-100 text-text-dark text-xs font-bold rounded border-2 border-border-dark shadow-[1px_1px_0px_var(--color-border-dark)] align-middle ${isPast ? '' : '!no-underline'}`}>
                                                            {holidayEmoji} {holidayText}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section id="timeline" ref={targetRef} className="bg-bg-light w-full py-16 md:py-24 overflow-hidden border-t-4 border-border-dark">
                {/* Horizontal scroll container */}
                <div
                    ref={contentRef}
                    className="relative w-full overflow-x-auto hide-scrollbar touch-pan-x snap-x snap-mandatory overscroll-x-contain"
                >
                    <div className="relative flex items-center gap-x-4 md:gap-x-6 px-6 md:px-12 w-max py-8 md:py-12">
                        {/* The horizontal track line */}
                        <div className="absolute top-1/2 left-0 w-full h-2 bg-border-dark -translate-y-1/2 z-0 rounded-full"></div>

                        {weeks.map((week, index) => {
                            const wNum = week.frontmatter.week || "";
                            const isMidterm = wNum === "Week 7";
                            const isFinal = wNum === "Week 15";
                            const isHoliday = wNum === "Week 5" || wNum === "Week 12" || wNum === "Week 14";
                            const isWorkersDay = wNum === "Week 10";

                            const d = new Date(`${week.frontmatter.date}, 2026`);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            const isPast = d < today;

                            let cardColor = "var(--color-purple)";
                            let badgeColor = "bg-purple text-white";
                            let dotColor = "bg-lime";
                            let hoverScale = "hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-pink)]";
                            let cardOpacity = isPast ? "opacity-60" : "opacity-100";

                            if (isMidterm) {
                                cardColor = "var(--color-orange)";
                                badgeColor = "bg-orange text-white";
                                dotColor = "bg-orange animate-pulse";
                                hoverScale = "hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-orange)] ring-4 ring-orange ring-opacity-50";
                            } else if (isFinal) {
                                cardColor = "var(--color-gold)";
                                badgeColor = "bg-gold text-text-dark";
                                dotColor = "bg-gold animate-pulse";
                                hoverScale = "hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-gold)] ring-4 ring-gold ring-opacity-50";
                            } else if (isWorkersDay) {
                                cardColor = "var(--color-red)";
                                badgeColor = "bg-red text-white";
                                dotColor = "bg-red opacity-50";
                                hoverScale = "hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--color-red)]";
                            } else if (isHoliday) {
                                cardColor = "var(--color-blue)";
                                badgeColor = "bg-blue text-white";
                                dotColor = "bg-blue opacity-50";
                                hoverScale = "hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--color-blue)]";
                            }

                            let textClass = isPast ? "line-through text-gray-500" : "text-text-dark";

                            let holidayText = lang === 'tr' ? 'Tatil' : 'No Class';
                            let holidayEmoji = '🌴';
                            if (wNum === "Week 5") { holidayEmoji = '🍬'; }
                            else if (wNum === "Week 10") { holidayEmoji = '👷'; }
                            else if (wNum === "Week 12") { holidayEmoji = '🎤'; }
                            else if (wNum === "Week 14") { holidayEmoji = '🐮'; }

                            const isTop = index % 2 === 0;

                            return (
                                <div key={week.slug} id={`timeline-${week.slug}`} className={`relative flex flex-col w-[260px] md:w-[280px] shrink-0 ${cardOpacity} h-[420px] md:h-[460px] perspective-1000`}>

                                    <div className={`w-full flex ${isTop ? 'items-end' : 'items-start'} h-[190px] md:h-[210px]`}>
                                        {isTop && (
                                            <div className="w-full pb-4 md:pb-6 hover:z-30 relative transition-transform duration-300 transform-gpu hover:-translate-y-1">
                                                <Link href={`/weeks/${week.slug}`} className="block relative focus-visible w-full outline-none">
                                                    <div className={`bg-white border-4 border-border-dark rounded-brutal p-4 md:p-5 transition-all ${hoverScale}`} style={{ boxShadow: `4px 4px 0px ${cardColor}` }}>
                                                        <div className="flex items-start justify-between mb-2 md:mb-3 flex-wrap gap-1 md:gap-2">
                                                            <span className={`${badgeColor} font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full border-2 border-border-dark text-[10px] md:text-xs inline-block shadow-[2px_2px_0px_var(--color-border-dark)] !no-underline`}>
                                                                {lang === 'tr' && week.frontmatter.week_tr ? week.frontmatter.week_tr : week.frontmatter.week}
                                                            </span>
                                                            <span className={`text-[10px] md:text-xs font-bold ${isMidterm || isFinal || isWorkersDay || isHoliday ? 'bg-transparent' : 'bg-yellow'} px-2 py-0.5 md:py-1 rounded border-2 border-border-dark shadow-[2px_2px_0px_var(--color-border-dark)] ${textClass}`}>
                                                                {lang === 'tr' && week.frontmatter.date_tr ? week.frontmatter.date_tr : week.frontmatter.date}
                                                            </span>
                                                        </div>
                                                        <h3 className={`text-base md:text-lg font-display font-bold mb-1 md:mb-2 leading-tight ${isPast ? 'line-through text-gray-500' : ''}`}>
                                                            {lang === 'tr' && week.frontmatter.title_tr ? week.frontmatter.title_tr : week.frontmatter.title}
                                                            {(isHoliday || isWorkersDay) && (
                                                                <span className={`ml-1 md:ml-2 inline-block px-1 md:px-2 py-0.5 bg-gray-100 text-text-dark text-[9px] md:text-[10px] font-bold rounded border-2 border-border-dark shadow-[1px_1px_0px_var(--color-border-dark)] align-middle ${isPast ? '' : '!no-underline'}`}>
                                                                    {holidayEmoji} {holidayText}
                                                                </span>
                                                            )}
                                                        </h3>
                                                        <p className={`text-xs md:text-sm text-gray-700 mb-3 md:mb-4 line-clamp-2 ${isPast ? 'line-through text-gray-400' : ''}`}>
                                                            {lang === 'tr' && week.frontmatter.description_tr ? week.frontmatter.description_tr : week.frontmatter.description}
                                                        </p>
                                                        <div className="inline-flex items-center gap-1 md:gap-2 font-bold text-xs md:text-sm text-border-dark transition-colors">
                                                            {isHoliday || isWorkersDay ? t("btn_notice" as TranslationKey)
                                                                : isMidterm || isFinal ? t("btn_project_submit" as TranslationKey)
                                                                    : t("btn_enter")}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative h-[40px] flex items-center justify-center">
                                        {/* Connecting vertical dashed line for top items */}
                                        {isTop && <div className="absolute top-0 w-1 h-1/2 border-l-4 border-dotted border-border-dark opacity-50 z-0"></div>}
                                        {/* Connector dot */}
                                        <div className={`w-8 h-8 rounded-full border-4 border-border-dark ${dotColor} z-10 shadow-[2px_2px_0px_var(--color-border-dark)] ${isPast ? 'grayscale' : ''}`}></div>
                                        {/* Connecting vertical dashed line for bottom items */}
                                        {!isTop && <div className="absolute bottom-0 w-1 h-1/2 border-l-4 border-dotted border-border-dark opacity-50 z-0"></div>}
                                    </div>

                                    <div className={`w-full flex ${!isTop ? 'items-start' : 'items-end'} h-[190px] md:h-[210px]`}>
                                        {!isTop && (
                                            <div className="w-full pt-4 md:pt-6 pb-2 md:pb-4 hover:z-30 relative transition-transform duration-300 transform-gpu hover:-translate-y-1">
                                                <Link href={`/weeks/${week.slug}`} className="block relative focus-visible w-full outline-none">
                                                    <div className={`bg-white border-4 border-border-dark rounded-brutal p-4 md:p-5 transition-all ${hoverScale}`} style={{ boxShadow: `4px 4px 0px ${cardColor}` }}>
                                                        <div className="flex items-start justify-between mb-2 md:mb-3 flex-wrap gap-1 md:gap-2">
                                                            <span className={`${badgeColor} font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full border-2 border-border-dark text-[10px] md:text-xs inline-block shadow-[2px_2px_0px_var(--color-border-dark)] !no-underline`}>
                                                                {lang === 'tr' && week.frontmatter.week_tr ? week.frontmatter.week_tr : week.frontmatter.week}
                                                            </span>
                                                            <span className={`text-[10px] md:text-xs font-bold ${isMidterm || isFinal || isWorkersDay || isHoliday ? 'bg-transparent' : 'bg-yellow'} px-2 py-0.5 md:py-1 rounded border-2 border-border-dark shadow-[2px_2px_0px_var(--color-border-dark)] ${textClass}`}>
                                                                {lang === 'tr' && week.frontmatter.date_tr ? week.frontmatter.date_tr : week.frontmatter.date}
                                                            </span>
                                                        </div>
                                                        <h3 className={`text-base md:text-lg font-display font-bold mb-1 md:mb-2 leading-tight ${isPast ? 'line-through text-gray-500' : ''}`}>
                                                            {lang === 'tr' && week.frontmatter.title_tr ? week.frontmatter.title_tr : week.frontmatter.title}
                                                            {(isHoliday || isWorkersDay) && (
                                                                <span className={`ml-1 md:ml-2 inline-block px-1 md:px-2 py-0.5 bg-gray-100 text-text-dark text-[9px] md:text-[10px] font-bold rounded border-2 border-border-dark shadow-[1px_1px_0px_var(--color-border-dark)] align-middle ${isPast ? '' : '!no-underline'}`}>
                                                                    {holidayEmoji} {holidayText}
                                                                </span>
                                                            )}
                                                        </h3>
                                                        <p className={`text-xs md:text-sm text-gray-700 mb-3 md:mb-4 line-clamp-2 ${isPast ? 'line-through text-gray-400' : ''}`}>
                                                            {lang === 'tr' && week.frontmatter.description_tr ? week.frontmatter.description_tr : week.frontmatter.description}
                                                        </p>
                                                        <div className="inline-flex items-center gap-1 md:gap-2 font-bold text-xs md:text-sm text-border-dark transition-colors">
                                                            {isHoliday || isWorkersDay ? t("btn_notice" as TranslationKey)
                                                                : isMidterm || isFinal ? t("btn_project_submit" as TranslationKey)
                                                                    : t("btn_enter")}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Tutorials Section */}
            <section id="tutorials" className="py-20 px-6 border-t-4 border-border-dark bg-cyan/10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-12 text-center text-cyan flex justify-center items-center gap-3">
                        <span className="text-5xl" aria-hidden="true">🎯</span>
                        {t("tutorial_title")}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tutorials.map((tutorial) => (
                            <Link key={tutorial.slug} id={tutorial.slug} href={`/tutorials/${tutorial.slug}`} className="reveal block group">
                                <div className="bg-white border-4 border-border-dark rounded-brutal p-6 shadow-[4px_4px_0px_var(--color-cyan)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--color-blue)] transition-all h-full flex flex-col">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-blue transition-colors">
                                            {lang === 'tr' && tutorial.frontmatter.title_tr ? tutorial.frontmatter.title_tr : tutorial.frontmatter.title}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-600 line-clamp-3">
                                            {lang === 'tr' && tutorial.frontmatter.description_tr ? tutorial.frontmatter.description_tr : tutorial.frontmatter.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 text-sm font-bold text-cyan flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                        {t("tutorial_btn")}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Assessment/Grading Section */}
            <section id="assessment" className="py-20 px-6 border-y-4 border-border-dark bg-bg-lavender">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-display font-black mb-16 text-center">{t("as_title")}</h2>
                    <div className="space-y-8">
                        <div className="reveal bg-white border-4 border-border-dark p-6 rounded-brutal shadow-[6px_6px_0px_var(--color-pink)]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-display font-bold text-2xl">{t("m_title")}</h3>
                                <span className="font-black text-3xl text-pink">40%</span>
                            </div>
                            <p className="text-gray-600 mb-4">{t("m_desc")}</p>
                            <div className="w-full bg-gray-200 border-2 border-border-dark rounded-full h-6 overflow-hidden">
                                <div className="bg-pink h-full border-r-2 border-border-dark" style={{ width: '40%' }}></div>
                            </div>
                        </div>

                        <div className="reveal bg-white border-4 border-border-dark p-6 rounded-brutal shadow-[6px_6px_0px_var(--color-purple)]">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-display font-bold text-2xl">{t("f_title")}</h3>
                                <span className="font-black text-3xl text-purple">60%</span>
                            </div>
                            <p className="text-gray-600 mb-4">{t("f_desc")}</p>
                            <div className="w-full bg-gray-200 border-2 border-border-dark rounded-full h-6 overflow-hidden">
                                <div className="bg-purple h-full border-r-2 border-border-dark" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Policies / FAQ */}
            <section id="policies" className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-display font-black mb-12 text-center bg-orange/20 px-6 py-3 inline-block rounded-brutal border-4 border-border-dark shadow-[4px_4px_0px_var(--color-border-dark)] relative left-1/2 -translate-x-1/2">
                        {t("pol_title")}
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <details key={i} className="reveal group bg-white border-4 border-border-dark rounded-brutal [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer font-display font-bold text-xl hover:bg-orange/10 active:rotate-1 active:scale-[0.99] transition-all duration-300">
                                    {t(`p${i}_title` as TranslationKey)}
                                    <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
                                </summary>
                                <div
                                    className="p-6 pt-4 text-lg leading-relaxed text-gray-700 border-t-2 border-dashed border-border-dark opacity-0 group-open:opacity-100 transition-opacity duration-300"
                                    dangerouslySetInnerHTML={tHtml(`p${i}_desc` as TranslationKey)}
                                />
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t-4 border-border-dark bg-yellow py-16 px-6 text-center mt-12 flex flex-col items-center">
                <h2 className="text-4xl font-display font-black mb-6">{t("foot_title")}</h2>
                <p
                    className="font-bold text-xl mb-12 max-w-lg leading-relaxed"
                    dangerouslySetInnerHTML={tHtml("foot_desc")}
                />
                <a href="#" className="inline-block bg-white border-4 border-border-dark px-8 py-3 rounded-brutal font-bold shadow-[4px_4px_0px_var(--color-border-dark)] mb-8 hover:-translate-y-1 hover:shadow-[6px_6px_0px_var(--color-border-dark)] active:bg-pink active:text-white active:scale-95 transition-all">
                    {t("foot_btn")}
                </a>
                <p className="text-sm font-semibold opacity-70 border-t-2 border-border-dark/30 pt-6 max-w-xs mx-auto">{t("foot_credit")}</p>
            </footer>
        </div>
    );
}
