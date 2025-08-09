const SoftGradientHero = ({
  gradient = "from-indigo-500 via-sky-500 to-cyan-400",
  glowA = "bg-white/10",
  glowB = "bg-white/10",
  height = "h-screen",
  className = "",
  children,
}) => {
  return (
    <div className={`relative ${height} overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-10">
        {/* Base gradient with reduced intensity */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60`}
        />
        {/* Dim overlay for contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-neutral-900/60 mix-blend-multiply"
        />
        {/* Soft blurred color glows */}
        <div
          aria-hidden="true"
          className={`absolute -top-24 -left-24 h-72 w-72 rounded-full ${glowA} blur-3xl`}
        />
        <div
          aria-hidden="true"
          className={`absolute -bottom-24 -right-24 h-80 w-80 rounded-full ${glowB} blur-3xl`}
        />
        {/* Gentle texture grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]"
        />
        {/* Vignette for focus */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.35),rgba(255,255,255,0)_60%),radial-gradient(120%_60%_at_50%_100%,rgba(0,0,0,0.6),transparent_60%)]"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default SoftGradientHero;
