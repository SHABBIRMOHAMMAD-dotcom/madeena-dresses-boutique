import { X, Trash2, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { Product } from "../data/boutiqueData";

interface InquiryBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (id: string) => void;
  onClearBag: () => void;
  onProceedToInquiry: () => void;
}

export default function InquiryBagDrawer({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearBag,
  onProceedToInquiry
}: InquiryBagDrawerProps) {
  if (!isOpen) return null;

  const totalEstimate = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#B76E79]/30">
          
          {/* Drawer Header */}
          <div className="p-6 bg-[#FAF8F5] border-b border-[#B76E79]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B76E79]" />
              <h2 className="font-serif-royal text-xl font-bold text-[#4A0E17]">
                Inquiry Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#4A0E17] hover:bg-[#FFF0F3] rounded-full transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-[#4A0E17]/60 space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#B76E79]/40" />
                <p className="text-sm font-medium">Your inquiry bag is empty.</p>
                <p className="text-xs">Explore our royal collection and add dresses to inquire collectively.</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#FAF8F5] rounded-2xl border border-[#B76E79]/20"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#B76E79] font-semibold uppercase">
                        {item.categorySlug.replace("-", " ")}
                      </span>
                      <h4 className="font-serif-royal text-sm font-bold text-[#4A0E17] line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="font-mono tabular-nums text-xs font-bold text-[#4A0E17] mt-0.5">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-[#4A0E17]/60">Custom Stitching Ready</span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-rose-700 hover:text-rose-900 flex items-center gap-1"
                        title="Remove dress"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FAF8F5] border-t border-[#B76E79]/20 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4A0E17]/70 font-medium">Total Estimated Value:</span>
                <span className="font-mono tabular-nums text-lg font-bold text-[#4A0E17]">
                  ₹{totalEstimate.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => {
                  onProceedToInquiry();
                  onClose();
                }}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#4A0E17] to-[#7B1123] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Proceed to Book Inquiry with Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClearBag}
                className="w-full text-center text-xs text-[#4A0E17]/60 hover:text-rose-700"
              >
                Clear Inquiry Bag
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
