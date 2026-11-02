/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import CategoriesShowcase from "./components/CategoriesShowcase";
import ProductCatalog from "./components/ProductCatalog";
import ProductDetailModal from "./components/ProductDetailModal";
import InquiryForm from "./components/InquiryForm";
import InquiryBagDrawer from "./components/InquiryBagDrawer";
import BoutiqueStory from "./components/BoutiqueStory";
import ReviewsSection from "./components/ReviewsSection";
import Footer from "./components/Footer";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import { Product, PRODUCTS_CATALOG } from "./data/boutiqueData";

export default function App() {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [preselectedInquiryProduct, setPreselectedInquiryProduct] = useState<Product | null>(null);
  const [preselectedInquirySize, setPreselectedInquirySize] = useState<string>("Custom Fit");
  const [bagItems, setBagItems] = useState<Product[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["lh-01", "ps-01"]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Handle Category selection from Hero or Category cards
  const handleSelectCategory = (slug?: string | null) => {
    setSelectedCategorySlug(slug || null);
    const catalogElement = document.getElementById("catalog");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle "Book / Order via Inquiry" from any product or quick view
  const handleBookInquiry = (product?: Product, size?: string) => {
    if (product) {
      setPreselectedInquiryProduct(product);
      if (size) setPreselectedInquirySize(size);
    }
    const inquiryElement = document.getElementById("inquiry");
    if (inquiryElement) {
      inquiryElement.scrollIntoView({ behavior: "smooth" });
    }
    showToast(`Inquiry form updated with ${product ? product.name : "your dress"}`);
  };

  // Add to inquiry bag
  const handleAddToBag = (product: Product, size?: string) => {
    setBagItems((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        showToast(`"${product.name}" is already in your inquiry bag`);
        return prev;
      }
      showToast(`Added "${product.name}" to your inquiry bag!`);
      return [...prev, product];
    });
  };

  // Remove from inquiry bag
  const handleRemoveFromBag = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from inquiry bag");
  };

  // Clear inquiry bag
  const handleClearBag = () => {
    setBagItems([]);
    showToast("Inquiry bag cleared");
  };

  // Toggle favorites
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from saved favorites");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to saved favorites!");
        return [...prev, productId];
      }
    });
  };

  // View favorites by setting filter
  const handleOpenFavorites = () => {
    const catalogElement = document.getElementById("catalog");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
    showToast(`Showing your ${favorites.length} saved royal favorites`);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D1A22] selection:bg-[#B76E79]/30 selection:text-[#4A0E17]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/40 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Header
        bagItems={bagItems}
        onOpenBag={() => setIsBagOpen(true)}
        onOpenInquiry={() => handleBookInquiry()}
        favoritesCount={favorites.length}
        onOpenFavorites={handleOpenFavorites}
      />

      {/* Hero Section with Banner Slider & Heroine Models */}
      <HeroSlider
        onExploreCollection={handleSelectCategory}
        onBookInquiry={() => handleBookInquiry(PRODUCTS_CATALOG[0])}
      />

      {/* Featured Categories Showcase (All 11 Categories) */}
      <CategoriesShowcase
        selectedCategorySlug={selectedCategorySlug}
        onSelectCategory={handleSelectCategory}
      />

      {/* Interactive Catalog / Product Viewer */}
      <ProductCatalog
        selectedCategorySlug={selectedCategorySlug}
        onSelectCategorySlug={setSelectedCategorySlug}
        onQuickView={(p) => setQuickViewProduct(p)}
        onBookInquiry={(p) => handleBookInquiry(p)}
        onAddToBag={(p) => handleAddToBag(p)}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Boutique Story & Artisanal Craftsmanship */}
      <BoutiqueStory />

      {/* Loved by Brides & Families Testimonials */}
      <ReviewsSection />

      {/* Customer Order & Inquiry Section (Direct to Email shabbirmohammad413@gmail.com) */}
      <InquiryForm
        preselectedProduct={preselectedInquiryProduct}
        preselectedSize={preselectedInquirySize}
        bagItems={bagItems}
      />

      {/* Footer & Boutique Contact Info */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenInquiry={() => handleBookInquiry()}
      />

      {/* Quick View Product Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onBookInquiry={(p, sz) => handleBookInquiry(p, sz)}
        onAddToBag={(p, sz) => handleAddToBag(p, sz)}
      />

      {/* Inquiry Bag Drawer */}
      <InquiryBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onRemoveItem={handleRemoveFromBag}
        onClearBag={handleClearBag}
        onProceedToInquiry={() => {
          setIsBagOpen(false);
          handleBookInquiry(bagItems[0]);
        }}
      />

      {/* Floating WhatsApp Quick-Chat Button */}
      <WhatsAppFloatingButton />

    </div>
  );
}
