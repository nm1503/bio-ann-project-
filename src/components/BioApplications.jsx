import { useEffect, useRef, useState } from 'react';

const applications = [
  {
    icon: '💊',
    title: 'Drug Discovery',
    color: '#3b82f6',
    desc: 'ANNs predict the binding affinity of drug molecules to protein targets, dramatically accelerating the early stages of drug development.',
    example: 'Atomwise used deep learning to identify promising Ebola drug candidates in 24 hours vs. years of lab work.',
  },
  {
    icon: '🧬',
    title: 'Protein Structure Prediction',
    color: '#8b5cf6',
    desc: 'Deep learning models predict the 3D structure of proteins from amino acid sequences — solving a 50-year-old grand challenge in biology.',
    example: "DeepMind's AlphaFold2 predicted structures for 200M+ proteins with atomic accuracy, deposited in the AlphaFold Protein Structure Database.",
  },
  {
    icon: '🔬',
    title: 'Genomics & DNA Analysis',
    color: '#10b981',
    desc: 'Neural networks identify genetic variants associated with diseases, classify non-coding RNA, and predict gene expression from sequence data.',
    example: 'DeepVariant (Google) uses CNNs to identify genetic mutations from sequencing data with 99.9%+ accuracy.',
  },
  {
    icon: '🏥',
    title: 'Medical Image Analysis',
    color: '#06b6d4',
    desc: 'CNNs analyze MRI, CT, and pathology slides to detect tumors, diagnose diabetic retinopathy, and classify skin cancer — often exceeding radiologist performance.',
    example: 'Google Health AI detected breast cancer in mammograms with 11% fewer false positives than expert radiologists.',
  },
  {
    icon: '🧠',
    title: 'Brain-Computer Interfaces',
    color: '#f59e0b',
    desc: 'ANNs decode neural signals from the brain in real time to control prosthetic limbs, restore speech, or translate imagined movements into text or mouse control.',
    example: "BrainGate's system uses RNNs to decode handwriting intent from motor cortex signals at 90 characters/minute.",
  },
  {
    icon: '📊',
    title: 'Epidemic Prediction',
    color: '#ec4899',
    desc: 'Deep learning models predict the spread of infectious diseases by analyzing mobility patterns, genomic mutations, weather data, and hospital admission rates.',
    example: 'BlueDot used NLP + ML to detect COVID-19 outbreak alerts 9 days before the WHO official announcement.',
  },
];

function AppCard({ app, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="glass-card rounded-2xl p-6 group hover:scale-105 transition-all duration-300"
      style={{
        borderTop: `3px solid ${app.color}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="text-3xl p-3 rounded-xl flex-shrink-0"
          style={{ background: `${app.color}20` }}
        >
          {app.icon}
        </div>
        <div>
          <h3
            className="font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform"
            style={{ color: app.color }}
          >
            {app.title}
          </h3>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-4 leading-relaxed">{app.desc}</p>

      <div
        className="rounded-xl p-3 text-xs text-slate-300 leading-relaxed"
        style={{ background: `${app.color}12`, borderLeft: `3px solid ${app.color}60` }}
      >
        <span className="font-semibold" style={{ color: app.color }}>Real example: </span>
        {app.example}
      </div>
    </div>
  );
}

export default function BioApplications() {
  return (
    <section id="applications" className="py-20 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Biological Applications 🌿
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          ANNs are transforming biology and medicine. Here are six landmark
          application areas where deep learning is making a real-world impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app, i) => (
          <AppCard key={app.title} app={app} index={i} />
        ))}
      </div>
    </section>
  );
}
