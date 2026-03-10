import { useState } from 'react';

const questions = [
  {
    q: 'Which part of a biological neuron is analogous to the INPUT of an artificial neuron?',
    options: ['Axon terminals', 'Dendrites', 'Myelin sheath', 'Cell body'],
    answer: 1,
    explanation: 'Dendrites receive signals from other neurons, just like inputs receive data values in an artificial neuron.',
  },
  {
    q: 'What is the PRIMARY purpose of an activation function?',
    options: [
      'To initialize the network weights',
      'To regularize the model',
      'To introduce non-linearity into the network',
      'To normalize the input data',
    ],
    answer: 2,
    explanation: 'Without non-linearity, a neural network — regardless of depth — would behave as a single linear layer.',
  },
  {
    q: 'Which type of neural network is BEST suited for image recognition tasks?',
    options: ['Recurrent Neural Network', 'Feedforward NN', 'Convolutional Neural Network', 'GAN'],
    answer: 2,
    explanation: 'CNNs use convolutional filters to exploit spatial structure in images, making them highly effective for vision tasks.',
  },
  {
    q: 'What does BACKPROPAGATION calculate during training?',
    options: [
      'The predicted output values',
      'Gradients of the loss with respect to each weight',
      'The number of layers in the network',
      'The learning rate schedule',
    ],
    answer: 1,
    explanation: 'Backpropagation applies the chain rule to compute how much each weight contributed to the overall loss.',
  },
  {
    q: 'Which activation function is most known to suffer from the VANISHING GRADIENT problem?',
    options: ['ReLU', 'Leaky ReLU', 'Tanh', 'Sigmoid'],
    answer: 3,
    explanation: 'Sigmoid saturates at both extremes (near 0 and near 1), producing near-zero gradients that prevent early layers from learning.',
  },
  {
    q: 'In ANNs, what is the biological equivalent of SYNAPTIC STRENGTH?',
    options: ['Bias term', 'Learning rate', 'Weight (wᵢ)', 'Activation function'],
    answer: 2,
    explanation: 'Synaptic strength determines how strongly one neuron influences another — exactly what weights do in artificial networks.',
  },
  {
    q: 'Which AI system uses ANNs to predict 3D PROTEIN STRUCTURES from sequences?',
    options: ['ChatGPT', 'AlphaFold', 'DALL-E', 'AlphaGo'],
    answer: 1,
    explanation: "DeepMind's AlphaFold 2 solved the 50-year protein folding challenge, predicting structures for over 200 million proteins.",
  },
  {
    q: 'What is an EPOCH in neural network training?',
    options: [
      'One update of a single weight',
      'One forward pass through a single sample',
      'One complete pass through the ENTIRE training dataset',
      'One cycle of the learning rate scheduler',
    ],
    answer: 2,
    explanation: 'An epoch = one full pass through all training samples. Multiple epochs allow the network to refine its weights over time.',
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    const correct = idx === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { q: q.q, selected: idx, correct, correctAnswer: q.answer }]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
    setDone(false);
    setAnswers([]);
  };

  const percentage = Math.round((score / questions.length) * 100);

  const getFeedback = () => {
    if (percentage === 100) return { emoji: '🏆', msg: 'Perfect score! You\'re an ANN expert!' };
    if (percentage >= 75) return { emoji: '🎉', msg: 'Great job! Solid understanding of ANNs.' };
    if (percentage >= 50) return { emoji: '👍', msg: 'Good effort! Review the sections and try again.' };
    return { emoji: '📚', msg: 'Keep learning — explore the sections above and retry!' };
  };

  if (done) {
    const fb = getFeedback();
    return (
      <section id="quiz" className="py-20 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">Quiz Results 📊</h2>
        </div>

        <div className="glass-card rounded-2xl p-8 text-center mb-8">
          <div className="text-6xl mb-4">{fb.emoji}</div>
          <div className="text-5xl font-bold text-white mb-2">{score}/{questions.length}</div>
          <div className="text-2xl text-cyan-400 font-semibold mb-4">{percentage}%</div>
          <p className="text-slate-400 mb-6">{fb.msg}</p>

          {/* Score bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full mb-8">
            <div
              className="h-full rounded-full progress-shine transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Review answers */}
          <div className="text-left space-y-2 mb-8">
            {answers.map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl text-sm"
                style={{
                  background: a.correct ? '#14532d30' : '#7f1d1d30',
                  borderLeft: `3px solid ${a.correct ? '#10b981' : '#ef4444'}`,
                }}
              >
                <span>{a.correct ? '✅' : '❌'}</span>
                <span className="text-slate-300 truncate">{a.q}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleRetry}
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold
                       rounded-full transition-all duration-300 hover:scale-105"
          >
            🔄 Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 px-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Knowledge Quiz 🧩
        </h2>
        <p className="text-slate-400">Test your understanding of ANNs and biological neurons</p>
      </div>

      {/* Progress */}
      <div className="flex justify-between text-sm text-slate-500 mb-2">
        <span>Question {current + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-8">
        <div
          className="h-full rounded-full progress-shine transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question card */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-6 leading-relaxed">{q.q}</h3>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = 'glass-card border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-white';
            if (selected !== null) {
              if (i === q.answer) style = 'bg-green-900/30 border-green-500 text-green-300';
              else if (i === selected && i !== q.answer) style = 'bg-red-900/30 border-red-500 text-red-300';
              else style = 'glass-card border-slate-800 text-slate-500 opacity-50';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${style}`}
              >
                <span className="font-semibold mr-3 text-slate-500">
                  {String.fromCharCode(65 + i)}.
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className="mt-5 p-4 rounded-xl text-sm leading-relaxed"
            style={{
              background: selected === q.answer ? '#14532d30' : '#7f1d1d30',
              borderLeft: `3px solid ${selected === q.answer ? '#10b981' : '#ef4444'}`,
            }}
          >
            <span className="font-semibold" style={{ color: selected === q.answer ? '#10b981' : '#ef4444' }}>
              {selected === q.answer ? '✅ Correct! ' : '❌ Not quite. '}
            </span>
            <span className="text-slate-300">{q.explanation}</span>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="mt-6 w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold
                       rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            {current + 1 >= questions.length ? '📊 See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </section>
  );
}
