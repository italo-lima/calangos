'use client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export const HeroSection = () => {
  return (
    <div className="relative hero w-full text-background">
      <div className="absolute w-full h-full bg-black opacity-70 z-10" />
      <motion.div
        className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold uppercase md:text-6xl hei"
          initial={{ scale: 1.25 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Explore a natureza e vá além dos seus limites
        </motion.h1>
        <motion.p
          className="mt-2 text-base tracking-widest md:text-2xl"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Juntos, não só conquistamos montanhas, mas também transformamos vidas
        </motion.p>
        <motion.div
          className="mt-4"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button className="uppercase bg-primary font-semibold">
            Conheça nossa campanha
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
