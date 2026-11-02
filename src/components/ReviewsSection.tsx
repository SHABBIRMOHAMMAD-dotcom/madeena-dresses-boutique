import { Star, Quote, Heart } from "lucide-react";
import { BOUTIQUE_REVIEWS } from "../data/boutiqueData";

export default function ReviewsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E6C2C7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#B76E79]" />
            <span className="font-cursive-flourish text-2xl text-[#B76E79]">Words of Adoration</span>
            <span className="w-6 h-[1px] bg-[#B76E79]" />
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-[#4A0E17] tracking-tight mb-3">
            Loved by Brides & Families Worldwide
          </h2>
          <p className="text-sm text-[#4A0E17]/70 font-normal">
            Real experiences from patrons who entrusted their most memorable celebrations to Madeena Dresses.
          </p>
        </div>

        {/* Reviews 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BOUTIQUE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#B76E79]/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#B76E79]/20 mb-2" />

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#4A0E17]/85 leading-relaxed font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-6 mt-6 border-t border-[#B76E79]/15 flex items-center justify-between">
                <div>
                  <h4 className="font-serif-royal text-base font-bold text-[#4A0E17]">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#B76E79] font-medium">
                    {rev.city} · {rev.occasion}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#B76E79]">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
