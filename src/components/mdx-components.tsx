import React from 'react';
import Quiz from './Quiz';
import { Tr, En } from './LanguageWrapper';

// Common UI wrappers for MDX
export const components = {
    h1: (props: any) => <h1 className="text-4xl font-display font-bold mb-6 mt-8" {...props} />,
    h2: (props: any) => <h2 className="text-3xl font-display font-semibold mb-4 mt-8 pb-2 border-b-4 border-border-dark" {...props} />,
    h3: (props: any) => <h3 className="text-2xl font-display font-medium mb-3 mt-6" {...props} />,
    p: (props: any) => <p className="mb-4 text-lg leading-relaxed" {...props} />,
    a: (props: any) => (
        <a className="text-blue hover:text-pink font-semibold underline decoration-2 underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
    ),
    ul: (props: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-lg" {...props} />,
    ol: (props: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-lg" {...props} />,
    li: (props: any) => <li {...props} />,
    blockquote: (props: any) => (
        <blockquote className="border-l-4 border-purple pl-4 italic text-gray-700 my-6 bg-purple/10 p-4 rounded-brutal" {...props} />
    ),
    code: (props: any) => (
        <code className="bg-gray-100 text-pink font-mono px-1.5 py-0.5 rounded text-sm font-semibold" {...props} />
    ),
    pre: (props: any) => (
        <pre className="bg-border-dark text-white p-4 rounded-xl overflow-x-auto my-6 font-mono text-sm leading-normal border-2 border-transparent shadow-[4px_4px_0px_var(--color-pink)]" {...props} />
    ),
    table: (props: any) => <div className="overflow-x-auto my-8 border-4 border-border-dark rounded-xl shadow-[6px_6px_0px_var(--color-pink)]"><table className="w-full text-left border-collapse" {...props} /></div>,
    thead: (props: any) => <thead className="bg-purple text-white font-display text-xl" {...props} />,
    tbody: (props: any) => <tbody className="bg-white" {...props} />,
    tr: (props: any) => <tr className="border-b-2 border-border-dark last:border-b-0" {...props} />,
    th: (props: any) => <th className="p-4 border-r-2 border-border-dark last:border-r-0 font-bold" {...props} />,
    td: (props: any) => <td className="p-4 border-r-2 border-border-dark last:border-r-0 font-medium" {...props} />,
    Tr,
    En,

    // Custom Components
    Quiz: (props: any) => {
        let parsedQuestions = [];
        try {
            if (props.questionsJson) {
                parsedQuestions = JSON.parse(props.questionsJson);
            } else if (Array.isArray(props.questions)) {
                // Fallback if MDX parsed it correctly
                parsedQuestions = props.questions;
            }
        } catch (e) {
            console.error("Failed to parse Quiz questions JSON", e);
        }
        return <Quiz title={props.title} questions={parsedQuestions} />;
    },

    VideoEmbed: ({ url, title }: { url: string; title?: string }) => {
        // Basic YouTube embed handling
        const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');
        let embedUrl = url;

        if (isYoutube) {
            const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
            const id = match ? match[1] : '';
            embedUrl = `https://www.youtube.com/embed/${id}`;
        }

        return (
            <div className="my-8 rounded-xl overflow-hidden border-4 border-border-dark shadow-[6px_6px_0px_var(--color-purple)] aspect-video bg-black">
                <iframe
                    src={embedUrl}
                    title={title || "Video player"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        );
    },

    Alert: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error'; children: React.ReactNode }) => {
        const colors = {
            info: 'bg-blue/10 border-blue text-blue',
            warning: 'bg-yellow/10 border-yellow text-orange',
            error: 'bg-red/10 border-red text-red',
        };
        return (
            <div className={`my-6 p-4 border-2 rounded-xl flex items-start gap-4 ${colors[type]}`}>
                <div>{children}</div>
            </div>
        );
    }
};
