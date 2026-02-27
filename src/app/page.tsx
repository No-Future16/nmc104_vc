import { getAllDocuments } from "@/lib/mdx";
import HubUI from "@/components/HubUI";

export default function Home() {
  const weeks = getAllDocuments("weeks").sort((a, b) => {
    const numA = parseInt(a.frontmatter.week?.replace(/\D/g, "") || "0");
    const numB = parseInt(b.frontmatter.week?.replace(/\D/g, "") || "0");
    return numA - numB;
  });

  const tutorials = getAllDocuments("tutorials");

  return <HubUI weeks={weeks} tutorials={tutorials} />;
}
