export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#08080a]">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d10] via-[#0a0a0c] to-[#08080a]" />

      {/* Soft floating crimson accents */}
      <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-[#ff3355]/15 blur-[130px] animate-drift-slow" />
      <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] rounded-full bg-[#ff3355]/10 blur-[140px] animate-drift-slower" />
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] rounded-full bg-[#c81e3a]/10 blur-[140px] animate-drift" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,10,0.7)_100%)]" />
    </div>
  );
}
