/* Hero section with animated floating nodes background */

const nodes = [
  { x: '10%', y: '20%', size: 12, cls: 'node-float-1', color: '#3b82f6' },
  { x: '85%', y: '15%', size: 10, cls: 'node-float-2', color: '#06b6d4' },
  { x: '70%', y: '70%', size: 14, cls: 'node-float-3', color: '#8b5cf6' },
  { x: '20%', y: '75%', size: 9, cls: 'node-float-4', color: '#10b981' },
  { x: '50%', y: '10%', size: 11, cls: 'node-float-5', color: '#3b82f6' },
  { x: '90%', y: '50%', size: 8, cls: 'node-float-6', color: '#06b6d4' },
  { x: '5%', y: '50%', size: 13, cls: 'node-float-2', color: '#8b5cf6' },
  { x: '40%', y: '85%', size: 10, cls: 'node-float-3', color: '#10b981' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated SVG background */}
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="bg-glow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-glow)" />
      </svg>

      {/* Floating nodes */}
      {nodes.map((n, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-70 ${n.cls}`}
          style={{
            left: n.x,
            top: n.y,
            width: n.size * 2,
            height: n.size * 2,
            background: n.color,
            boxShadow: `0 0 ${n.size * 2}px ${n.color}`,
          }}
        />
      ))}

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-6 inline-block text-6xl animate-bounce">🧠</div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
          <span className="gradient-text">Artificial Neural Networks</span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-300 mb-4">
          From Biology to Technology
        </h2>
        <p className="text-slate-400 text-lg mb-3 max-w-2xl mx-auto">
          An Interactive Exploration by{' '}
          <span className="text-cyan-400 font-semibold">Pius Chauhan</span>
        </p>
        <p className="text-slate-500 text-sm mb-10 max-w-xl mx-auto">
          Discover how the human brain inspired the most powerful computing models in
          modern science — from biological neurons to deep learning.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#bio-neuron"
            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold
                       rounded-full transition-all duration-300 shadow-lg shadow-cyan-500/30
                       hover:shadow-cyan-400/50 hover:scale-105"
          >
            🔬 Start Exploring
          </a>
          <a
            href="#demo"
            className="px-8 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500/10
                       font-semibold rounded-full transition-all duration-300 hover:scale-105"
          >
            🎮 Try the Demo
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 text-slate-500 text-sm">
          <span>Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-slate-600 rounded-full flex items-start justify-center pt-1">
            <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
