import { useState } from 'react';

const steps = [
  {
    id: 0,
    icon: '➡️',
    title: 'Forward Propagation',
    color: '#06b6d4',
    short: 'Pass input through the network',
    description:
      'Input data is fed through the network layer by layer. At each node, a weighted sum is computed and passed through an activation function. The final layer produces a prediction.',
    formula: 'ŷ = f(W · x + b)',
  },
  {
    id: 1,
    icon: '📉',
    title: 'Loss Calculation',
    color: '#f59e0b',
    short: 'Measure prediction error',
    description:
      'The loss (or cost) function measures how wrong the prediction is compared to the actual label. Common choices: Mean Squared Error for regression, Cross-Entropy for classification.',
    formula: 'L = -Σ y·log(ŷ)',
  },
  {
    id: 2,
    icon: '🔙',
    title: 'Backpropagation',
    color: '#8b5cf6',
    short: 'Compute gradients of the loss',
    description:
      'Using the chain rule of calculus, gradients of the loss with respect to each weight are computed by propagating the error backwards from the output to the input layer.',
    formula: '∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂w',
  },
  {
    id: 3,
    icon: '🔄',
    title: 'Weight Update',
    color: '#10b981',
    short: 'Adjust weights using gradient descent',
    description:
      'Weights are updated by subtracting a fraction (learning rate) of the gradient. This iterative process gradually minimizes the loss, making the network more accurate.',
    formula: 'w ← w − α · ∂L/∂w',
  },
];

export default function TrainingProcess() {
  const [currentStep, setCurrentStep] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const lrDescription = (lr) => {
    if (lr <= 0.001) return 'Very small — slow but stable convergence';
    if (lr <= 0.01) return 'Small — steady learning, good for most tasks';
    if (lr <= 0.1) return 'Medium — faster learning, watch for oscillation';
    return 'Large — fast but may overshoot the minimum (unstable)';
  };

  return (
    <section id="training" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Training Process 🏋️
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Neural networks learn by iterating through four key steps. Click through each
          step to understand how a network improves its predictions.
        </p>
      </div>

      {/* Step indicator strip */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => setCurrentStep(i)}
              className={`flex-shrink-0 w-10 h-10 rounded-full border-2 font-bold text-sm
                transition-all duration-300 flex items-center justify-center
                ${currentStep === i
                  ? 'scale-110 text-white'
                  : currentStep > i
                  ? 'text-white'
                  : 'border-slate-700 text-slate-600'
                }`}
              style={{
                borderColor: currentStep >= i ? s.color : undefined,
                background: currentStep > i ? s.color : currentStep === i ? s.color : 'transparent',
              }}
            >
              {currentStep > i ? '✓' : i + 1}
            </button>
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-0.5 transition-all duration-500"
                style={{
                  background: currentStep > i ? steps[i].color : '#1e293b',
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-10">
        <div
          className="h-full rounded-full progress-shine transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main step card */}
      <div
        className="glass-card rounded-2xl p-6 md:p-10 mb-8 transition-all duration-300"
        style={{ borderLeft: `4px solid ${step.color}` }}
      >
        <div className="flex items-start gap-6">
          <div
            className="text-4xl p-4 rounded-2xl flex-shrink-0"
            style={{ background: `${step.color}20` }}
          >
            {step.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ background: step.color }}>
                Step {currentStep + 1} / {steps.length}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">{step.title}</h3>
            </div>
            <p className="text-slate-400 mb-4 leading-relaxed">{step.description}</p>
            <div className="glass-card rounded-xl px-5 py-3 inline-block">
              <span className="text-xs text-slate-500 mr-2">Formula:</span>
              <span className="font-mono text-lg" style={{ color: step.color }}>
                {step.formula}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 justify-center mb-12">
        <button
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          className="px-6 py-2.5 rounded-full border border-slate-600 text-slate-300
                     hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed
                     transition-all duration-200"
        >
          ← Previous
        </button>
        <button
          onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-2.5 rounded-full text-white font-semibold transition-all duration-200
                     hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: step.color,
            boxShadow: `0 4px 14px ${step.color}40`,
          }}
        >
          Next →
        </button>
      </div>

      {/* All steps summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {steps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(i)}
            className={`glass-card rounded-xl p-4 text-left transition-all duration-300 hover:scale-105
              ${currentStep === i ? 'ring-1' : ''}`}
            style={{
              ringColor: s.color,
              borderColor: currentStep === i ? s.color : 'transparent',
              border: `1px solid ${currentStep === i ? s.color : 'transparent'}`,
            }}
          >
            <div className="text-xl mb-2">{s.icon}</div>
            <p className="text-xs font-semibold text-white mb-1">{s.title}</p>
            <p className="text-slate-500 text-xs">{s.short}</p>
          </button>
        ))}
      </div>

      {/* Learning rate slider */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="font-semibold text-white mb-4">
          🎚️ Learning Rate (α) — Interactive Explorer
        </h4>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-slate-500 text-sm w-12">α =</span>
          <input
            type="range"
            min="0.0001"
            max="0.5"
            step="0.0001"
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="flex-1 accent-blue-500"
          />
          <span className="text-cyan-400 font-mono text-sm w-16">{learningRate.toFixed(4)}</span>
        </div>
        <div
          className="rounded-lg px-4 py-3 text-sm"
          style={{
            background:
              learningRate > 0.1
                ? '#7f1d1d30'
                : learningRate > 0.01
                ? '#78350f30'
                : '#14532d30',
            borderLeft: `3px solid ${
              learningRate > 0.1 ? '#ef4444' : learningRate > 0.01 ? '#f59e0b' : '#10b981'
            }`,
          }}
        >
          <p
            className="font-medium text-sm"
            style={{
              color: learningRate > 0.1 ? '#ef4444' : learningRate > 0.01 ? '#f59e0b' : '#10b981',
            }}
          >
            {lrDescription(learningRate)}
          </p>
        </div>
      </div>
    </section>
  );
}
