import { useState } from 'react';

const annTypes = [
  {
    id: 'ffn',
    icon: '➡️',
    name: 'Feedforward NN',
    tagline: 'The foundation',
    color: '#3b82f6',
    desc: 'The simplest ANN where data flows in one direction — from input to output through hidden layers. No cycles or loops.',
    useCases: ['Classification', 'Regression', 'Function approximation', 'Simple predictions'],
    svgDesc: 'Sequential layers, no feedback loops',
    architecture: 'Input → Hidden → Output',
    examples: 'Digit recognition, spam detection',
  },
  {
    id: 'cnn',
    icon: '🖼️',
    name: 'Convolutional NN',
    tagline: 'Vision expert',
    color: '#10b981',
    desc: 'Uses convolutional filters to automatically extract spatial features from images. Pooling layers reduce dimensionality while preserving important features.',
    useCases: ['Image recognition', 'Object detection', 'Medical imaging', 'Video analysis'],
    svgDesc: 'Convolution + Pooling + Fully Connected',
    architecture: 'Conv → Pool → FC → Output',
    examples: 'AlexNet, ResNet, protein structure analysis',
  },
  {
    id: 'rnn',
    icon: '🔄',
    name: 'Recurrent NN',
    tagline: 'Sequence master',
    color: '#8b5cf6',
    desc: 'Has feedback connections that allow information to persist across time steps. Ideal for sequential data like language, time series, or genomic sequences.',
    useCases: ['Natural language processing', 'DNA sequence analysis', 'Time series', 'Speech recognition'],
    svgDesc: 'Recurrent connections with memory state',
    architecture: 'Input → Hidden (with loop) → Output',
    examples: 'LSTM, GRU, gene expression modeling',
  },
  {
    id: 'gan',
    icon: '🎭',
    name: 'Generative Adversarial',
    tagline: 'Creative generator',
    color: '#f59e0b',
    desc: 'Two networks compete: a Generator creates fake samples, and a Discriminator judges their authenticity. Together they learn to generate realistic data.',
    useCases: ['Drug molecule design', 'Synthetic biology', 'Data augmentation', 'Image synthesis'],
    svgDesc: 'Generator vs Discriminator adversarial loop',
    architecture: 'Generator ↔ Discriminator',
    examples: 'Drug discovery, protein design, deepfakes',
  },
];

// Simple SVG diagrams for each type
function ArchSVG({ type, color }) {
  if (type === 'ffn') {
    const layers = [2, 3, 2];
    const W = 130, H = 90;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-h-24">
        {layers.map((count, li) => {
          const x = 20 + li * 45;
          return Array.from({ length: count }).map((_, ni) => {
            const y = H / 2 - ((count - 1) * 22) / 2 + ni * 22;
            return (
              <g key={`${li}-${ni}`}>
                {li < layers.length - 1 &&
                  Array.from({ length: layers[li + 1] }).map((_, nj) => {
                    const y2 = H / 2 - ((layers[li + 1] - 1) * 22) / 2 + nj * 22;
                    return (
                      <line key={nj} x1={x + 8} y1={y} x2={x + 37} y2={y2}
                        stroke={color} strokeWidth="0.8" opacity="0.4" />
                    );
                  })}
                <circle cx={x} cy={y} r="8" fill={color} opacity="0.8" />
              </g>
            );
          });
        })}
      </svg>
    );
  }
  if (type === 'cnn') {
    return (
      <svg viewBox="0 0 140 80" className="w-full max-h-24">
        {/* Input image */}
        <rect x="5" y="20" width="20" height="40" fill={color} opacity="0.3" rx="2" />
        <rect x="8" y="23" width="14" height="14" fill={color} opacity="0.5" />
        {/* Conv layer */}
        <rect x="35" y="15" width="15" height="50" fill={color} opacity="0.4" rx="2" />
        <rect x="53" y="18" width="12" height="44" fill={color} opacity="0.3" rx="2" />
        {/* Pool */}
        <rect x="75" y="25" width="12" height="30" fill={color} opacity="0.5" rx="2" />
        {/* FC */}
        {[0,1,2].map(i => (
          <circle key={i} cx="105" cy={25 + i * 15} r="6" fill={color} opacity="0.7" />
        ))}
        {/* Output */}
        {[0,1].map(i => (
          <circle key={i} cx="130" cy={30 + i * 20} r="6" fill={color} opacity="0.9" />
        ))}
        {/* Labels */}
        <text x="10" y="74" fill="#64748b" fontSize="8">In</text>
        <text x="38" y="74" fill="#64748b" fontSize="8">Conv</text>
        <text x="73" y="74" fill="#64748b" fontSize="8">Pool</text>
        <text x="100" y="74" fill="#64748b" fontSize="8">FC</text>
      </svg>
    );
  }
  if (type === 'rnn') {
    return (
      <svg viewBox="0 0 130 90" className="w-full max-h-24">
        {[0,1,2].map(i => (
          <g key={i}>
            <rect x={10 + i * 38} y="30" width="28" height="28" fill={color} opacity="0.3"
              rx="6" stroke={color} strokeWidth="1" />
            <text x={24 + i * 38} y="48" textAnchor="middle" fill="white" fontSize="9">h{i}</text>
            {i < 2 && (
              <line x1={38 + i * 38} y1="44" x2={48 + i * 38} y2="44"
                stroke={color} strokeWidth="1.5" />
            )}
            {/* Loop arrow */}
            <path d={`M ${24 + i * 38} 30 C ${24 + i*38} 15 ${24 + i*38 + 22} 15 ${38 + i * 38} 30`}
              stroke={color} strokeWidth="1" fill="none"
              markerEnd="url(#arrow)" opacity="0.6" />
          </g>
        ))}
        <defs>
          <marker id="arrow" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <path d="M 0 0 L 4 2 L 0 4 z" fill={color} />
          </marker>
        </defs>
        <text x="65" y="82" textAnchor="middle" fill="#64748b" fontSize="8">Recurrent connections →</text>
      </svg>
    );
  }
  if (type === 'gan') {
    return (
      <svg viewBox="0 0 150 90" className="w-full max-h-24">
        {/* Noise input */}
        <rect x="5" y="35" width="22" height="20" fill="#475569" opacity="0.6" rx="4" />
        <text x="16" y="48" textAnchor="middle" fill="white" fontSize="7">Noise</text>
        {/* Generator */}
        <rect x="35" y="28" width="35" height="34" fill={color} opacity="0.4" rx="6" />
        <text x="52" y="47" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Gen</text>
        {/* Fake samples */}
        <rect x="80" y="35" width="18" height="20" fill={color} opacity="0.6" rx="3" />
        <text x="89" y="48" textAnchor="middle" fill="white" fontSize="7">Fake</text>
        {/* Discriminator */}
        <rect x="107" y="28" width="35" height="34" fill="#8b5cf6" opacity="0.4" rx="6" />
        <text x="124" y="43" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Disc</text>
        <text x="124" y="52" textAnchor="middle" fill="#94a3b8" fontSize="7">Real?</text>
        {/* Arrows */}
        <line x1="27" y1="45" x2="35" y2="45" stroke={color} strokeWidth="1.5" />
        <line x1="70" y1="45" x2="80" y2="45" stroke={color} strokeWidth="1.5" />
        <line x1="98" y1="45" x2="107" y2="45" stroke="#8b5cf6" strokeWidth="1.5" />
        {/* Feedback */}
        <path d="M 124 62 C 124 75 52 75 52 62" stroke="#f59e0b" strokeWidth="1"
          fill="none" strokeDasharray="3" />
        <text x="88" y="80" textAnchor="middle" fill="#f59e0b" fontSize="7">Gradient feedback</text>
      </svg>
    );
  }
  return null;
}

export default function TypesOfANN() {
  const [flipped, setFlipped] = useState({});

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="types" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Types of Neural Networks 🗂️
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Different problems call for different network architectures.
          Click any card to flip it and see detailed information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {annTypes.map((type) => (
          <div
            key={type.id}
            className="card-flip-container cursor-pointer"
            style={{ height: 320 }}
            onClick={() => toggleFlip(type.id)}
          >
            <div className={`card-flip-inner w-full h-full ${flipped[type.id] ? 'flipped' : ''}`}>
              {/* Front */}
              <div className="card-front glass-card rounded-2xl p-6 flex flex-col h-full"
                style={{ borderTop: `3px solid ${type.color}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{type.icon}</span>
                  <div>
                    <h3 className="font-bold text-xl text-white">{type.name}</h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${type.color}25`, color: type.color }}>
                      {type.tagline}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">{type.desc}</p>

                {/* Mini SVG diagram */}
                <div className="rounded-xl bg-slate-900/60 p-3 mb-4">
                  <ArchSVG type={type.id} color={type.color} />
                </div>

                <p className="text-xs text-center text-slate-500">Click to flip for details →</p>
              </div>

              {/* Back */}
              <div className="card-back glass-card rounded-2xl p-6 flex flex-col h-full"
                style={{ borderTop: `3px solid ${type.color}` }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{type.icon}</span>
                  <h3 className="font-bold text-lg text-white">{type.name}</h3>
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Architecture</p>
                    <p className="font-mono text-sm" style={{ color: type.color }}>{type.architecture}</p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-2">Key Use Cases</p>
                    <ul className="space-y-1">
                      {type.useCases.map((uc, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: type.color }} />
                          {uc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 mb-1">Notable Examples</p>
                    <p className="text-sm text-slate-300">{type.examples}</p>
                  </div>
                </div>

                <p className="text-xs text-center text-slate-500 mt-4">Click to flip back ←</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
