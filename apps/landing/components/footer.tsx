"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GlowScene } from "./glow-scene";
import { TransitionLink } from "./transition-link";

export function Footer() {
  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Suspense fallback={null}>
            <GlowScene />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} Spike Center. All rights reserved.
          </p>
          {/*<div className="flex gap-6 mt-4 md:mt-0">
            <TransitionLink
              href="#"
              className="text-neutral-400 hover:text-white"
            >
              Twitter
            </TransitionLink>
            <TransitionLink
              href="#"
              className="text-neutral-400 hover:text-white"
            >
              Instagram
            </TransitionLink>
            <TransitionLink
              href="#"
              className="text-neutral-400 hover:text-white"
            >
              LinkedIn
            </TransitionLink>
          </div>*/}
        </div>
      </div>
    </footer>
  );
}
