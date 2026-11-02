import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Scissors, Truck, Award } from "lucide-react";
import { HERO_SLIDES } from "../data/boutiqueData";

interface HeroSliderProps {
  onExploreCollection: (categorySlug?: string) => void;
  onBookInquiry: () => void;
}

export default function HeroSlider({ onExploreCollection, onBookInquiry }: HeroSliderProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = HERO_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section 
      className="relative w-full bg-[#FAF8F5] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Flourishes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#F8D7DA]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#E6C2C7]/30 blur-3xl pointer-events-none" />

      {/* Hero Showcase Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 lg:pt-10 lg:pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#B76E79]/25 bg-[#2D0A12] min-h-[580px] lg:min-h-[660px] flex items-center">
          
          {/* Background Heroine Slide Images with Crossfade */}
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center lg:object-right filter brightness-[0.88] contrast-[1.05] transition-transform duration-7000 ease-out transform scale-100 hover:scale-105"
                />
                {/* Measured Contrast Scrim for Flawless Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#200508]/95 via-[#2D0A12]/80 to-transparent lg:w-3/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200508]/90 via-transparent to-black/20" />
              </div>
            );
          })}

          {/* Hero Content Overlay (Text & Primary CTA) */}
          <div className="relative z-20 max-w-2xl px-6 sm:px-12 lg:px-16 py-12 lg:py-20 text-[#FFFDF9]">
            {/* Tagline / Subtitle flourish */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
              <span className="font-cursive-flourish text-2xl lg:text-3xl text-[#E6C280] tracking-wide">
                Where Elegance Meets Tradition
              </span>
              <span className="w-8 h-[1px] bg-[#D4AF37]" />
            </div>

            {/* Main Welcome Heading */}
            <h1 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.15] text-balance">
              {currentSlideIndex === 0 ? "Welcome to Madeena Dresses" : currentSlide.title}
            </h1>

            {/* Slide Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#FDE8EC]/90 font-light mb-8 max-w-xl leading-relaxed">
              {currentSlide.description}
            </p>

            {/* Interactive Call-to-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExploreCollection(currentSlide.targetCategory)}
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r from-[#B76E79] via-[#C58F96] to-[#D4AF37] text-[#2D0A12] font-semibold text-sm rounded-full shadow-lg hover:shadow-xl hover:brightness-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>{currentSlide.ctaText || "Explore Collection"}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onBookInquiry}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#FFFDF9] backdrop-blur-md border border-[#FAF8F5]/30 font-medium text-sm rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5]"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Custom Bridal Inquiry</span>
              </button>
            </div>

            {/* Slide Metadata Indicator & Accent */}
            <div className="mt-10 flex items-center gap-3 text-xs text-[#E6C2C7]/80">
              <span className="uppercase tracking-widest text-[#D4AF37] font-semibold">
                Edition {currentSlideIndex + 1} of {HERO_SLIDES.length}
              </span>
              <span>·</span>
              <span>{currentSlide.tagline}</span>
              <span>·</span>
              <span className="hidden sm:inline">{currentSlide.accent}</span>
            </div>
          </div>

          {/* Slider Arrow Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-colors focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-colors focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  idx === currentSlideIndex 
                    ? "w-8 bg-[#D4AF37]" 
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 4-Column Luxury Trust Strip (Mandated by Section 5 & E-Commerce guidelines) */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#7B1123] shrink-0 border border-[#B76E79]/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#4A0E17]">Authentic Royal Weaves</h4>
              <p className="text-[11px] sm:text-xs text-[#4A0E17]/70">Pure Zari, Silk & Fabrics</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#7B1123] shrink-0 border border-[#B76E79]/20">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#4A0E17]">Custom Boutique Tailoring</h4>
              <p className="text-[11px] sm:text-xs text-[#4A0E17]/70">Exact Measurements & Fits</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#7B1123] shrink-0 border border-[#B76E79]/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#4A0E17]">Worldwide Express Delivery</h4>
              <p className="text-[11px] sm:text-xs text-[#4A0E17]/70">Safe Doorstep Delivery</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3.5 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] flex items-center justify-center text-[#7B1123] shrink-0 border border-[#B76E79]/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#4A0E17]">Direct Boutique Support</h4>
              <p className="text-[11px] sm:text-xs text-[#4A0E17]/70">Video Call & Chat Consult</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
