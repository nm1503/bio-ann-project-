# 🧠 Artificial Neural Networks: From Biology to Technology

> An interactive React web app exploring Artificial Neural Networks from a biological perspective — built as a bio project by **Team Infinity**.

---

## ✨ Features

- 🧬 **Biological Neuron** — Interactive SVG diagram with labeled parts and hover tooltips
- 🤖 **Bio ↔ Artificial Comparison** — Side-by-side mapping of biological and artificial neuron components
- 🏗️ **ANN Architecture** — Animated forward-pass visualization through a multi-layer network
- 🏋️ **Training Process** — Step-by-step walkthrough of forward prop, loss, backprop, and weight update with learning rate slider
- ⚡ **Activation Functions** — Live SVG charts for Sigmoid, ReLU, Tanh, Softmax with pros/cons
- 🗂️ **Types of ANN** — Flip cards for Feedforward, CNN, RNN, GAN with mini SVG diagrams
- 🌿 **Biological Applications** — Drug discovery, protein folding, genomics, medical imaging, BCIs, epidemic prediction
- 🎮 **Interactive Demo** — Real-time single-neuron playground with adjustable inputs, weights, bias, and activation function
- 🧩 **Knowledge Quiz** — 8 multiple-choice questions with explanations and score tracking
- 📚 **References** — Academic papers and educational resources
- 🌙 **Dark/Light mode toggle**, responsive design, glass-morphism cards, CSS animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Vite + React** | Build tooling and UI framework |
| **Tailwind CSS v3** | Utility-first styling |
| **Custom CSS animations** | Floating nodes, glow effects, SVG path drawing |
| **Inline SVG** | Neuron diagrams, activation charts, network visualizations |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/PiusChauhan/bio-ann-project.git
cd bio-ann-project

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
bio-ann-project/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css               ← Tailwind + custom animations
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── BiologicalNeuron.jsx
│   │   ├── BioToArtificial.jsx
│   │   ├── ANNArchitecture.jsx
│   │   ├── TrainingProcess.jsx
│   │   ├── ActivationFunctions.jsx
│   │   ├── TypesOfANN.jsx
│   │   ├── BioApplications.jsx
│   │   ├── InteractiveDemo.jsx
│   │   ├── Quiz.jsx
│   │   ├── References.jsx
│   │   └── Footer.jsx
│   └── utils/
│       └── neuralNetwork.js    ← Forward pass logic
└── README.md
```

---

## 📸 Screenshots

> _Run `npm run dev` and explore the app locally._

---

## 👤 Credits

Built with ❤️ by **Team Infinity** as a biology class project on Artificial Neural Networks.

---

## 📄 License

MIT — see [LICENSE](LICENSE) file for details.
