"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Scene } from "~/components/scene";
import { TransitionLink } from "~/components/transition-link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".error-code",
        { y: 100, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
      )
        .fromTo(
          ".error-title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".error-subtitle",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          ".error-buttons",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4",
        );
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.div
          className="error-code text-8xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          404
        </motion.div>

        <h1 className="error-title font-bold text-4xl md:text-6xl mb-4">
          Page Not Found
        </h1>

        <p className="error-subtitle text-lg md:text-xl max-w-2xl mb-8 text-neutral-300">
          The page you're looking for seems to have drifted into the digital
          void. Let's navigate you back to safer territory.
        </p>

        <div className="error-buttons flex flex-col sm:flex-row gap-4">
          <TransitionLink href="/">
            <motion.button
              className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-6 rounded-full transition-transform duration-300"
              whileHover={{
                scale: 1.05,
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              Return Home
            </motion.button>
          </TransitionLink>

          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 border border-white/20 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:bg-white/10"
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </div>

        <div className="mt-12 text-neutral-500 text-sm">
          Lost? Try exploring our{" "}
          <TransitionLink
            href="/#projects"
            className="text-white hover:text-neutral-300 underline"
          >
            projects
          </TransitionLink>{" "}
          or check out our{" "}
          <TransitionLink
            href="/blog"
            className="text-white hover:text-neutral-300 underline"
          >
            blog
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
