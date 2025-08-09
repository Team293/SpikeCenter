import SoftGradientHero from "~/components/gradient-hero";
import FeatureCard from "~/components/project/feature-card";
import ProjectHeader from "~/components/project/project-header";
import ProjectNavigation from "~/components/project/project-navigation";

const features = [
  {
    icon: "Wind",
    title: "Efficient Course Creation",
    description:
      "Create courses and lessons for your team with a few simple steps, all tools included.",
  },
  {
    icon: "Palette",
    title: "Customized Pathways",
    description:
      "Pick and choose from a variety of learning pathways to fit your needs.",
  },
  {
    icon: "Brush",
    title: "Interactive Learning",
    description:
      "From quizzes to projects, keep your team (and yourself) engaged with interactive content.",
  },
];

const LMSPage = () => {
  return (
    <div>
      <SoftGradientHero
        gradient="from-fuchsia-500 via-rose-500 to-amber-400"
        glowA="bg-fuchsia-400/40"
        glowB="bg-amber-300/40"
      >
        <ProjectHeader
          title="Next Gen LMS"
          description="A cutting-edge learning management system designed to revolutionize online education with immersive experiences and adaptive learning paths. Designed for the future of Robotics education."
        />
      </SoftGradientHero>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>

      <ProjectNavigation
        href="/projects/spike-scout"
        projectName="Spike Scout"
      />
    </div>
  );
};

export default LMSPage;
