import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { FiMail, FiMapPin ,FiGlobe} from "react-icons/fi";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY 
      );

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: "Message sent successfully! I'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prev => ({...prev, message: "", success: false}));
      }, 5000);

    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: "Failed to send message. Please try again or email me directly.",
      });
    }
  };

  return (
    <section id="contact" className="py-32 bg-black text-white relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* Left Column: Text & Info */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col justify-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
            >
              Let's build something <br className="hidden md:block"/>
              <span className="text-zinc-600">together.</span>
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-zinc-400 text-lg max-w-md mb-10 leading-relaxed"
            >
              I'm currently available for freelance work and full-time opportunities. If you have a project that needs some creative engineering, I'd love to hear about it.
            </motion.p>

            <motion.div variants={staggerContainer} className="flex flex-col gap-6">
              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-mono mb-1">EMAIL</p>
                  <a href="mailto:abejideagbara94@gmail.com" className="text-white hover:text-zinc-300 transition-colors">
                    abejideagbara94@gmail.com
                  </a>
                </div>
              </motion.div>

                <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                  <FiGlobe size={20} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 font-mono mb-1">LOCATION</p>
                  <p className="text-white">Worldwide (Remote)</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: The Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-zinc-950 border border-zinc-800/80 p-8 md:p-10 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono text-zinc-500 ml-1">NAME</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:bg-black transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono text-zinc-500 ml-1">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:bg-black transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-zinc-500 ml-1">MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-400 focus:bg-black transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus.submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black font-bold py-4 rounded-xl mt-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus.submitting ? "Sending..." : "Send Message"}
              </motion.button>

              {/* Status Message Display */}
              {formStatus.message && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm text-center font-medium mt-2 ${
                    formStatus.success ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formStatus.message}
                </motion.p>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};