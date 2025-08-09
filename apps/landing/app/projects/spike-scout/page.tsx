import SoftGradientHero from "~/components/gradient-hero";
import FeatureCard from "~/components/project/feature-card";
import ProjectHeader from "~/components/project/project-header";
import ProjectNavigation from "~/components/project/project-navigation";

const features = [
  {
    icon: "Cpu",
    title: "Blazing Fast",
    description:
      "Running on modern infrastructure, Spike Scout delivers real-time data collection and analytics, ensuring teams have the latest insights at their fingertips.",
  },
  {
    icon: "Code",
    title: "Advanced Visualization",
    description:
      "Export data to Google Sheets for powerful visualizations. Utilize official and community templates to leverage your data effectively.",
  },
  {
    icon: "Share2",
    title: "Advanced Scouter Management",
    description:
      "Manage your scouting team with ease. Assign roles, track performance, and ensure data integrity across all scouts.",
  },
];

const SpikeScoutPage = () => {
  return (
    <div>
      <SoftGradientHero
        gradient="from-indigo-500 via-sky-500 to-cyan-400"
        glowA="bg-sky-400/40"
        glowB="bg-cyan-300/40"
      >
        <ProjectHeader
          title="Spike Scout"
          description="An advanced scouting system for FRC teams, delivering immersive analytics and adaptive insights to transform robotics competition preparation."
        />
      </SoftGradientHero>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>

      <ProjectNavigation href="/projects/attendance" projectName="Attendance" />
    </div>
  );
};

export default SpikeScoutPage;
