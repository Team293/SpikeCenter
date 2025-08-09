import SoftGradientHero from "~/components/gradient-hero";
import FeatureCard from "~/components/project/feature-card";
import ProjectHeader from "~/components/project/project-header";
import ProjectNavigation from "~/components/project/project-navigation";

// @ts-ignore
const features = [
  {
    icon: "Atom",
    title: "Real-Time Tracking",
    description:
      "Track team member attendance in real-time with instant updates and notifications for arrivals and departures.",
  },
  {
    icon: "Zap",
    title: "Quick Check-In",
    description:
      "Lightning-fast check-in and check-out process with one-click attendance marking and automatic time logging.",
  },
  {
    icon: "Infinity",
    title: "Flexible Scheduling",
    description:
      "Support for various work schedules including flexible hours and custom attendance policies for every team.",
  },
];

const AttendancePage = () => {
  return (
    <div>
      <SoftGradientHero
        gradient="from-emerald-500 via-teal-500 to-lime-400"
        glowA="bg-teal-400/40"
        glowB="bg-lime-300/40"
      >
        <ProjectHeader
          title="Attendance"
          description="Manage team members and their attendance with ease. Track who is present, absent, or on leave, and ensure smooth team operations."
        />
      </SoftGradientHero>

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>

      <ProjectNavigation href="/projects/lms" projectName="Next Gen LMS" />
    </div>
  );
};

export default AttendancePage;
