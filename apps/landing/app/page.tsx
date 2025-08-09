import { Hero } from "~/components/hero";
import { Projects } from "~/components/projects";
import { BlogPreview } from "~/components/blog-preview";
import { trpcServerCall } from "@spike/next";

export default async function Home() {
  const previewPostsResponse = await trpcServerCall((caller) =>
    caller.landing.getBlogPosts({ limit: 3 }),
  );

  return (
    <>
      <Hero />
      <Projects />
      <BlogPreview posts={previewPostsResponse.posts} />
    </>
  );
}
