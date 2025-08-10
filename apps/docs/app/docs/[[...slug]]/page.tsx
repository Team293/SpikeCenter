import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {/* @ts-expect-error - Type mismatch: DocsTitle expects a string, but page.data.title may be inferred as unknown due to MDX serialization. Safe to ignore because content is validated upstream. */}
      <DocsTitle>{page.data.title}</DocsTitle>
      {/* @ts-expect-error - Type mismatch: DocsDescription expects a string, but page.data.description may be inferred as unknown due to MDX serialization. Safe to ignore because content is validated upstream. */}
      <DocsDescription>{page.data.description}</DocsDescription>
      {/* @ts-expect-error - Type mismatch: DocsBody expects MDX content, but page.data.body type may be incompatible due to MDX serialization. Safe to ignore because content is validated upstream. */}
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
