"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TransitionLink } from "./transition-link";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".blog-title", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".blog-post", {
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className="py-20 md:py-32 bg-[#111]">
      <div className="container mx-auto px-4">
        <h2 className="blog-title text-4xl md:text-6xl font-bold text-center mb-16">
          From Our Minds
        </h2>
        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="blog-post bg-[#1a1a1a] p-8 rounded-lg flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
              <p className="text-neutral-400 mb-6 flex-grow">
                {post.content.substring(0, 200)}...
              </p>
              <TransitionLink
                href={post.slug}
                className="group text-white font-semibold flex items-center gap-2"
              >
                Read More{" "}
                <ArrowRight
                  className="transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
