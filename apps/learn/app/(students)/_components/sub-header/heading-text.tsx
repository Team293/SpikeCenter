const motds = [
  'Welcome back! We missed you… and your overdue assignments.',
  'You’re one login away from being a productive member of society. Allegedly.',
  'Another day, another 84 tabs open. Let’s get started!',
  'Don’t worry, even NASA uses checklists.',
  "Progress is progress. Even if it's just logging in.",
  'We believe in you. Sort of. Let’s find out.',
  'Clicking around aimlessly *totally* counts as learning.',
  'You’ve got this! (Probably. Hopefully. Maybe.)',
  'Welcome back! Your to-do list tripled since last time.',
  "Good things come to those who don't leave everything until 11:59 PM.",
  'You’re smarter than this interface. Mostly.',
  "Today's forecast: 80% chance of procrastination. Fight the urge.",
  'One more quiz closer to eternal freedom. Or at least the weekend.',
  'If you’re reading this, you’re already doing better than most.',
  "Mistakes are proof you're trying. Or not paying attention. Either way, keep going.",
  'Remember: Due dates are suggestions... said no one ever.',
  'Don’t worry, the LMS is just as confused as you are.',
  'Yes, this counts as studying. Let’s roll with it.',
  "You're doing amazing, sweetie. Except that one assignment. You know the one.",
  'Every click is a step toward greatness... or a broken link.',
];

export function HeadingText({ userName }: { userName: string }) {
  const randomMotd = () => motds[Math.floor(Math.random() * motds.length)];

  const currentHour = new Date().getHours();
  const getTimeOfDayGreeting = () => {
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">
        {getTimeOfDayGreeting()}, {userName} 👋
      </h1>
      <p className="mt-2" suppressHydrationWarning>
        {randomMotd()}
      </p>
    </div>
  );
}
