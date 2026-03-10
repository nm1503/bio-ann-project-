import { useState } from 'react';

// Neuron parts with SVG coordinates, descriptions and colors
const neuronParts = [
  {
    id: 'dendrites',
    label: 'Dendrites',
    color: '#06b6d4',
    desc: 'Branch-like projections that receive signals from other neurons and carry impulses toward the cell body.',
    // SVG shape hints stored for tooltip positioning
    cx: 120, cy: 180,
  },
  {
    id: 'soma',
    label: 'Cell Body (Soma)',
    color: '#3b82f6',
    desc: 'The main body of the neuron containing the nucleus. It integrates incoming signals and generates the output signal.',
    cx: 260, cy: 180,
  },
  {
    id: 'axon',
    label: 'Axon',
    color: '#8b5cf6',
    desc: 'A long, slender projection that transmits electrical impulses away from the cell body to other neurons.',
    cx: 420, cy: 180,
  },
  {
    id: 'myelin',
    label: 'Myelin Sheath',
    color: '#f59e0b',
    desc: 'A fatty insulating layer that wraps around the axon, speeding up signal transmission significantly.',
    cx: 450, cy: 155,
  },
  {
    id: 'terminals',
    label: 'Axon Terminals',
    color: '#10b981',
    desc: 'The endpoints of the axon that release neurotransmitters to communicate with adjacent neurons.',
    cx: 580, cy: 180,
  },
  {
    id: 'synapse',
    label: 'Synapse',
    color: '#ec4899',
    desc: 'The junction between two neurons. Neurotransmitters cross this gap to transmit signals chemically.',
    cx: 610, cy: 210,
  },
];

export default function BiologicalNeuron() {
  const [activePart, setActivePart] = useState(null);
  const active = neuronParts.find((p) => p.id === activePart);

  return (
    <section id="bio-neuron" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          The Biological Neuron 🧬
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The nervous system is built from ~86 billion neurons. Each neuron processes and
          transmits information through electrical and chemical signals. Hover over the diagram
          parts to learn more.
        </p>
      </div>

      {/* SVG Neuron Diagram */}
      <div className="glass-card rounded-2xl p-4 md:p-8 mb-8 overflow-x-auto">
        <svg
          viewBox="0 0 720 360"
          className="w-full max-w-3xl mx-auto"
          style={{ minWidth: 320 }}
        >
          {/* Background gradient */}
          <defs>
            <radialGradient id="somaGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="somaGradActive" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
            </radialGradient>
          </defs>

          {/* Dendrites */}
          {[
            { d: 'M 240 180 Q 180 130 100 100', active: false },
            { d: 'M 240 180 Q 170 160 90 160', active: false },
            { d: 'M 240 180 Q 160 200 80 220', active: false },
            { d: 'M 240 180 Q 175 230 110 260', active: false },
          ].map((line, i) => (
            <path
              key={i}
              d={line.d}
              stroke={activePart === 'dendrites' ? '#06b6d4' : '#334155'}
              strokeWidth={activePart === 'dendrites' ? 3 : 2}
              fill="none"
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setActivePart('dendrites')}
              onMouseLeave={() => setActivePart(null)}
            />
          ))}

          {/* Dendrite endpoints */}
          {[[100,100],[90,160],[80,220],[110,260]].map(([x,y],i) => (
            <circle
              key={i} cx={x} cy={y} r="5"
              fill={activePart === 'dendrites' ? '#06b6d4' : '#475569'}
              className="cursor-pointer transition-colors"
              onMouseEnter={() => setActivePart('dendrites')}
              onMouseLeave={() => setActivePart(null)}
            />
          ))}

          {/* Label: Dendrites */}
          <text x="55" y="90" fill="#94a3b8" fontSize="12" fontFamily="sans-serif">Dendrites</text>

          {/* Cell body (soma) */}
          <ellipse
            cx="260" cy="180" rx="45" ry="45"
            fill={activePart === 'soma' ? 'url(#somaGradActive)' : 'url(#somaGrad)'}
            stroke={activePart === 'soma' ? '#60a5fa' : '#3b82f6'}
            strokeWidth="2"
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setActivePart('soma')}
            onMouseLeave={() => setActivePart(null)}
          />
          {/* Nucleus inside soma */}
          <ellipse cx="260" cy="175" rx="15" ry="12" fill="#1e40af" opacity="0.7" />
          <text x="240" y="225" fill="#94a3b8" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Soma</text>

          {/* Axon hillock */}
          <path d="M 305 180 Q 340 180 360 180" stroke="#8b5cf6" strokeWidth="4" fill="none" />

          {/* Myelin segments + nodes of Ranvier */}
          {[0, 1, 2, 3].map((i) => {
            const x = 360 + i * 55;
            return (
              <g key={i}>
                <rect
                  x={x} y="165" width="40" height="30" rx="15"
                  fill={activePart === 'myelin' ? '#f59e0b' : '#78350f'}
                  fillOpacity="0.7"
                  stroke={activePart === 'myelin' ? '#fbbf24' : '#92400e'}
                  strokeWidth="1"
                  className="cursor-pointer transition-colors duration-300"
                  onMouseEnter={() => setActivePart('myelin')}
                  onMouseLeave={() => setActivePart(null)}
                />
                {/* Axon line through myelin */}
                <line
                  x1={x} y1="180" x2={x + 40} y2="180"
                  stroke={activePart === 'axon' ? '#a78bfa' : '#6d28d9'}
                  strokeWidth="4"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setActivePart('axon')}
                  onMouseLeave={() => setActivePart(null)}
                />
                {/* Node of Ranvier */}
                {i < 3 && (
                  <circle cx={x + 50} cy={180} r="4" fill="#8b5cf6" />
                )}
              </g>
            );
          })}

          {/* Axon clickable overlay */}
          <line
            x1="360" y1="180" x2="580" y2="180"
            stroke="transparent" strokeWidth="20"
            className="cursor-pointer"
            onMouseEnter={() => setActivePart('axon')}
            onMouseLeave={() => setActivePart(null)}
          />

          {/* Labels */}
          <text x="420" y="155" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Myelin Sheath</text>
          <text x="420" y="210" fill="#94a3b8" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Axon</text>

          {/* Axon terminals */}
          {[
            { d: 'M 580 180 Q 610 155 640 135' },
            { d: 'M 580 180 Q 615 180 645 180' },
            { d: 'M 580 180 Q 610 205 640 225' },
          ].map((line, i) => (
            <path
              key={i}
              d={line.d}
              stroke={activePart === 'terminals' ? '#10b981' : '#334155'}
              strokeWidth={activePart === 'terminals' ? 3 : 2}
              fill="none"
              className="cursor-pointer transition-colors duration-300"
              onMouseEnter={() => setActivePart('terminals')}
              onMouseLeave={() => setActivePart(null)}
            />
          ))}
          {[[640,135],[645,180],[640,225]].map(([x,y],i) => (
            <circle
              key={i} cx={x} cy={y} r="6"
              fill={activePart === 'terminals' || activePart === 'synapse' ? '#10b981' : '#1e293b'}
              stroke={activePart === 'terminals' || activePart === 'synapse' ? '#10b981' : '#475569'}
              strokeWidth="2"
              className="cursor-pointer transition-colors"
              onMouseEnter={() => setActivePart('terminals')}
              onMouseLeave={() => setActivePart(null)}
            />
          ))}

          <text x="670" y="160" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Axon</text>
          <text x="670" y="174" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Terminals</text>

          {/* Synapse gap indicator */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setActivePart('synapse')}
            onMouseLeave={() => setActivePart(null)}
          >
            <line x1="650" y1="250" x2="690" y2="250" stroke={activePart === 'synapse' ? '#ec4899' : '#334155'} strokeWidth="2" strokeDasharray="4" />
            <text x="655" y="268" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">Synapse</text>
          </g>

          {/* Active highlight circle */}
          {activePart && active && (
            <circle
              cx={active.cx} cy={active.cy} r="20"
              fill="none"
              stroke={active.color}
              strokeWidth="2"
              strokeDasharray="4"
              opacity="0.6"
            />
          )}
        </svg>
      </div>

      {/* Tooltip / info panel */}
      <div className="glass-card rounded-xl p-5 min-h-[80px] transition-all duration-300">
        {activePart && active ? (
          <div className="flex items-start gap-4">
            <div
              className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
              style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
            />
            <div>
              <h3 className="font-semibold text-white mb-1" style={{ color: active.color }}>
                {active.label}
              </h3>
              <p className="text-slate-400 text-sm">{active.desc}</p>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm text-center py-2">
            👆 Hover over any part of the neuron diagram to learn about it
          </p>
        )}
      </div>

      {/* Color legend */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {neuronParts.map((part) => (
          <button
            key={part.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                       transition-all duration-200 hover:scale-105 glass-card"
            style={{
              border: `1px solid ${activePart === part.id ? part.color : 'transparent'}`,
              color: activePart === part.id ? part.color : '#94a3b8',
            }}
            onMouseEnter={() => setActivePart(part.id)}
            onMouseLeave={() => setActivePart(null)}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: part.color }}
            />
            {part.label}
          </button>
        ))}
      </div>
    </section>
  );
}
