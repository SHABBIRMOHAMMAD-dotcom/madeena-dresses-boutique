import { useState } from "react";
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  MessageSquare, 
  Check, 
  ShieldCheck, 
  Ruler, 
  Truck
} from "lucide-react";
import { BOUTIQUE_DETAILS, Product } from "../data/boutiqueData";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBookInquiry: (product: Product, size?: string) => void;
  onAddToBag: (product: Product, size?: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onBookInquiry,
  onAddToBag
}: ProductDetailModalProps) {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || "Custom Fit");
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddBag = () => {
    onAddToBag(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Madeena Dresses! I am interested in inquiring about "${product.name}" (${product.category}) priced at ₹${product.price.toLocaleString("en-IN")}. Preferred size: ${selectedSize}. Please provide stitching and delivery availability.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#B76E79]/30 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#4A0E17] shadow-md transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Imagery */}
        <div className="md:w-1/2 relative bg-[#2D0A12] min-h-[340px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {product.badge && (
            <div className="absolute top-4 left-4 bg-[#4A0E17]/90 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider border border-[#D4AF37]/30 shadow">
              {product.badge}
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-black/40 p-3 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Authentic Handcrafted Piece from Madeena Dresses Vault</span>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category & Code */}
            <div className="flex items-center justify-between text-xs text-[#B76E79] font-medium tracking-wide">
              <span>{product.category}</span>
              <span className="font-mono">ID: {product.id.toUpperCase()}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#4A0E17] leading-tight">
              {product.name}
            </h2>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-mono tabular-nums text-2xl font-bold text-[#4A0E17]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="font-mono tabular-nums text-sm text-[#4A0E17]/50 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
              <span className="text-xs text-[#B76E79] font-medium ml-auto">
                Approx. ${(product.price / 85).toFixed(0)} USD
              </span>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#4A0E17]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Fabric & Embroidery Specs Grid */}
            <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#B76E79]/20 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#4A0E17]/70 font-medium">Fabric:</span>
                <span className="text-[#4A0E17] font-semibold text-right">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A0E17]/70 font-medium">Embroidery / Work:</span>
                <span className="text-[#4A0E17] font-semibold text-right">{product.work}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A0E17]/70 font-medium">Color Palette:</span>
                <span className="text-[#4A0E17] font-semibold text-right">{product.color}</span>
              </div>
            </div>

            {/* Sizes & Custom Tailoring */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-[#4A0E17] flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-[#B76E79]" />
                  <span>Select Size / Tailoring Option:</span>
                </label>
                <span className="text-[11px] text-[#B76E79] font-medium">Bespoke Fitting Available</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                      selectedSize === sz
                        ? "bg-[#4A0E17] text-[#D4AF37] font-semibold border border-[#D4AF37]/50 shadow"
                        : "bg-white text-[#4A0E17]/80 hover:bg-[#FFF0F3] border border-[#B76E79]/30"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Boutique Perks */}
            <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-[#4A0E17]/75">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>100% Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#25D366]" />
                <span>Insured Global Dispatch</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-[#B76E79]/20">
            {/* Book / Order via Inquiry */}
            <button
              onClick={() => {
                onBookInquiry(product, selectedSize);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#4A0E17] to-[#7B1123] hover:brightness-110 text-[#FFFDF9] text-xs sm:text-sm font-semibold rounded-xl shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Book / Order via Inquiry</span>
            </button>

            <div className="flex gap-2">
              {/* Add to Inquiry Bag */}
              <button
                onClick={handleAddBag}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-[#FFF0F3] text-[#4A0E17] border border-[#B76E79]/40 text-xs font-semibold rounded-xl transition-colors"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#B76E79]" />
                    <span>Add to Inquiry Bag</span>
                  </>
                )}
              </button>

              {/* Direct WhatsApp Instant Consultation */}
              <a
                href={`https://wa.me/${BOUTIQUE_DETAILS.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-[#128C7E] border border-emerald-200 rounded-xl transition-colors flex items-center justify-center"
                title="Direct WhatsApp Inquiry"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
