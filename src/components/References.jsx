const references = [
  {
    category: 'Foundational Papers',
    color: '#3b82f6',
    items: [
      {
        authors: 'McCulloch, W.S. & Pitts, W.',
        year: 1943,
        title: 'A logical calculus of the ideas immanent in nervous activity',
        journal: 'Bulletin of Mathematical Biophysics, 5(4), 115–133',
        url: 'https://link.springer.com/article/10.1007/BF02478259',
      },
      {
        authors: 'Rumelhart, D.E., Hinton, G.E., & Williams, R.J.',
        year: 1986,
        title: 'Learning representations by back-propagating errors',
        journal: 'Nature, 323, 533–536',
        url: 'https://www.nature.com/articles/323533a0',
      },
      {
        authors: 'LeCun, Y., Bengio, Y., & Hinton, G.',
        year: 2015,
        title: 'Deep learning',
        journal: 'Nature, 521, 436–444',
        url: 'https://www.nature.com/articles/nature14539',
      },
    ],
  },
  {
    category: 'Biological Applications',
    color: '#10b981',
    items: [
      {
        authors: 'Jumper, J. et al.',
        year: 2021,
        title: 'Highly accurate protein structure prediction with AlphaFold',
        journal: 'Nature, 596, 583–589',
        url: 'https://www.nature.com/articles/s41586-021-03819-2',
      },
      {
        authors: 'Esteva, A. et al.',
        year: 2017,
        title: 'Dermatologist-level classification of skin cancer with deep neural networks',
        journal: 'Nature, 542, 115–118',
        url: 'https://www.nature.com/articles/nature21056',
      },
      {
        authors: 'Poplin, R. et al.',
        year: 2018,
        title: 'A universal SNP and small-indel variant caller using deep neural networks',
        journal: 'Nature Biotechnology, 36, 983–987',
        url: 'https://www.nature.com/articles/nbt.4235',
      },
    ],
  },
  {
    category: 'Educational Resources',
    color: '#8b5cf6',
    items: [
      {
        authors: 'Nielsen, M.',
        year: 2015,
        title: 'Neural Networks and Deep Learning',
        journal: 'Determination Press (free online book)',
        url: 'http://neuralnetworksanddeeplearning.com/',
      },
      {
        authors: 'Goodfellow, I., Bengio, Y., & Courville, A.',
        year: 2016,
        title: 'Deep Learning',
        journal: 'MIT Press',
        url: 'https://www.deeplearningbook.org/',
      },
      {
        authors: 'Wikipedia Contributors',
        year: 2024,
        title: 'Artificial neural network',
        journal: 'Wikipedia, The Free Encyclopedia',
        url: 'https://en.wikipedia.org/wiki/Artificial_neural_network',
      },
      {
        authors: 'Wikipedia Contributors',
        year: 2024,
        title: 'Neuron',
        journal: 'Wikipedia, The Free Encyclopedia',
        url: 'https://en.wikipedia.org/wiki/Neuron',
      },
    ],
  },
];

export default function References() {
  return (
    <section id="references" className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          References 📚
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Academic papers and educational resources that informed this project.
        </p>
      </div>

      <div className="space-y-8">
        {references.map((cat) => (
          <div key={cat.category} className="glass-card rounded-2xl p-6">
            <h3
              className="font-bold text-lg mb-4 pb-2 border-b border-slate-800"
              style={{ color: cat.color }}
            >
              {cat.category}
            </h3>
            <ol className="space-y-4">
              {cat.items.map((ref, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-slate-600 text-sm font-mono mt-0.5 flex-shrink-0">
                    [{i + 1}]
                  </span>
                  <div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {ref.authors} ({ref.year}).{' '}
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline transition-colors"
                        style={{ color: cat.color }}
                      >
                        {ref.title}
                      </a>
                      .{' '}
                      <span className="text-slate-500 italic">{ref.journal}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
