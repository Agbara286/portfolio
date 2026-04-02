import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Project';
import { Contact } from './components/Contact';
import { About } from './components/About';

function App() {
  return (
    <main className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}

export default App;
