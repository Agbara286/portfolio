import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Project';
import { Contact } from './components/Contact';
import { About } from './components/About';
import PortfolioBlog from './components/Blog';


const Home = () => (
  <>
    <Hero />
    <About />
    <Projects />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <main className="bg-black min-h-screen selection:bg-white selection:text-black">
        
        <Navbar />
        
        <Routes>
          
          <Route path="/" element={<Home />} />
          
         
          <Route path="/blog" element={
            <div className="pt-32 pb-20 px-4">
               <PortfolioBlog />
            </div>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;