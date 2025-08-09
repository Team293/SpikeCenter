import { getPostBySlug, allPosts } from "~/lib/blog-posts";
import { notFound } from "next/navigation";
import { TransitionLink } from "~/components/transition-link";
import { ArrowLeft } from "lucide-react";
import { trpcServerCall } from "@spike/next";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;

  const post = await trpcServerCall((caller) =>
    caller.landing.getBlogPost({
      slug,
    }),
  );

  if (!post) {
    notFound();
  }

  const formattedPublishedAt = post?.publishedAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
        new Date(post.publishedAt),
      )
    : null;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 max-w-3xl">
        <TransitionLink
          href="/blog"
          className="group text-neutral-400 hover:text-white font-semibold flex items-center gap-2 mb-8"
        >
          <ArrowLeft
            className="transition-transform group-hover:-translate-x-1"
            size={20}
          />
          Back to Blog
        </TransitionLink>
        <article>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            {post.title}
          </h1>
          {formattedPublishedAt && (
            <p className="text-neutral-400 text-sm mb-6">
              {formattedPublishedAt}
            </p>
          )}
          <div className="text-neutral-300 text-lg leading-relaxed space-y-6">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
}
