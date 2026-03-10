import { useState, useMemo } from 'react';
import { forwardPass } from '../utils/neuralNetwork';

const INPUT_COUNT = 3;
const WEIGHT_COUNT = 3;

export default function InteractiveDemo() {
  const [inputs, setInputs] = useState([0.5, 0.7, 0.3]);
  const [weights, setWeights] = useState([0.4, 0.6, 0.8]);
  const [bias, setBias] = useState(0.1);
  const [activationFn, setActivationFn] = useState('sigmoid');

  const result = useMemo(
    () => forwardPass(inputs, weights, bias, activationFn),
    [inputs, weights, bias, activationFn]
  );

  // Color based on output value (0=blue, 1=green)
  const outputColor = (v) => {
    const r = Math.round(59 + (16 - 59) * v);
    const g = Math.round(130 + (185 - 130) * v);
    const b = Math.round(246 + (129 - 246) * v);
    return `rgb(${r},${g},${b})`;
  };

  const nodeColor = (val) => {
    if (val > 0.6) return '#10b981';
    if (val > 0.3) return '#3b82f6';
    return '#8b5cf6';
  };

  return (
    <section id="demo" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Interactive Demo 🎮
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Adjust inputs, weights, and the activation function to see real-time
          computation through a single artificial neuron.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Inputs */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-cyan-400">📥</span> Inputs (x)
            </h3>
            {inputs.map((val, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">x{i + 1}</span>
                  <span className="text-cyan-400 font-mono">{val.toFixed(2)}</span>
                </div>
                <input
                  type="range" min="0" max="1" step="0.01" value={val}
                  onChange={(e) => {
                    const newInputs = [...inputs];
                    newInputs[i] = parseFloat(e.target.value);
                    setInputs(newInputs);
                  }}
                  className="w-full accent-cyan-400"
                />
              </div>
            ))}
          </div>

          {/* Weights */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-blue-400">⚖️</span> Weights (w)
            </h3>
            {weights.map((val, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">w{i + 1}</span>
                  <span className="text-blue-400 font-mono">{val.toFixed(2)}</span>
                </div>
                <input
                  type="range" min="-2" max="2" step="0.01" value={val}
                  onChange={(e) => {
                    const newWeights = [...weights];
                    newWeights[i] = parseFloat(e.target.value);
                    setWeights(newWeights);
                  }}
                  className="w-full accent-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Bias + activation */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-purple-400">🔧</span> Bias & Activation
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Bias (b)</span>
                <span className="text-purple-400 font-mono">{bias.toFixed(2)}</span>
              </div>
              <input
                type="range" min="-2" max="2" step="0.01" value={bias}
                onChange={(e) => setBias(parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-2">Activation Function</p>
              <div className="flex gap-2">
                {['sigmoid', 'relu', 'tanh'].map((fn) => (
                  <button
                    key={fn}
                    onClick={() => setActivationFn(fn)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                      activationFn === fn
                        ? 'bg-purple-600 text-white'
                        : 'glass-card text-slate-400 hover:text-white'
                    }`}
                  >
                    {fn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visualization + Results */}
        <div className="space-y-6">
          {/* Network diagram */}
          <div className="glass-card rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-4 text-center">Live Network Diagram</h3>
            <svg viewBox="0 0 280 180" className="w-full max-w-xs mx-auto">
              {/* Input nodes */}
              {inputs.map((v, i) => {
                const y = 40 + i * 50;
                return (
                  <g key={i}>
                    <circle cx="50" cy={y} r="18"
                      fill={nodeColor(v)}
                      opacity="0.9"
                      style={{ filter: `drop-shadow(0 0 6px ${nodeColor(v)})` }}
                    />
                    <text x="50" y={y + 4} textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">
                      {v.toFixed(2)}
                    </text>
                    {/* Connection to neuron */}
                    <line x1="68" y1={y} x2="172" y2="90"
                      stroke={nodeColor(v)} strokeWidth={Math.abs(weights[i]) * 2 + 0.5}
                      opacity="0.4" />
                    {/* Weight label */}
                    <text x={110} y={y + (90 - y) / 2 - 4}
                      fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                      w={weights[i].toFixed(1)}
                    </text>
                  </g>
                );
              })}

              {/* Neuron body */}
              <circle cx="190" cy="90" r="28"
                fill={outputColor(result.output)}
                style={{ filter: `drop-shadow(0 0 12px ${outputColor(result.output)})` }}
              />
              <text x="190" y="85" textAnchor="middle" fill="white" fontSize="9">Σ+f</text>
              <text x="190" y="97" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">
                {result.output.toFixed(3)}
              </text>

              {/* Output arrow */}
              <line x1="218" y1="90" x2="255" y2="90"
                stroke={outputColor(result.output)} strokeWidth="2" />
              <circle cx="265" cy="90" r="14"
                fill={outputColor(result.output)} opacity="0.9" />
              <text x="265" y="94" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">
                out
              </text>

              {/* Labels */}
              <text x="50" y="168" textAnchor="middle" fill="#475569" fontSize="9">Inputs</text>
              <text x="190" y="130" textAnchor="middle" fill="#475569" fontSize="9">Neuron</text>
              <text x="265" y="112" textAnchor="middle" fill="#475569" fontSize="9">Output</text>
            </svg>
          </div>

          {/* Computation steps */}
          <div className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-white mb-4">🧮 Computation Steps</h3>

            {/* Step 1: Weighted sum */}
            <div className="rounded-xl bg-slate-900/50 p-3">
              <p className="text-xs text-slate-500 mb-1">1. Weighted Sum</p>
              <p className="font-mono text-sm text-slate-300">
                {inputs.map((x, i) => `(${x.toFixed(2)} × ${weights[i].toFixed(2)})`).join(' + ')} + {bias.toFixed(2)}
              </p>
              <p className="font-mono text-cyan-400 text-sm mt-1">
                = {result.weightedSum.toFixed(4)}
              </p>
            </div>

            {/* Step 2: Activation */}
            <div className="rounded-xl bg-slate-900/50 p-3">
              <p className="text-xs text-slate-500 mb-1">2. Activation Function ({activationFn})</p>
              <p className="font-mono text-sm text-slate-300">
                {activationFn}({result.weightedSum.toFixed(4)})
              </p>
              <p className="font-mono text-xl mt-1" style={{ color: outputColor(result.output) }}>
                = {result.output.toFixed(6)}
              </p>
            </div>

            {/* Output gauge */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Output value</span>
                <span className="font-mono" style={{ color: outputColor(result.output) }}>
                  {result.output.toFixed(4)}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.abs(result.output) * 100}%`,
                    background: outputColor(result.output),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
