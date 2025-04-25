"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/736x/db/ab/f5/dbabf533b5d05d02669f13099955dcee.jpg",
    title: "INDULGE YOURSELF WITH THE FINEST OUTFITS.",
    subtitle: "AUTUMN FABRIC",
    ctaText: "Shop Collection",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/736x/1c/24/c9/1c24c99e73b76abb5dcffe12683cbd45.jpg",
    title: "DISCOVER THE LATEST TRENDS IN FASHION.",
    subtitle: "WINTER COLLECTION",
    ctaText: "Explore Now",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/736x/f1/4a/10/f14a102f411d405633ec91fd5d5c8bd0.jpg",
    title: "ELEVATE YOUR STYLE WITH PREMIUM CLOTHING.",
    subtitle: "PREMIUM SELECTION",
    ctaText: "View Collection",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + heroSlides.length) % heroSlides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute w-full h-full"
        >
          <div
            className="w-full h-full bg-contain bg-center relative"
            style={{
              backgroundImage: `url(${heroSlides[currentIndex].image})`,
            }}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-8">
              <div className="max-w-xl">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-orange-200 font-playfair italic text-lg font-medium tracking-wider mb-2"
                >
                  {heroSlides[currentIndex].subtitle}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-white font-bebas text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-wider"
                >
                  {heroSlides[currentIndex].title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button className="group relative overflow-hidden flex items-center justify-between bg-[#fefaf5] font-merriweather text-base text-black hover:bg-black rounded-2xl px-4 py-2 transition-colors duration-300">
                    <span className="z-10 transition-all duration-300 group-hover:text-white">
                      {heroSlides[currentIndex].ctaText}
                    </span>

                    <img
                      src="/pavun.png"
                      className="h-10 w-10 z-0 absolute -left-4 transition-transform duration-500 group-hover:translate-x-32"
                    />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute right-5 flex flex-col top-50 gap-2 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            } transition-all duration-300`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
    </>
  );
}
