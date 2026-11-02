import { Scissors, Sparkles, HeartHandshake, Award } from "lucide-react";
import { BOUTIQUE_DETAILS } from "../data/boutiqueData";

export default function BoutiqueStory() {
  return (
    <section id="craftsmanship" className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E6C2C7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid: Left Story Text & Right Heritage Visuals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#B76E79]" />
              <span className="font-cursive-flourish text-2xl text-[#B76E79]">Generations of Royal Grace</span>
              <span className="w-6 h-[1px] bg-[#B76E79]" />
            </div>

            <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0E17] leading-tight text-balance">
              Crafting Timeless Heirlooms for Every Woman
            </h2>

            <p className="text-sm sm:text-base text-[#4A0E17]/80 leading-relaxed font-light">
              Founded over {BOUTIQUE_DETAILS.experienceYears} years ago, <strong className="font-semibold text-[#4A0E17]">Madeena Dresses Home Boutique</strong> is dedicated to the preservation of authentic Indian and South Asian couture. We offer intimate, personalized styling, custom tailoring extended up to XXL, and handpicked designer pieces at direct home boutique pricing.
            </p>

            <p className="text-sm sm:text-base text-[#4A0E17]/80 leading-relaxed font-light">
              We work with traditional karigars (artisans) across Hyderabad, Lucknow, Kashmir, and Varanasi, ensuring our brides and patrons wear silhouettes that transcend ephemeral trends.
            </p>

            {/* Pillar Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-[#B76E79]/20 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#7B1123] flex items-center justify-center mb-3">
                  <Scissors className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#4A0E17] mb-1">Master Darzi Fitting</h4>
                <p className="text-xs text-[#4A0E17]/70 leading-relaxed">
                  Every order includes custom sizing adjustments and bridal blouse tailoring to your exact body measurements.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#B76E79]/20 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#7B1123] flex items-center justify-center mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[#4A0E17] mb-1">Authentic Materials</h4>
                <p className="text-xs text-[#4A0E17]/70 leading-relaxed">
                  Real gold-tested zari, 100/100 combed lawn, Korean breathable Nida, and pure handloom Katan silks.
                </p>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#B76E79]/20">
              <div>
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#4A0E17]">
                  {BOUTIQUE_DETAILS.happyBrides}
                </span>
                <p className="text-xs text-[#4A0E17]/65 uppercase tracking-wider font-medium mt-0.5">
                  Happy Patrons
                </p>
              </div>
              <div className="w-[1px] h-10 bg-[#B76E79]/30" />
              <div>
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#4A0E17]">
                  {BOUTIQUE_DETAILS.experienceYears}+
                </span>
                <p className="text-xs text-[#4A0E17]/65 uppercase tracking-wider font-medium mt-0.5">
                  Years of Excellence
                </p>
              </div>
              <div className="w-[1px] h-10 bg-[#B76E79]/30" />
              <div>
                <span className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-[#4A0E17]">
                  11
                </span>
                <p className="text-xs text-[#4A0E17]/65 uppercase tracking-wider font-medium mt-0.5">
                  Full Curated Lines
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-[#B76E79]/30 bg-[#2D0A12] aspect-[4/5]">
              <img
                src="/assets/images/hero_bridal_lehenga_1793507319785.jpg"
                alt="Madeena Dresses Royal Craftsmanship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-[0.9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#200508]/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#4A0E17] text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-serif-royal text-sm font-bold text-[#4A0E17]">
                      Bespoke Bridal Concierge
                    </h5>
                    <p className="text-xs text-[#4A0E17]/75">
                      Schedule a private video walk-through or in-boutique styling session.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Offset Frame */}
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-[#D4AF37]/40 -z-0 pointer-events-none hidden sm:block" />
          </div>

        </div>

      </div>
    </section>
  );
}
