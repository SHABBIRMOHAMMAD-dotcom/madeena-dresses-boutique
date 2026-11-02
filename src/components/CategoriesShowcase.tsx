import { ArrowUpRight, Sparkles } from "lucide-react";
import { BOUTIQUE_CATEGORIES, Category } from "../data/boutiqueData";

interface CategoriesShowcaseProps {
  selectedCategorySlug: string | null;
  onSelectCategory: (slug: string) => void;
}

export default function CategoriesShowcase({
  selectedCategorySlug,
  onSelectCategory,
}: CategoriesShowcaseProps) {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#B76E79]" />
            <span className="font-cursive-flourish text-2xl text-[#B76E79]">Curated Royal Silhouettes</span>
            <span className="w-6 h-[1px] bg-[#B76E79]" />
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0E17] tracking-tight mb-4 text-balance">
            Featured Categories Showcase
          </h2>
          <p className="text-sm sm:text-base text-[#4A0E17]/75 font-normal leading-relaxed">
            From regal bridal lehengas and Pakistani heavy lawn suits to breathable cottons, modest abayas, and luxurious home essentials. Handcrafted with generational artistry.
          </p>
        </div>

        {/* 11 Categories Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {BOUTIQUE_CATEGORIES.map((cat: Category, index: number) => {
            const isSelected = selectedCategorySlug === cat.slug;
            // First 2 prominent categories can span 2 columns on medium screens for dynamic visual rhythm
            const isWide = index === 0 || index === 1;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-xl"
                    : "border-[#B76E79]/20 hover:border-[#B76E79]/60 shadow-md hover:shadow-xl"
                } ${isWide ? "sm:col-span-2 lg:col-span-2" : "col-span-1"}`}
                style={{ minHeight: isWide ? "340px" : "300px" }}
              >
                {/* Image Container with Smooth Hover Zoom */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#2D0A12]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-[0.92]"
                  />
                  {/* Rose gold & Maroon overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200508] via-[#200508]/60 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />
                  
                  {/* Subtle glowing border on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#D4AF37]/40 rounded-2xl transition-colors pointer-events-none" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
                  {/* Top Bar inside Card: Unboxed metadata */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-[#FDE8EC]/80 font-medium">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true">·</span>
                      <span>{cat.itemCount} Designs</span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-[#2D0A12] transition-colors">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Bottom Bar inside Card */}
                  <div className="space-y-1.5">
                    <p className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                      {cat.subtitle}
                    </p>
                    <h3 className="font-serif-royal text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#FFFDF9] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#FDE8EC]/80 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#D4AF37] group-hover:underline">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Explore {cat.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
