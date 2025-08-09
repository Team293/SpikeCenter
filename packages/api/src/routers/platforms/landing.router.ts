import { blogPost, changelogEntry, desc, eq, lt } from '@spike/db';
import z from 'zod';

import { publicProcedure, router } from '../../trpc';

export const landingRouter = router({
  getBlogPosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).default(5),
        cursor: z.string().nullish(), // ISO date string
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { limit, cursor } = input;

      const posts = await db
        .select()
        .from(blogPost)
        .where(cursor ? lt(blogPost.publishedAt, new Date(cursor)) : undefined)
        .orderBy(desc(blogPost.publishedAt))
        .limit(limit + 1); // +1 to check if there's another page

      console.log('Fetched posts:', posts.length);

      let nextCursor: string | null = null;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.publishedAt.toISOString() ?? null;
      }

      return {
        posts,
        nextCursor,
      };
    }),

  getBlogPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { slug } = input;

      const post = await db
        .select()
        .from(blogPost)
        .where(eq(blogPost.slug, slug))
        .limit(1);

      if (!post) {
        throw new Error('Blog post not found');
      }

      return post[0];
    }),

  getChangelog: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx;

    const changelogEntries = await db
      .select()
      .from(changelogEntry)
      .orderBy(desc(changelogEntry.date));

    return changelogEntries;
  }),
});
