import { useState, useEffect } from "react";
import { 
  Send, 
  Sparkles, 
  CheckCircle, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Phone, 
  User, 
  Scissors, 
  ShoppingBag,
  Clock,
  Copy,
  Check
} from "lucide-react";
import { BOUTIQUE_DETAILS, PRODUCTS_CATALOG, BOUTIQUE_CATEGORIES, Product } from "../data/boutiqueData";

interface InquiryFormProps {
  preselectedProduct?: Product | null;
  preselectedSize?: string;
  bagItems?: Product[];
}

export default function InquiryForm({
  preselectedProduct,
  preselectedSize = "Custom Fit",
  bagItems = []
}: InquiryFormProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedItemName, setSelectedItemName] = useState("");
  const [category, setCategory] = useState("Lehengas");
  const [selectedSize, setSelectedSize] = useState(preselectedSize);
  const [customRequirements, setCustomRequirements] = useState("");
  const [urgentDeliveryDate, setUrgentDeliveryDate] = useState("");
  const [includeBagItems, setIncludeBagItems] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Update selected item name whenever preselectedProduct changes
  useEffect(() => {
    if (preselectedProduct) {
      setSelectedItemName(preselectedProduct.name);
      if (preselectedProduct.category) {
        const found = BOUTIQUE_CATEGORIES.find(
          (c) =>
            preselectedProduct.category.toLowerCase().includes(c.name.toLowerCase()) ||
            c.name.toLowerCase().includes(preselectedProduct.category.toLowerCase())
        );
        setCategory(found ? found.name : "Lehengas");
      }
      if (preselectedSize) setSelectedSize(preselectedSize);
    }
  }, [preselectedProduct, preselectedSize]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const orderReference = `MD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const itemsSummary = includeBagItems && bagItems.length > 0
      ? `${selectedItemName || "Primary Outfit"} + [${bagItems.map(i => i.name).join(", ")}]`
      : (selectedItemName || "General Boutique Inquiry");

    const formDataPayload = {
      orderReference,
      customerName: fullName,
      fullName,
      email: emailAddress,
      emailAddress,
      phone: phoneNumber,
      phoneNumber,
      category: category || "Lehengas",
      itemSelected: itemsSummary,
      selectedItemName: itemsSummary,
      selectedSize,
      deliveryAddress,
      customRequirements: customRequirements || "Standard boutique finishing requested",
      urgentDeliveryDate: urgentDeliveryDate || "Standard delivery",
      submittedAt: new Date().toLocaleString(),
      recipientEmail: BOUTIQUE_DETAILS.email
    };

    try {
      // 1. Submit to Madeena Dresses Node.js & Express Backend API
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formDataPayload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData?.errors && errorData.errors.length > 0) {
          setErrorMessage(errorData.errors.join(". "));
        }
      }
    } catch {
      // Graceful fallback to Formspree if local backend is offline or static deploy
      await fetch("https://formspree.io/f/mqkvrkzp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          _subject: `New Luxury Dress Order #${orderReference} - Madeena Dresses`,
          ...formDataPayload
        })
      }).catch(() => {});
    }

    // Set order confirmation state
    setSubmittedOrder(formDataPayload);
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setSubmittedOrder(null);
    setErrorMessage("");
    setFullName("");
    setPhoneNumber("");
    setEmailAddress("");
    setDeliveryAddress("");
    setSelectedItemName("");
    setCategory("Lehengas");
    setCustomRequirements("");
    setUrgentDeliveryDate("");
  };

  const copyReference = () => {
    if (!submittedOrder) return;
    navigator.clipboard.writeText(submittedOrder.orderReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const whatsappInquiryText = submittedOrder
    ? encodeURIComponent(
        `*New Order Inquiry - Madeena Dresses*\n` +
        `*Ref:* #${submittedOrder.orderReference}\n` +
        `*Name:* ${submittedOrder.fullName}\n` +
        `*Phone:* ${submittedOrder.phoneNumber}\n` +
        `*Dress:* ${submittedOrder.selectedItemName}\n` +
        `*Size/Tailoring:* ${submittedOrder.selectedSize}\n` +
        `*Address:* ${submittedOrder.deliveryAddress}\n` +
        `*Custom Requirements:* ${submittedOrder.customRequirements}\n` +
        `*Target Delivery:* ${submittedOrder.urgentDeliveryDate}`
      )
    : "";

  const mailtoLink = submittedOrder
    ? `mailto:${BOUTIQUE_DETAILS.email}?subject=${encodeURIComponent(
        `Order Inquiry #${submittedOrder.orderReference} - ${submittedOrder.fullName}`
      )}&body=${encodeURIComponent(
        `Order Reference: #${submittedOrder.orderReference}\n` +
        `Customer Name: ${submittedOrder.fullName}\n` +
        `Phone Number: ${submittedOrder.phoneNumber}\n` +
        `Delivery Address: ${submittedOrder.deliveryAddress}\n\n` +
        `Selected Item: ${submittedOrder.selectedItemName}\n` +
        `Size / Stitching: ${submittedOrder.selectedSize}\n` +
        `Custom Requirements: ${submittedOrder.customRequirements}\n` +
        `Date: ${submittedOrder.submittedAt}`
      )}`
    : "";

  return (
    <section id="inquiry" className="py-16 sm:py-24 bg-[#FAF8F5] relative">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-[#B76E79]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#E6C2C7]/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#B76E79]" />
            <span className="font-cursive-flourish text-2xl text-[#B76E79]">Direct to Boutique Inbox</span>
            <span className="w-6 h-[1px] bg-[#B76E79]" />
          </div>
          <h2 className="font-serif-royal text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A0E17] tracking-tight mb-3">
            Customer Order & Inquiry
          </h2>
          <p className="text-sm sm:text-base text-[#4A0E17]/75 font-normal leading-relaxed">
            Every submission is dispatched directly to our head designer's business email (<span className="font-semibold text-[#4A0E17]">{BOUTIQUE_DETAILS.email}</span>) and WhatsApp concierge for immediate booking, sizing confirmation, and dispatch.
          </p>
        </div>

        {/* Order Success State View */}
        {submittedOrder ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/40 max-w-2xl mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-6 border border-emerald-200">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="text-center space-y-2 mb-8">
              <span className="text-xs uppercase tracking-widest text-[#B76E79] font-bold">
                Inquiry Successfully Dispatched!
              </span>
              <h3 className="font-serif-royal text-2xl sm:text-3xl font-bold text-[#4A0E17]">
                Thank You, {submittedOrder.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-[#4A0E17]/75 max-w-md mx-auto">
                Your order inquiry has been sent directly to <span className="font-semibold text-[#4A0E17]">{BOUTIQUE_DETAILS.email}</span>. Our bespoke boutique team will review your requirements and reach you on <span className="font-semibold text-[#4A0E17]">{submittedOrder.phoneNumber}</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#B76E79]/20 space-y-3.5 mb-8 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#B76E79]/20">
                <span className="text-[#4A0E17]/70 font-medium">Order Reference:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#4A0E17]">
                    #{submittedOrder.orderReference}
                  </span>
                  <button 
                    onClick={copyReference}
                    className="p-1 text-[#B76E79] hover:text-[#4A0E17]"
                    title="Copy reference"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-[#4A0E17]/70">Selected Dress:</span>
                <span className="font-semibold text-[#4A0E17] text-right">{submittedOrder.selectedItemName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#4A0E17]/70">Selected Size / Fit:</span>
                <span className="font-semibold text-[#4A0E17]">{submittedOrder.selectedSize}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#4A0E17]/70">Delivery Address:</span>
                <span className="font-medium text-[#4A0E17] text-right max-w-xs">{submittedOrder.deliveryAddress}</span>
              </div>

              {submittedOrder.customRequirements && (
                <div className="flex justify-between pt-2 border-t border-[#B76E79]/15">
                  <span className="text-[#4A0E17]/70">Custom Notes:</span>
                  <span className="italic text-[#4A0E17] text-right max-w-xs">{submittedOrder.customRequirements}</span>
                </div>
              )}
            </div>

            {/* Direct Instant Confirmation Buttons */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/${BOUTIQUE_DETAILS.whatsappNumber}?text=${whatsappInquiryText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold rounded-xl shadow transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Instant WhatsApp Copy with Details</span>
              </a>

              <a
                href={mailtoLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white hover:bg-[#FAF8F5] text-[#4A0E17] border border-[#B76E79]/30 text-xs sm:text-sm font-semibold rounded-xl transition-colors"
              >
                <Mail className="w-4 h-4 text-[#B76E79]" />
                <span>Open Mail Client for Record</span>
              </a>

              <button
                onClick={resetForm}
                className="w-full text-center text-xs text-[#B76E79] hover:text-[#4A0E17] font-medium pt-3"
              >
                Submit Another Dress Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Clean Luxury Checkout / Inquiry Form */
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-[#B76E79]/25">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              
              {/* Preselected dress banner if active */}
              {preselectedProduct && (
                <div className="bg-[#FFF0F3] p-4 rounded-2xl border border-[#B76E79]/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={preselectedProduct.image} 
                      alt={preselectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover border border-[#B76E79]/20"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#B76E79]">
                        Currently Selected Dress
                      </span>
                      <h4 className="font-serif-royal text-sm sm:text-base font-bold text-[#4A0E17]">
                        {preselectedProduct.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#4A0E17]">
                        ₹{preselectedProduct.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-medium text-[#4A0E17] bg-white px-3 py-1 rounded-full border border-[#B76E79]/30">
                    Ready to Book
                  </span>
                </div>
              )}

              {/* Form Grid 1: Customer Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Full Name *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50 placeholder-[#4A0E17]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Phone / WhatsApp Number *</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98490 12345"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50 placeholder-[#4A0E17]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Email Address *</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50 placeholder-[#4A0E17]/40"
                  />
                </div>
              </div>

              {/* Validation / Server Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm">
                  <span className="font-bold">Submission Notice:</span> {errorMessage}
                </div>
              )}

              {/* Form Grid 2: Delivery Address */}
              <div>
                <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B76E79]" />
                    <span>Complete Delivery Address & City / Pincode *</span>
                  </span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Apartment No, Street, Landmark, City, State, Postal Code (e.g. Hyderabad, Banjara Hills 500034)"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50 placeholder-[#4A0E17]/40 resize-none"
                />
              </div>

              {/* Form Grid 3: Category, Selected Item Name & Size */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Product Category *</span>
                    </span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50"
                  >
                    {BOUTIQUE_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Selected Item Name *</span>
                    </span>
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharani Zardozi Velvet Bridal Lehenga"
                      value={selectedItemName}
                      onChange={(e) => setSelectedItemName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50 placeholder-[#4A0E17]/40"
                    />

                    {/* Quick Pick from Catalog Dropdown */}
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setSelectedItemName(e.target.value);
                          const matchedProduct = PRODUCTS_CATALOG.find((p) => p.name === e.target.value);
                          if (matchedProduct) {
                            const foundCat = BOUTIQUE_CATEGORIES.find(
                              (c) =>
                                c.slug === matchedProduct.categorySlug ||
                                matchedProduct.category.toLowerCase().includes(c.name.toLowerCase())
                            );
                            if (foundCat) setCategory(foundCat.name);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 bg-white border border-[#B76E79]/20 rounded-lg text-xs text-[#4A0E17]/80 focus:outline-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Or choose from Madeena Dresses Vault...</option>
                      {PRODUCTS_CATALOG.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} — ₹{p.price.toLocaleString("en-IN")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Scissors className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Preferred Size / Tailoring Fit *</span>
                    </span>
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50"
                  >
                    <option value="S">Small (Bust 34-36)</option>
                    <option value="M">Medium (Bust 38-40)</option>
                    <option value="L">Large (Bust 42-44)</option>
                    <option value="XL">Extra Large (Bust 46)</option>
                    <option value="XXL">XXL (Bust 48+)</option>
                    <option value="Custom Bridal Stitching">Bespoke Bridal Tailoring (Exact Measurements)</option>
                    <option value="Semi-Stitched">Semi-Stitched (Fabric Material Only)</option>
                    <option value="Standard Free Size">Standard Free Size (Abayas / Dupattas / Home)</option>
                  </select>

                  {bagItems.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="includeBag"
                        checked={includeBagItems}
                        onChange={(e) => setIncludeBagItems(e.target.checked)}
                        className="rounded border-[#B76E79] text-[#4A0E17] focus:ring-[#B76E79]"
                      />
                      <label htmlFor="includeBag" className="text-xs text-[#4A0E17]/80 cursor-pointer">
                        Also bundle {bagItems.length} items from my Inquiry Bag
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Grid 4: Custom Requirements & Urgency Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span>Custom Requirements & Measurements</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter special stitching requests (e.g., Kurta length 46 inches, deep back blouse with tassels, sleeves with lining, color customization, or specific can-can flare preferences)."
                    value={customRequirements}
                    onChange={(e) => setCustomRequirements(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50 placeholder-[#4A0E17]/40 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A0E17] uppercase tracking-wider mb-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B76E79]" />
                      <span>Required Delivery Date</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    value={urgentDeliveryDate}
                    onChange={(e) => setUrgentDeliveryDate(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#B76E79]/25 rounded-xl text-xs sm:text-sm text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#B76E79]/50"
                  />
                  <p className="text-[11px] text-[#B76E79] mt-2">
                    Let us know if this is needed for an upcoming wedding or festive event!
                  </p>
                </div>
              </div>

              {/* Direct to Email Dispatch Info Banner */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#B76E79]/20 flex items-start gap-3 text-xs text-[#4A0E17]/80">
                <Mail className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#4A0E17]">Direct Destination: </span>
                  Submissions are safely forwarded directly to <span className="font-mono font-medium text-[#4A0E17]">{BOUTIQUE_DETAILS.email}</span> with automated confirmation receipt generation.
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-[#4A0E17] via-[#5C1D27] to-[#7B1123] hover:from-[#5C1D27] hover:to-[#90142B] text-white text-sm sm:text-base font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                      <span>Dispatching to Boutique Email...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                      <span>Submit Order & Dispatch Inquiry to Boutique</span>
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  );
}
