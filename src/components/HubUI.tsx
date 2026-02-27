"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { translations, Language, TranslationKey } from "@/lib/translations";
import LanguageToggle from "@/components/LanguageToggle";

export default function HubUI({ weeks, tutorials }: { weeks: any[], tutorials: any[] }) {
    const [lang, setLang] = useState<Language>("tr");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                    <div className="bg-white border-4 border-border-dark rounded-brutal p-8 shadow-[6px_6px_0px_var(--color-purple)]">
                        <p className="text-xl font-medium text-gray-700 italic">
                            {t("announcement_desc" as TranslationKey)}
                        </p>
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

                                        let rowClass = "border-t-2 border-border-dark hover:bg-yellow/10 transition-colors";
                                        let badgeColor = "bg-purple text-white";

                                        if (isMidterm) {
                                            rowClass += " bg-orange/10 font-bold";
                                            badgeColor = "bg-orange text-white";
                                        } else if (isFinal) {
                                            rowClass += " bg-gold/20 font-bold";
                                            badgeColor = "bg-gold text-text-dark";
                                        } else if (isWorkersDay) {
                                            rowClass += " bg-red/5 text-gray-500 line-through decoration-red decoration-2";
                                            badgeColor = "bg-red text-white";
                                        } else if (isHoliday) {
                                            rowClass += " bg-blue/5 text-gray-500 line-through decoration-blue decoration-2";
                                            badgeColor = "bg-blue text-white";
                                        }

                                        return (
                                            <tr key={week.slug} className={rowClass}>
                                                <td className="p-4 font-bold border-r-2 border-border-dark/20 w-32">
                                                    <Link href={`/weeks/${week.slug}`}>
                                                        <span className={`${badgeColor} w-24 text-center px-2 py-1 rounded inline-block text-sm border-2 border-border-dark cursor-pointer hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_var(--color-border-dark)] active:translate-y-0 active:shadow-none transition-all`}>
                                                            {lang === 'tr' && week.frontmatter.week_tr ? week.frontmatter.week_tr : week.frontmatter.week}
                                                        </span>
                                                    </Link>
                                                </td>
                                                <td className="p-4 font-mono font-bold text-sm border-r-2 border-border-dark/20 w-32">
                                                    {lang === 'tr' && week.frontmatter.date_tr ? week.frontmatter.date_tr : week.frontmatter.date}
                                                </td>
                                                <td className="p-4 font-medium">
                                                    {lang === 'tr' && week.frontmatter.title_tr ? week.frontmatter.title_tr : week.frontmatter.title}
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
            <section id="timeline" className="max-w-4xl mx-auto py-20 px-6">
                <h2 className="text-4xl md:text-5xl font-display font-black mb-4 text-center">
                    {t("roadmap_title")}
                </h2>
                <p className="text-xl text-center text-gray-700 font-medium mb-16">{t("roadmap_desc")}</p>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-border-dark before:to-transparent">
                    {weeks.map((week) => {
                        const wNum = week.frontmatter.week || "";
                        const isMidterm = wNum === "Week 7";
                        const isFinal = wNum === "Week 15";
                        const isHoliday = wNum === "Week 5" || wNum === "Week 12" || wNum === "Week 14";
                        const isWorkersDay = wNum === "Week 10";

                        let cardColor = "var(--color-purple)";
                        let badgeColor = "bg-purple text-white";
                        let dotColor = "bg-lime";
                        let hoverScale = "hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_var(--color-pink)]";

                        if (isMidterm) {
                            cardColor = "var(--color-orange)";
                            badgeColor = "bg-orange text-white";
                            dotColor = "bg-orange animate-pulse";
                            hoverScale = "hover:-translate-y-2 hover:shadow-[10px_10px_0px_var(--color-orange)] ring-4 ring-orange ring-opacity-50";
                        } else if (isFinal) {
                            cardColor = "var(--color-gold)";
                            badgeColor = "bg-gold text-text-dark";
                            dotColor = "bg-gold animate-pulse";
                            hoverScale = "hover:-translate-y-2 hover:shadow-[10px_10px_0px_var(--color-gold)] ring-4 ring-gold ring-opacity-50";
                        } else if (isWorkersDay) {
                            cardColor = "var(--color-red)";
                            badgeColor = "bg-red text-white";
                            dotColor = "bg-red opacity-50";
                            hoverScale = "hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--color-red)]";
                        } else if (isHoliday) {
                            cardColor = "var(--color-blue)";
                            badgeColor = "bg-blue text-white";
                            dotColor = "bg-blue opacity-50";
                            hoverScale = "hover:-translate-y-1 hover:shadow-[8px_8px_0px_var(--color-blue)]";
                        }

                        return (
                            <div key={week.slug} id={week.slug} className="reveal relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-border-dark ${dotColor} absolute left-1 md:left-1/2 -translate-x-1/2 z-10 shadow-[2px_2px_0px_var(--color-border-dark)]`}></div>

                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-16 md:ml-0">
                                    <Link href={`/weeks/${week.slug}`} className="block relative focus-visible">
                                        <div className={`bg-white border-4 border-border-dark rounded-brutal p-6 transition-all ${hoverScale}`} style={{ boxShadow: `6px 6px 0px ${cardColor}` }}>
                                            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                                                <span className={`${badgeColor} font-bold px-3 py-1 rounded-full border-2 border-border-dark text-sm inline-block shadow-[2px_2px_0px_var(--color-border-dark)]`}>
                                                    {lang === 'tr' && week.frontmatter.week_tr ? week.frontmatter.week_tr : week.frontmatter.week}
                                                </span>
                                                <span className={`text-sm font-bold text-text-dark ${isMidterm || isFinal || isWorkersDay || isHoliday ? 'bg-transparent' : 'bg-yellow'} px-2 py-1 rounded border-2 border-border-dark shadow-[2px_2px_0px_var(--color-border-dark)]`}>
                                                    {lang === 'tr' && week.frontmatter.date_tr ? week.frontmatter.date_tr : week.frontmatter.date}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-display font-bold mb-2">
                                                {lang === 'tr' && week.frontmatter.title_tr ? week.frontmatter.title_tr : week.frontmatter.title}
                                            </h3>
                                            <p className="text-gray-700 mb-6 line-clamp-2">
                                                {lang === 'tr' && week.frontmatter.description_tr ? week.frontmatter.description_tr : week.frontmatter.description}
                                            </p>
                                            <div className="inline-flex items-center gap-2 font-bold text-border-dark group-hover:text-pink transition-colors">
                                                {isHoliday || isWorkersDay ? t("btn_notice" as TranslationKey)
                                                    : isMidterm || isFinal ? t("btn_project_submit" as TranslationKey)
                                                        : t("btn_enter")}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
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
