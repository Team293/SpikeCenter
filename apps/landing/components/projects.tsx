"use client";

import { motion } from "framer-motion";
import TransitionLink from "./transition-link";

const projects = [
  {
    title: "Next Gen LMS",
    description: "Revolutionizing knowlege sharing in robotics.",
    href: "/projects/lms",
  },
  {
    title: "Spike Scout",
    description: "The ultimate scouting app for FIRST.",
    href: "/projects/spike-scout",
  },
  {
    title: "Attendance",
    description: "Next gen attendance management for next gen teams.",
    href: "/projects/attendance",
  },
];

// Nice rotating gradient backgrounds for each card
const gradients = [
  "from-fuchsia-500 via-rose-500 to-amber-400",
  "from-indigo-500 via-sky-500 to-cyan-400",
  "from-emerald-500 via-teal-500 to-lime-400",
  "from-purple-500 via-violet-500 to-blue-500",
  "from-orange-500 via-amber-500 to-yellow-400",
  "from-pink-500 via-red-500 to-orange-400",
];

function initials(text = "") {
  return text
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Projects() {
  return (
    <div id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Our Creations
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-neutral-400">
          Defining our drive with software that elevates the robotics
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <TransitionLink href={project.href}>
              <div className="group relative block w-full h-[450px] overflow-hidden rounded-xl shadow-lg ring-1 ring-white/10 bg-neutral-900">
                {/* Dynamic gradient background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80 transition-transform duration-700 group-hover:scale-110`}
                />

                {/* Subtle lighting and texture */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(80%_60%_at_50%_120%,rgba(255,255,255,0.35),transparent)]" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -inset-[60%] animate-[spin_16s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_320deg,rgba(255,255,255,0.25)_360deg)]" />
                </div>

                {/* Title initials badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="h-12 w-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-semibold shadow-md">
                    {initials(project.title)}
                  </div>
                </div>

                {/* Hover gradient to reveal text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-neutral-200">{project.description}</p>
                </div>
              </div>
            </TransitionLink>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
