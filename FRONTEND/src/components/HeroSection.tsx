import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

const decorativeVariants = {
  initial: {
    opacity: 0,
  },
  animate: (i: number) => ({
    opacity: 1,
    x: [0, 20, -20, 0],
    y: [0, -20, 20, 0],
    transition: {
      duration: 15 + i * 5,
      repeat: Infinity,
      repeatType: "mirror",
    },
  }),
};

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-harmony"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <motion.div
          custom={1}
          variants={decorativeVariants}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          custom={2}
          variants={decorativeVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="block text-foreground">Bem-vindo ao FluiSaúde</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          O seu centro de comando para uma saúde focada.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            size="lg"
            onClick={() => { window.location.href = `${window.location.protocol}//${window.location.hostname}:5001/dashboard`; }}
            className="group relative overflow-hidden bg-gradient-to-r from-accent to-primary text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Comece a usar FluiSaúde
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
