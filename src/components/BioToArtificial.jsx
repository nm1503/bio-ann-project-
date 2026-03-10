import { useState } from 'react';

const comparisons = [
  {
    bio: { label: 'Dendrites', icon: '🌿', desc: 'Receive signals from other neurons' },
    art: { label: 'Inputs (x₁, x₂, …)', icon: '📥', desc: 'Numerical input values to the neuron' },
    color: '#06b6d4',
  },
  {
    bio: { label: 'Cell Body (Soma)', icon: '⭕', desc: 'Integrates all incoming signals' },
    art: { label: 'Weighted Sum + Bias', icon: '∑', desc: 'Σ(wᵢ · xᵢ) + b — sums weighted inputs' },
    color: '#3b82f6',
  },
  {
    bio: { label: 'Action Potential', icon: '⚡', desc: 'Neuron fires if threshold is exceeded' },
    art: { label: 'Activation Function', icon: 'f(x)', desc: 'Decides the output: sigmoid, ReLU, tanh' },
    color: '#8b5cf6',
  },
  {
    bio: { label: 'Axon / Synapse', icon: '➡️', desc: 'Transmits output to next neurons' },
    art: { label: 'Output', icon: '📤', desc: 'Activation result passed to the next layer' },
    color: '#10b981',
  },
  {
    bio: { label: 'Synaptic Strength', icon: '💪', desc: 'How strongly a synapse influences the neuron' },
    art: { label: 'Weights (wᵢ)', icon: '⚖️', desc: 'Learned parameters that scale each input' },
    color: '#f59e0b',
  },
];

export default function BioToArtificial() {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <section id="bio-to-art" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Biology → Artificial 🤖
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Every component of an artificial neuron has a direct biological counterpart.
          Hover the rows to see the connection.
        </p>
      </div>

      {/* Formula banner */}
      <div className="glass-card rounded-xl px-6 py-4 mb-10 text-center">
        <p className="text-slate-400 text-sm mb-1">Mathematical Model of a Single Neuron</p>
        <p className="text-xl md:text-2xl font-mono text-cyan-400 font-bold">
          y = f(Σ(wᵢ · xᵢ) + b)
        </p>
        <p className="text-slate-500 text-xs mt-2">
          where <span className="text-slate-300">xᵢ</span> = inputs, &nbsp;
          <span className="text-slate-300">wᵢ</span> = weights, &nbsp;
          <span className="text-slate-300">b</span> = bias, &nbsp;
          <span className="text-slate-300">f</span> = activation function
        </p>
      </div>

      {/* Comparison table */}
      <div className="grid grid-cols-1 gap-0 rounded-2xl overflow-hidden border border-slate-800">
        {/* Column headers */}
        <div className="grid grid-cols-[1fr_40px_1fr] bg-slate-900 px-4 py-3 text-sm font-semibold">
          <div className="text-cyan-400">🧬 Biological Neuron</div>
          <div />
          <div className="text-purple-400 text-right">🤖 Artificial Neuron</div>
        </div>

        {comparisons.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_40px_1fr] px-4 py-5 transition-all duration-300 cursor-pointer
              border-t border-slate-800 ${hoveredRow === i ? 'bg-slate-800/60' : 'bg-slate-900/40'}`}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            {/* Bio side */}
            <div className="flex items-center gap-3">
              <span className="text-2xl">{row.bio.icon}</span>
              <div>
                <p
                  className="font-semibold transition-colors"
                  style={{ color: hoveredRow === i ? row.color : '#e2e8f0' }}
                >
                  {row.bio.label}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">{row.bio.desc}</p>
              </div>
            </div>

            {/* Arrow connector */}
            <div className="flex items-center justify-center">
              <div
                className="text-lg transition-all duration-300"
                style={{ color: hoveredRow === i ? row.color : '#334155' }}
              >
                ↔
              </div>
            </div>

            {/* Artificial side */}
            <div className="flex items-center gap-3 justify-end text-right">
              <div>
                <p
                  className="font-semibold transition-colors"
                  style={{ color: hoveredRow === i ? row.color : '#e2e8f0' }}
                >
                  {row.art.label}
                </p>
                <p className="text-slate-500 text-xs mt-0.5">{row.art.desc}</p>
              </div>
              <span className="text-2xl">{row.art.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tooltip detail on hover */}
      <div className="mt-6 glass-card rounded-xl p-4 min-h-[60px] transition-all duration-300">
        {hoveredRow !== null ? (
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{
                background: comparisons[hoveredRow].color,
                boxShadow: `0 0 8px ${comparisons[hoveredRow].color}`,
              }}
            />
            <p className="text-slate-300 text-sm">
              <strong style={{ color: comparisons[hoveredRow].color }}>
                {comparisons[hoveredRow].bio.label}
              </strong>{' '}
              corresponds to{' '}
              <strong style={{ color: comparisons[hoveredRow].color }}>
                {comparisons[hoveredRow].art.label}
              </strong>{' '}
              — {comparisons[hoveredRow].art.desc}
            </p>
          </div>
        ) : (
          <p className="text-slate-600 text-sm text-center">Hover a row to see the biological–artificial mapping</p>
        )}
      </div>
    </section>
  );
}
