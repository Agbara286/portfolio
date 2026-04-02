import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaReact, FaJava, FaHtml5, FaCss3Alt,} from "react-icons/fa";
import { 
  SiNextdotjs, SiTailwindcss, SiGo, SiJavascript, SiNodedotjs, 
  SiTypescript,  SiShadcnui, SiMongodb, SiSupabase ,SiFramer, SiPostgresql
} from "react-icons/si";

import { FiExternalLink } from "react-icons/fi";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Hero = () => {
  return (
    <motion.section
      id="home"
      className="relative min-h-screen bg-black text-white flex items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-zinc-900/40 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-zinc-800/30 blur-[100px]" />

      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 pt-24 z-10">
        
        {/* Left Column: Content */}
        <motion.div
          className="flex-1 max-w-2xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
       
          
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
            variants={fadeInUp}
          >
            EliXer<span className="text-zinc-600">.</span>
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl text-zinc-400 font-light tracking-wide mb-6" 
            variants={fadeInUp}
          >
            Fullstack Web Developer
          </motion.h2>
          
          <motion.p 
            className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl" 
            variants={fadeInUp}
          >
            I engineer high-performance web and mobile applications. Specializing in robust architectures and seamless user experiences from frontend interfaces to backend systems.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 mb-10" variants={staggerContainer}>
            <motion.a
              href="#projects"
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-zinc-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent text-white px-8 py-4 rounded-full font-bold border border-zinc-700 hover:border-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          
          <motion.div className="flex gap-6 text-2xl text-zinc-500" variants={staggerContainer}>
            <motion.a href="https://github.com/Agbara286" target="_blank" className="hover:text-white transition-colors">
              <FaGithub />
            </motion.a>
            <motion.a href="https://ng.linkedin.com/in/abejide-agbara-9a9898368" target="_blank" className="hover:text-white transition-colors">
              <FaLinkedin />
            </motion.a>
            <motion.a href="https://x.com/nothing_0142" target="_blank" className="hover:text-white transition-colors">
              <FaTwitter />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Column: Stack & Featured Project */}
    
        <motion.div
          className="flex-1 relative w-full max-w-lg flex flex-col gap-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Stack Section Container */}
          <div className="flex flex-col gap-4">
            
            {/* Title sits cleanly above the buttons now */}
            <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-700 animate-pulse"></span>
              Current Stack
            </p>

            {/* Tech Stack Cloud */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: <SiJavascript />, name: "JavaScript" },
                { icon: <SiTypescript />, name: "TypeScript" },
                { icon: <FaReact />, name: "React" },
                { icon: <SiNextdotjs />, name: "Next.js" },
                { icon: <SiTailwindcss />, name: "Tailwind" },
                { icon: <SiFramer />, name: "Framer Motion" },
                { icon: <SiNodedotjs />, name: "Node.js" },
                { icon: <SiGo />, name: "Go" },
                { icon: <FaJava />, name: "Java" },
                { icon: <SiMongodb />, name: "MongoDB" },
                { icon: <SiSupabase />, name: "Supabase" },
                { icon: <SiPostgresql />, name: "PostgreSQL" }, 
                { icon: <FaHtml5 />, name: "HTML" },
                { icon: <FaCss3Alt />, name: "CSS" },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-zinc-800/80 rounded-full hover:border-zinc-500 hover:bg-zinc-900 transition-all cursor-crosshair group"
                  whileHover={{ y: -2 }}
                >
                  <div className="text-lg text-zinc-500 group-hover:text-white transition-colors">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};