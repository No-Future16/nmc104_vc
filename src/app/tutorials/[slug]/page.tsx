import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocumentBySlug, getMdxFiles } from "@/lib/mdx";
import { components } from "@/components/mdx-components";
import BackNavigation from "@/components/BackNavigation";
import DynamicTutorialHeader from "@/components/DynamicTutorialHeader";

export async function generateStaticParams() {
    const files = getMdxFiles("tutorials");
    return files.map((file) => ({
        slug: file.replace(/\.mdx?$/, ""),
    }));
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const doc = getDocumentBySlug("tutorials", slug);

    if (!doc) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-bg-light">
            <header className="border-b-4 border-border-dark bg-cyan text-border-dark py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    <BackNavigation returnTo={`#${slug}`} />
                    <DynamicTutorialHeader frontmatter={doc.frontmatter} />
                </div>
            </header>

            <main className="max-w-3xl mx-auto py-16 px-6">
                <article className="prose prose-lg max-w-none">
                    {/* @ts-ignore */}
                    <MDXRemote
                        source={doc.content}
                        components={components}
                        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                </article>
            </main>
        </div>
    );
}
