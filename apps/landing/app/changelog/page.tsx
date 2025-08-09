import { Changelog } from "~/components/changelog";
import { trpcServerCall } from "@spike/next";
import { notFound } from "next/navigation";

export default async function ChangelogPage() {
  const changelogEntries = await trpcServerCall((caller) =>
    caller.landing.getChangelog(),
  );

  if (!changelogEntries || changelogEntries.length === 0) {
    notFound();
  }

  const transformedEntries = changelogEntries.map((entry) => ({
    version: entry.version,
    date: new Date(entry.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: entry.title,
    description: entry.description,
    items: entry.items || [],
    image: entry.image || undefined,
    button:
      entry.buttonUrl && entry.buttonText
        ? {
            url: entry.buttonUrl,
            text: entry.buttonText,
          }
        : undefined,
  }));

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <Changelog entries={transformedEntries} />
      </div>
    </div>
  );
}
