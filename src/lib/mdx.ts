import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type ContentType = 'weeks' | 'tutorials';

export interface BaseFrontmatter {
    title: string;
    description?: string;
    date?: string;
    [key: string]: any;
}

export interface MDXDocument {
    slug: string;
    frontmatter: BaseFrontmatter;
    content: string;
}

const CONTENT_PATH = path.join(process.cwd(), 'content');

export function getMdxFiles(dir: string): string[] {
    try {
        const fullPath = path.join(CONTENT_PATH, dir);
        if (!fs.existsSync(fullPath)) return [];
        return fs.readdirSync(fullPath).filter((file) => /\.mdx?$/.test(file));
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        return [];
    }
}

export function getDocumentBySlug(type: ContentType, slug: string): MDXDocument | null {
    try {
        const fullPath = path.join(CONTENT_PATH, type, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            frontmatter: data as BaseFrontmatter,
            content,
        };
    } catch (error) {
        console.error(`Error reading file ${slug}.mdx in ${type}:`, error);
        return null;
    }
}

export function getAllDocuments(type: ContentType): MDXDocument[] {
    const files = getMdxFiles(type);
    const documents = files
        .map((filename) => {
            const slug = filename.replace(/\.mdx?$/, '');
            return getDocumentBySlug(type, slug);
        })
        .filter((doc): doc is MDXDocument => doc !== null);

    // Optional: sort by date or logical order like week number
    return documents;
}
