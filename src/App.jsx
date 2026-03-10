import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BiologicalNeuron from './components/BiologicalNeuron';
import BioToArtificial from './components/BioToArtificial';
import ANNArchitecture from './components/ANNArchitecture';
import TrainingProcess from './components/TrainingProcess';
import ActivationFunctions from './components/ActivationFunctions';
import TypesOfANN from './components/TypesOfANN';
import BioApplications from './components/BioApplications';
import InteractiveDemo from './components/InteractiveDemo';
import Quiz from './components/Quiz';
import References from './components/References';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-950 dark:bg-slate-950 text-white transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main>
          <Hero />
          <BiologicalNeuron />
          <BioToArtificial />
          <ANNArchitecture />
          <TrainingProcess />
          <ActivationFunctions />
          <TypesOfANN />
          <BioApplications />
          <InteractiveDemo />
          <Quiz />
          <References />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
