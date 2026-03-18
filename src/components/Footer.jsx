export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 py-10 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="text-3xl mb-3">🧠</div>
        <p className="text-slate-300 font-semibold mb-1">
          Artificial Neural Networks: From Biology to Technology
        </p>
        <p className="text-slate-500 text-sm mb-4">
          Bio Project by{' '}
          <span className="text-cyan-400 font-semibold">Team Infinity</span>
        </p>

        <div className="flex justify-center gap-6 mb-6">
          <a
            href="https://github.com/PiusChauhan/bio-ann-project"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <span>⭐</span> GitHub
          </a>
          <a
            href="#bio-neuron"
            className="text-slate-500 hover:text-cyan-400 transition-colors text-sm"
          >
            🔝 Back to Top
          </a>
        </div>

        <p className="text-slate-700 text-xs">
          © {year} Team Infinity · MIT License · Built with React + Vite + Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
