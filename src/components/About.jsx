import { motion } from "framer-motion";
import { FiCpu, FiLayout, FiTarget} from "react-icons/fi";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const About = () => {
  return (
    <section id="about" className="py-32 bg-black text-white relative border-t border-zinc-900 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-zinc-900/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: The Story */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUpVariant} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-zinc-600" />
              <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest">
                Behind the Code
              </p>
            </motion.div>

            <motion.h2 
              variants={fadeUpVariant}
              className="text-4xl md:text-5xl font-black tracking-tighter mb-8"
            >
              Engineering meets <br className="hidden md:block"/>
              <span className="text-zinc-500">obsession.</span>
            </motion.h2>

            <motion.div variants={fadeUpVariant} className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">
              <p>
                My journey into full-stack development started with a simple drive: I love building things from the ground up. Currently studying Computer Engineering, I've bridged the gap between theoretical computing and building highly functional web applications.
              </p>
              <p>
                I am absolutely obsessed with crafting pixel-perfect, intuitive UIs, but I don't stop at the surface. I want to build digital products that actually solve real-world problems. While I appreciate a sleek frontend, my favorite playground right now is the backend—specifically writing high-performance, concurrent logic in <span className="text-white font-semibold">Go</span>.
              </p>
              <p>
                When my IDE is closed, I'm usually diving deep into full-length music albums or nerding out over football. My current mission? Just keep building.
              </p>
            </motion.div>
          </motion.div>

          
          
    

        </div>
      </div>
    </section>
  );
};