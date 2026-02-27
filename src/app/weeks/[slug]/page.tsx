import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocumentBySlug, getMdxFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import BackNavigation from "@/components/BackNavigation";
import DynamicWeekHeader from "@/components/DynamicWeekHeader";

export async function generateStaticParams() {
    const files = getMdxFiles("weeks");
    return files.map((file) => ({
        slug: file.replace(/\.mdx?$/, ""),
    }));
}

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const doc = getDocumentBySlug("weeks", slug);

    if (!doc) {
        notFound();
    }

    const wNum = doc.frontmatter.week || "";
    const isMidterm = wNum.includes("7");
    const isFinal = wNum.includes("15");
    const isHoliday = wNum.includes("5") || wNum.includes("12") || wNum.includes("14");
    const isWorkersDay = wNum.includes("10");

    let headerBg = "bg-purple text-white";
    if (isMidterm) {
        headerBg = "bg-orange text-white";
    } else if (isFinal) {
        headerBg = "bg-gold text-text-dark";
    } else if (isWorkersDay) {
        headerBg = "bg-red text-white";
    } else if (isHoliday) {
        headerBg = "bg-blue text-white";
    }

    return (
        <div className="min-h-screen bg-bg-light">
            <header className={`border-b-4 border-border-dark ${headerBg} py-12 px-6`}>
                <div className="max-w-3xl mx-auto">
                    <BackNavigation returnTo={`#${slug}`} />
                    <DynamicWeekHeader frontmatter={doc.frontmatter} />
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-16 px-6">
                <article className="prose prose-lg max-w-none">
                    <MDXRemote
                        source={doc.content}
                        components={{
                            ...components,
                        }}
                        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                </article>
            </main>
        </div>
    );
}
