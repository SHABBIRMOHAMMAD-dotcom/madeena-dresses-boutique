import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Heart, 
  MessageSquare
} from "lucide-react";
import { BOUTIQUE_DETAILS, Product } from "../data/boutiqueData";

interface HeaderProps {
  bagItems: Product[];
  onOpenBag: () => void;
  onOpenInquiry: (product?: Product) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export default function Header({
  bagItems,
  onOpenBag,
  onOpenInquiry,
  favoritesCount,
  onOpenFavorites
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Royal Announcement Top Strip */}
      <div className="bg-[#4A0E17] text-[#FFF0F3] text-xs py-1.5 px-4 font-medium tracking-wide border-b border-[#B76E79]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-cursive-flourish text-base text-[#D4AF37]">Home Boutique</span>
            <span>Personalized Home Appointments & Orders · Open 10:00 AM – 10:00 PM All Days</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-[#FDE8EC]/90">
            <a 
              href={`https://wa.me/${BOUTIQUE_DETAILS.whatsappNumber}?text=Hello%20Madeena%20Dresses,%20I%20would%20like%20to%20inquire%20about%20your%20home%20boutique%20collection`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp Quick Chat: {BOUTIQUE_DETAILS.whatsappDisplay}</span>
            </a>
            <span className="text-[#B76E79]">|</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Phone: {BOUTIQUE_DETAILS.phoneDisplay}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Bar - Strict 3-zone contract */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/95 backdrop-blur-md shadow-md border-b border-[#B76E79]/20 py-3"
            : "bg-[#FAF8F5] border-b border-[#E6C2C7]/30 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single Text Element in Display Face) */}
            <a
              href="#"
              className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#4A0E17] to-[#7B1123] flex items-center justify-center text-[#D4AF37] shadow-inner border border-[#D4AF37]/40">
                <span className="font-serif-royal text-lg font-bold">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-royal text-2xl font-bold tracking-tight text-[#4A0E17] group-hover:text-[#7B1123] transition-colors">
                  Madeena Dresses
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B76E79] font-medium -mt-1">
                  Home Boutique & Couture
                </span>
              </div>
            </a>

            {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#4A0E17]/85">
              <a
                href="#categories"
                className="hover:text-[#7B1123] transition-colors relative py-1 hover:border-b-2 hover:border-[#B76E79] whitespace-nowrap shrink-0"
              >
                Categories
              </a>
              <a
                href="#catalog"
                className="hover:text-[#7B1123] transition-colors relative py-1 hover:border-b-2 hover:border-[#B76E79] whitespace-nowrap shrink-0"
              >
                Collection
              </a>
              <a
                href="#craftsmanship"
                className="hover:text-[#7B1123] transition-colors relative py-1 hover:border-b-2 hover:border-[#B76E79] whitespace-nowrap shrink-0"
              >
                Craft & Story
              </a>
              <a
                href="#inquiry"
                className="hover:text-[#7B1123] transition-colors relative py-1 hover:border-b-2 hover:border-[#B76E79] whitespace-nowrap shrink-0"
              >
                Order & Inquiry
              </a>
              <a
                href="#contact"
                className="hover:text-[#7B1123] transition-colors relative py-1 hover:border-b-2 hover:border-[#B76E79] whitespace-nowrap shrink-0"
              >
                Boutique Visit
              </a>
            </nav>

            {/* Zone 3: Primary Action & Utilities */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Favorites Wishlist Icon */}
              <button
                onClick={onOpenFavorites}
                className="relative p-2 text-[#4A0E17] hover:text-[#7B1123] hover:bg-[#FFF0F3] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
                aria-label="Wishlist"
                title="View Saved Favorites"
              >
                <Heart className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B76E79] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Inquiry Bag Button */}
              <button
                onClick={onOpenBag}
                className="relative p-2 text-[#4A0E17] hover:text-[#7B1123] hover:bg-[#FFF0F3] rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
                aria-label="Inquiry Bag"
                title="View Inquiry Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {bagItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4A0E17] text-[#D4AF37] text-[10px] font-bold rounded-full flex items-center justify-center border border-[#D4AF37]/50">
                    {bagItems.length}
                  </span>
                )}
              </button>

              {/* Primary Action Button */}
              <button
                onClick={() => onOpenInquiry()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase text-[#FFF0F3] bg-gradient-to-r from-[#4A0E17] to-[#5C1D27] hover:from-[#5C1D27] hover:to-[#7B1123] rounded-full shadow-md hover:shadow-lg transition-all duration-200 border border-[#B76E79]/40 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Book Inquiry</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#4A0E17] hover:bg-[#FFF0F3] rounded-lg transition-colors focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E6C2C7] px-6 py-5 shadow-lg transition-all">
            <div className="flex flex-col space-y-4">
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#4A0E17] hover:text-[#7B1123]"
              >
                Featured Categories
              </a>
              <a
                href="#catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#4A0E17] hover:text-[#7B1123]"
              >
                Explore Catalog & Dresses
              </a>
              <a
                href="#craftsmanship"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#4A0E17] hover:text-[#7B1123]"
              >
                Artisanal Craftsmanship
              </a>
              <a
                href="#inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#4A0E17] hover:text-[#7B1123]"
              >
                Order & Custom Stitching
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#4A0E17] hover:text-[#7B1123]"
              >
                Boutique Address & Contact
              </a>
              <div className="pt-3 border-t border-[#E6C2C7]/50 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-[#FFF0F3] bg-[#4A0E17] rounded-lg shadow"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Direct Inquiry</span>
                </button>
                <a
                  href={`https://wa.me/${BOUTIQUE_DETAILS.whatsappNumber}?text=Hello%20Madeena%20Dresses,%20I%20want%20to%20inquire%20about%20dresses`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#128C7E] bg-emerald-50 rounded-lg border border-emerald-200"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
