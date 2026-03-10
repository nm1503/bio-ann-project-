import { useState, useCallback } from 'react';

// Network structure: layers with node counts
const LAYERS = [
  { name: 'Input', count: 3, color: '#06b6d4' },
  { name: 'Hidden 1', count: 4, color: '#3b82f6' },
  { name: 'Hidden 2', count: 4, color: '#8b5cf6' },
  { name: 'Output', count: 2, color: '#10b981' },
];

const W = 600;
const H = 340;
const PAD_X = 70;
const PAD_Y = 40;

function getNodePositions() {
  const positions = [];
  LAYERS.forEach((layer, li) => {
    const x = PAD_X + li * ((W - PAD_X * 2) / (LAYERS.length - 1));
    for (let ni = 0; ni < layer.count; ni++) {
      const totalH = H - PAD_Y * 2;
      const spacing = totalH / (layer.count - 1 || 1);
      const y = PAD_Y + (layer.count === 1 ? totalH / 2 : ni * spacing);
      positions.push({ x, y, layer: li, idx: ni });
    }
  });
  return positions;
}

const nodePositions = getNodePositions();

// Pre-compute all connections
const connections = [];
let nodeIndex = 0;
const layerStartIdx = [];
LAYERS.forEach((layer, li) => {
  layerStartIdx.push(nodeIndex);
  nodeIndex += layer.count;
});

LAYERS.forEach((layer, li) => {
  if (li === LAYERS.length - 1) return;
  for (let ni = 0; ni < layer.count; ni++) {
    for (let nj = 0; nj < LAYERS[li + 1].count; nj++) {
      connections.push({
        fromLayer: li,
        fromIdx: ni,
        toLayer: li + 1,
        toIdx: nj,
      });
    }
  }
});

export default function ANNArchitecture() {
  const [activeLayer, setActiveLayer] = useState(-1);
  const [activeConns, setActiveConns] = useState(new Set());
  const [activeNodes, setActiveNodes] = useState(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const getNodeKey = (layer, idx) => `${layer}-${idx}`;
  const getConnKey = (fl, fi, tl, ti) => `${fl}-${fi}-${tl}-${ti}`;

  const runForwardPass = useCallback(async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveLayer(-1);
    setActiveConns(new Set());
    setActiveNodes(new Set());

    for (let li = 0; li < LAYERS.length; li++) {
      await new Promise((r) => setTimeout(r, 500));

      // Highlight nodes in this layer
      const newNodes = new Set();
      for (let ni = 0; ni < LAYERS[li].count; ni++) {
        newNodes.add(getNodeKey(li, ni));
      }
      setActiveNodes(newNodes);
      setActiveLayer(li);

      if (li < LAYERS.length - 1) {
        await new Promise((r) => setTimeout(r, 400));
        // Highlight connections from this layer
        const newConns = new Set();
        connections
          .filter((c) => c.fromLayer === li)
          .forEach((c) => newConns.add(getConnKey(c.fromLayer, c.fromIdx, c.toLayer, c.toIdx)));
        setActiveConns(newConns);
      }
    }

    await new Promise((r) => setTimeout(r, 800));
    setIsAnimating(false);
    setActiveLayer(-1);
    setActiveConns(new Set());
    setActiveNodes(new Set());
  }, [isAnimating]);

  return (
    <section id="ann-arch" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          ANN Architecture 🏗️
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A neural network is organized in layers. Click "Forward Pass" to animate
          data flowing through the network from input to output.
        </p>
      </div>

      {/* Layer labels legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {LAYERS.map((layer, li) => (
          <div
            key={li}
            className="flex items-center gap-2 px-4 py-2 glass-card rounded-full text-sm"
            style={{ borderColor: activeLayer === li ? layer.color : 'transparent', border: '1px solid' }}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{
                background: layer.color,
                boxShadow: activeLayer === li ? `0 0 8px ${layer.color}` : 'none',
              }}
            />
            <span className={activeLayer === li ? 'text-white font-semibold' : 'text-slate-400'}>
              {layer.name} ({layer.count})
            </span>
          </div>
        ))}
      </div>

      {/* SVG network */}
      <div className="glass-card rounded-2xl p-4 md:p-8 overflow-x-auto mb-8">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-2xl mx-auto" style={{ minWidth: 280 }}>
          {/* Connections */}
          {connections.map((c) => {
            const from = nodePositions.find(
              (n) => n.layer === c.fromLayer && n.idx === c.fromIdx
            );
            const to = nodePositions.find(
              (n) => n.layer === c.toLayer && n.idx === c.toIdx
            );
            const key = getConnKey(c.fromLayer, c.fromIdx, c.toLayer, c.toIdx);
            const isActive = activeConns.has(key);
            return (
              <line
                key={key}
                x1={from.x} y1={from.y}
                x2={to.x} y2={to.y}
                stroke={isActive ? LAYERS[c.fromLayer].color : '#1e293b'}
                strokeWidth={isActive ? 2 : 1}
                opacity={isActive ? 0.9 : 0.4}
                style={{ transition: 'all 0.3s' }}
              />
            );
          })}

          {/* Nodes */}
          {nodePositions.map((node) => {
            const layer = LAYERS[node.layer];
            const key = getNodeKey(node.layer, node.idx);
            const isActive = activeNodes.has(key);
            return (
              <g key={key}>
                {/* Glow ring */}
                {isActive && (
                  <circle
                    cx={node.x} cy={node.y} r="18"
                    fill="none"
                    stroke={layer.color}
                    strokeWidth="2"
                    opacity="0.5"
                  />
                )}
                <circle
                  cx={node.x} cy={node.y} r="14"
                  fill={isActive ? layer.color : '#1e293b'}
                  stroke={layer.color}
                  strokeWidth="1.5"
                  style={{ transition: 'all 0.3s' }}
                />
                {/* Node value indicator */}
                {isActive && (
                  <text
                    x={node.x} y={node.y + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    {(Math.random() * 0.9 + 0.1).toFixed(1)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Layer labels at bottom */}
          {LAYERS.map((layer, li) => {
            const x = PAD_X + li * ((W - PAD_X * 2) / (LAYERS.length - 1));
            return (
              <text
                key={li}
                x={x} y={H - 8}
                textAnchor="middle"
                fill={activeLayer === li ? layer.color : '#64748b'}
                fontSize="11"
                fontFamily="sans-serif"
                style={{ transition: 'fill 0.3s' }}
              >
                {layer.name}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <button
          onClick={runForwardPass}
          disabled={isAnimating}
          className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-300
            ${isAnimating
              ? 'bg-slate-700 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30 hover:scale-105'
            }`}
        >
          {isAnimating ? '⏳ Animating…' : '▶ Forward Pass'}
        </button>
        <button
          onClick={() => {
            setActiveLayer(-1);
            setActiveConns(new Set());
            setActiveNodes(new Set());
          }}
          className="px-6 py-3 rounded-full border border-slate-600 text-slate-400
                     hover:border-slate-400 hover:text-white transition-all duration-200"
        >
          ↺ Reset
        </button>
      </div>

      {/* Info cards */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Input Layer', desc: 'Receives raw data features', icon: '📥', color: '#06b6d4' },
          { title: 'Hidden Layers', desc: 'Learn abstract representations', icon: '🧩', color: '#3b82f6' },
          { title: 'Activation', desc: 'Non-linear transformation f(x)', icon: '⚡', color: '#8b5cf6' },
          { title: 'Output Layer', desc: 'Final prediction or classification', icon: '📤', color: '#10b981' },
        ].map((card, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-4 text-center hover:scale-105 transition-transform"
            style={{ borderTop: `2px solid ${card.color}` }}
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <h4 className="font-semibold text-sm text-white mb-1">{card.title}</h4>
            <p className="text-slate-500 text-xs">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
