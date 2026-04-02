import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projectsData = [
  {
    id: 1,
    title: "Image Search Engine",
    description: "A simple, responsive web app that allows users to search for images in real time using the Unsplash API. Built with a focus on fast API integration.",
    tech: ["JavaScript", "HTML", "CSS"],
    github: "https://github.com/Agbara286?tab=repositories",
    live: "https://image-search-engine-kohl.vercel.app/",
    image: "/project/Annotation 2025-09-07 200544.png", 
  },
  {
    id: 2,
    title: "Blog Website",
    description: "A simple and interactive Blog Application featuring real-time database management. Users can create, read, and manage blog posts seamlessly.",
    tech: ["React", "JavaScript", "Firebase"],
    github: "https://github.com/Agbara286?tab=repositories",
    live: "https://blog-website-opal-one.vercel.app/",
    image: "/project/Annotation 2025-09-08 082518.png",
  },
  {
    id: 3,
    title: "Pizza Website",
    description: "A modern and responsive React.js website showcasing reusable components, clean UI, and a functional contact form built with ❤️.",
    tech: ["React", "JavaScript", "EmailJS", "CSS"],
    github: "https://github.com/Agbara286?tab=repositories",
    live: "https://pizzahub-website.vercel.app/",
    image: "/project/home.PNG",
  },
   {
    id: 4,
    title: "StudyFeed (wiskAi)",
    description: "A full-stack EdTech SaaS that converts PDF lecture materials into smart flashcards using Gemini AI. Engineered a decoupled Golang backend to handle custom Paystack webhook billing, an automated 3-deck paywall, and secure Row-Level Security database updates via Supabase.",
    tech: ["Next.js", "Golang", "Supabase", "Paystack API", "Gemini AI", "Railway"],
    github: "https://github.com/Agbara286?tab=repositories",
    live: "https://www.wis-kai.app/", 
    image: "/project/study.png",
  },
   {
    id: 5,
    title: "Shoe Store Website",
    description: "A modern, responsive e-commerce storefront designed for footwear. Features intuitive product navigation, dynamic cart management, and a sleek user interface optimized for a seamless shopping experience.",
    tech: ["React", "Tailwind CSS", "JavaScript"], 
    github: "https://github.com/Agbara286?tab=repositories",
    live: "https://shoe-store-one-ruby.vercel.app/",
    image: "/project/shoestore.png",
  }
];

// Animations
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Projects = () => {
  return (
    <section id="projects" className="py-32 bg-black text-white relative border-t border-zinc-900">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            Selected Works<span className="text-zinc-600">.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            A collection of my recent web applications, showcasing responsive design, API integration, and interactive user interfaces.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative flex flex-col bg-zinc-950 border border-zinc-800/50 rounded-3xl overflow-hidden hover:border-zinc-500 transition-colors duration-500"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
              transition={{ delay: index * 0.1 }}
            >
              {/* Image Area */}
              <div className="w-full h-64 sm:h-80 relative overflow-hidden bg-zinc-900">
                <motion.div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url('${project.image}')` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Overlay effect on hover to make it look premium */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  {/* Links */}
                  <div className="flex gap-4 text-zinc-500">
                    <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer z-10">
                      <FiGithub size={22} />
                    </a>
                    <a href={project.live} target="_blank" rel="noreferrer" className="hover:text-white transition-colors cursor-pointer z-10">
                      <FiExternalLink size={22} />
                    </a>
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((item, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};