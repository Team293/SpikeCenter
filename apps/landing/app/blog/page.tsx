import { TransitionLink } from "~/components/transition-link";
import { ArrowRight } from "lucide-react";
import { trpcServerCall } from "@spike/next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@spike/ui/pagination";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { stack?: string };
}) {
  const rawStack = searchParams?.stack ?? "";
  const stack = rawStack
    ? decodeURIComponent(rawStack)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const cursor = stack.length ? stack[stack.length - 1] : undefined;

  const data = await trpcServerCall((caller) =>
    caller.landing.getBlogPosts({
      limit: 5,
      cursor: cursor ? String(cursor) : undefined,
    }),
  );

  const hasPrevious = stack.length > 0;
  const prevStack = hasPrevious ? stack.slice(0, -1) : stack;
  const prevHref =
    prevStack.length > 0
      ? `/blog?stack=${encodeURIComponent(prevStack.join(","))}`
      : "/blog"; // back to the first page (no stack param)

  const nextHref = data.nextCursor
    ? `/blog?stack=${encodeURIComponent([...stack, data.nextCursor].join(","))}`
    : undefined;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-16">
          Our Blog
        </h1>

        <div className="max-w-3xl mx-auto space-y-12">
          {data.posts.map((post: any) => (
            <div key={post.id} className="border-b border-white/10 pb-8">
              <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
              <p className="text-neutral-400 mb-6">
                {post.content.substring(0, 200)}...
              </p>
              <TransitionLink
                href={`/blog/${post.slug}`}
                className="group text-white font-semibold flex items-center gap-2"
              >
                Read Full Article{" "}
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </TransitionLink>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12">
          <Pagination>
            <PaginationContent className="justify-center">
              <PaginationItem>
                {hasPrevious ? (
                  <PaginationPrevious href={prevHref} />
                ) : (
                  <span className="pointer-events-none opacity-50 select-none">
                    <PaginationPrevious href="#" />
                  </span>
                )}
              </PaginationItem>

              <PaginationItem>
                {nextHref ? (
                  <PaginationNext href={nextHref} />
                ) : (
                  <span className="pointer-events-none opacity-50 select-none">
                    <PaginationNext href="#" />
                  </span>
                )}
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
