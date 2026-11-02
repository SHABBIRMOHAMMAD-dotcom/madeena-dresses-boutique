import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { BOUTIQUE_DETAILS } from "../data/boutiqueData";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = encodeURIComponent(
    "Hello Madeena Dresses! I am browsing your online boutique collection and would like personal assistance."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="mb-2 relative bg-white text-[#4A0E17] text-xs py-2 px-3.5 rounded-2xl shadow-xl border border-[#B76E79]/30 flex items-center gap-2 max-w-[240px] animate-bounce">
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 -ml-1"
            title="Dismiss"
          >
            <X className="w-3 h-3" />
          </button>
          <span>Quick Chat with Madeena Home Boutique: {BOUTIQUE_DETAILS.whatsappDisplay}</span>
        </div>
      )}

      {/* Main WhatsApp Action Button */}
      <a
        href={`https://wa.me/${BOUTIQUE_DETAILS.whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageSquare className="w-7 h-7" />
      </a>
    </div>
  );
}
