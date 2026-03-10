import { useState } from 'react';

// SVG chart dimensions
const CW = 300;
const CH = 200;
const MARGIN = { top: 20, right: 20, bottom: 30, left: 40 };
const innerW = CW - MARGIN.left - MARGIN.right;
const innerH = CH - MARGIN.top - MARGIN.bottom;

// Map value in domain [-4,4] to pixel x
const toX = (v) => MARGIN.left + ((v + 4) / 8) * innerW;
// Map y value in range to pixel y (inverted)
const toY = (v, min, max) => MARGIN.top + (1 - (v - min) / (max - min)) * innerH;

const fns = {
  sigmoid: {
    label: 'Sigmoid',
    formula: 'σ(x) = 1 / (1 + e⁻ˣ)',
    range: '[0, 1]',
    derivative: 'σ(x)·(1−σ(x))',
    useCases: 'Binary classification output layer',
    pros: 'Smooth, probabilistic output',
    cons: 'Vanishing gradient for large |x|',
    color: '#3b82f6',
    yMin: -0.1,
    yMax: 1.1,
    fn: (x) => 1 / (1 + Math.exp(-x)),
  },
  relu: {
    label: 'ReLU',
    formula: 'f(x) = max(0, x)',
    range: '[0, ∞)',
    derivative: '0 if x<0, 1 if x≥0',
    useCases: 'Hidden layers (most popular)',
    pros: 'Fast training, no vanishing gradient for x>0',
    cons: 'Dying ReLU — neurons stuck at 0',
    color: '#10b981',
    yMin: -0.5,
    yMax: 4.5,
    fn: (x) => Math.max(0, x),
  },
  tanh: {
    label: 'Tanh',
    formula: 'f(x) = (eˣ − e⁻ˣ)/(eˣ + e⁻ˣ)',
    range: '[-1, 1]',
    derivative: '1 − tanh²(x)',
    useCases: 'Hidden layers, RNNs',
    pros: 'Zero-centered, stronger gradients than sigmoid',
    cons: 'Still suffers vanishing gradient at extremes',
    color: '#8b5cf6',
    yMin: -1.2,
    yMax: 1.2,
    fn: (x) => Math.tanh(x),
  },
  softmax: {
    label: 'Softmax',
    formula: 'σ(z)ᵢ = eᶻⁱ / Σⱼ eᶻʲ',
    range: '(0, 1) summing to 1',
    derivative: 'σᵢ·(δᵢⱼ − σⱼ)',
    useCases: 'Multi-class classification output',
    pros: 'Produces probability distribution',
    cons: 'Not used in hidden layers',
    color: '#f59e0b',
    yMin: -0.1,
    yMax: 1.1,
    // For softmax we show a simplified version (sigmoid shape with multiple outputs)
    fn: (x) => 1 / (1 + Math.exp(-x * 0.8)),
  },
};

function buildPath(fn, yMin, yMax) {
  const points = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const xVal = -4 + (i / steps) * 8;
    const yVal = fn(xVal);
    const px = toX(xVal);
    const py = toY(yVal, yMin, yMax);
    points.push(`${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`);
  }
  return points.join(' ');
}

export default function ActivationFunctions() {
  const [selected, setSelected] = useState('sigmoid');
  const fn = fns[selected];

  return (
    <section id="activation" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Activation Functions ⚡
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Activation functions introduce non-linearity into the network. Without them,
          a neural network would just be a linear transformation — no matter how many layers.
        </p>
      </div>

      {/* Tab selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {Object.entries(fns).map(([key, f]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300
              ${selected === key
                ? 'text-white scale-105 shadow-lg'
                : 'glass-card text-slate-400 hover:text-white'
              }`}
            style={{
              background: selected === key ? f.color : undefined,
              boxShadow: selected === key ? `0 4px 14px ${f.color}50` : undefined,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SVG Chart */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-center text-slate-400 text-sm mb-4">Function Graph</h3>
          <svg
            width="100%"
            viewBox={`0 0 ${CW} ${CH}`}
            className="mx-auto"
          >
            {/* Grid lines */}
            {[-4, -2, 0, 2, 4].map((v) => (
              <line
                key={v}
                x1={toX(v)} y1={MARGIN.top}
                x2={toX(v)} y2={MARGIN.top + innerH}
                stroke="#1e293b" strokeWidth="1"
              />
            ))}
            {[0, 0.25, 0.5, 0.75, 1].map((v) => {
              const yPx = toY(
                fn.yMin + v * (fn.yMax - fn.yMin),
                fn.yMin, fn.yMax
              );
              return (
                <line
                  key={v}
                  x1={MARGIN.left} y1={yPx}
                  x2={MARGIN.left + innerW} y2={yPx}
                  stroke="#1e293b" strokeWidth="1"
                />
              );
            })}

            {/* Axes */}
            {/* X axis */}
            <line
              x1={MARGIN.left} y1={toY(0, fn.yMin, fn.yMax)}
              x2={MARGIN.left + innerW} y2={toY(0, fn.yMin, fn.yMax)}
              stroke="#334155" strokeWidth="1.5"
            />
            {/* Y axis */}
            <line
              x1={toX(0)} y1={MARGIN.top}
              x2={toX(0)} y2={MARGIN.top + innerH}
              stroke="#334155" strokeWidth="1.5"
            />

            {/* Axis labels */}
            {[-4, -2, 0, 2, 4].map((v) => (
              <text key={v} x={toX(v)} y={MARGIN.top + innerH + 16}
                textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">
                {v}
              </text>
            ))}

            {/* Function curve */}
            <path
              d={buildPath(fn.fn, fn.yMin, fn.yMax)}
              stroke={fn.color}
              strokeWidth="2.5"
              fill="none"
              className="draw-path"
              key={selected} // re-trigger animation on change
            />

            {/* Origin label */}
            <text x={toX(0) + 3} y={toY(0, fn.yMin, fn.yMax) - 4}
              fill="#475569" fontSize="9">0</text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          {/* Formula */}
          <div className="glass-card rounded-xl p-5">
            <p className="text-xs text-slate-500 mb-1">Formula</p>
            <p className="font-mono text-lg font-bold" style={{ color: fn.color }}>
              {fn.formula}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Output Range</p>
              <p className="text-white font-semibold">{fn.range}</p>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Derivative</p>
              <p className="text-white font-mono text-sm">{fn.derivative}</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-1">Use Cases</p>
            <p className="text-white text-sm">{fn.useCases}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-4 border-l-2 border-green-500">
              <p className="text-xs text-green-400 mb-1">✅ Pros</p>
              <p className="text-slate-300 text-xs">{fn.pros}</p>
            </div>
            <div className="glass-card rounded-xl p-4 border-l-2 border-red-500">
              <p className="text-xs text-red-400 mb-1">❌ Cons</p>
              <p className="text-slate-300 text-xs">{fn.cons}</p>
            </div>
          </div>

          {/* Usage in common architectures */}
          <div className="glass-card rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-2">Where it's used</p>
            <div className="flex flex-wrap gap-2">
              {selected === 'relu' && ['CNNs', 'Deep Networks', 'Hidden Layers'].map(t => (
                <span key={t} className="px-2 py-0.5 bg-green-900/40 border border-green-700 rounded-full text-green-400 text-xs">{t}</span>
              ))}
              {selected === 'sigmoid' && ['Binary Output', 'Logistic Regression', 'Gates in LSTM'].map(t => (
                <span key={t} className="px-2 py-0.5 bg-blue-900/40 border border-blue-700 rounded-full text-blue-400 text-xs">{t}</span>
              ))}
              {selected === 'tanh' && ['RNNs', 'NLP', 'Hidden Layers'].map(t => (
                <span key={t} className="px-2 py-0.5 bg-purple-900/40 border border-purple-700 rounded-full text-purple-400 text-xs">{t}</span>
              ))}
              {selected === 'softmax' && ['Multi-class Output', 'Transformers', 'Attention'].map(t => (
                <span key={t} className="px-2 py-0.5 bg-yellow-900/40 border border-yellow-700 rounded-full text-yellow-400 text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
