import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Youtube, 
  ArrowUp,
  Heart
} from "lucide-react";
import { BOUTIQUE_DETAILS, BOUTIQUE_CATEGORIES } from "../data/boutiqueData";

interface FooterProps {
  onSelectCategory: (slug: string) => void;
  onOpenInquiry: () => void;
}

export default function Footer({ onSelectCategory, onOpenInquiry }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#200508] text-[#FFFDF9] pt-16 sm:pt-20 pb-12 border-t-2 border-[#D4AF37]/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B76E79] to-[#D4AF37] flex items-center justify-center text-[#200508] shadow-inner font-bold font-serif-royal text-lg">
                M
              </div>
              <div>
                <span className="font-serif-royal text-2xl font-bold tracking-tight text-white">
                  Madeena Dresses
                </span>
                <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">
                  Haute Ethnic Couture
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FDE8EC]/75 leading-relaxed font-light">
              Where Elegance Meets Tradition. Specializing in royal bridal lehengas, authentic Pakistani designer suits, pure handloom sarees, and modest abayas.
            </p>

            {/* WhatsApp Quick Chat Action */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${BOUTIQUE_DETAILS.whatsappNumber}?text=Hello%20Madeena%20Dresses,%20I%20would%20like%20to%20inquire%20about%20a%20dress`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl shadow transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {BOUTIQUE_DETAILS.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Categories Directory */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Boutique Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#FDE8EC]/80 font-light">
              {BOUTIQUE_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      const el = document.getElementById("catalog");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: More Collections & Bespoke */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Essential Lines
            </h4>
            <ul className="space-y-2 text-xs text-[#FDE8EC]/80 font-light">
              {BOUTIQUE_CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.slug);
                      const el = document.getElementById("catalog");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="hover:text-[#D4AF37] transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={onOpenInquiry}
                  className="text-[#D4AF37] hover:underline font-medium text-xs flex items-center gap-1"
                >
                  <span>Request Custom Tailoring</span>
                  <span>→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
              Madeena Home Boutique
            </h4>
            
            <div className="space-y-3 text-xs text-[#FDE8EC]/80 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{BOUTIQUE_DETAILS.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${BOUTIQUE_DETAILS.phone}`} className="hover:text-[#D4AF37] transition-colors font-medium">
                  {BOUTIQUE_DETAILS.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`mailto:${BOUTIQUE_DETAILS.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {BOUTIQUE_DETAILS.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">{BOUTIQUE_DETAILS.hours}</span>
              </div>
            </div>

            {/* Social handles */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#200508] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#200508] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#200508] flex items-center justify-center transition-colors text-white"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDE8EC]/60">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Madeena Dresses. All rights reserved.</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#B76E79] fill-current" /> for Timeless Royalty
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline focus:outline-none"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
