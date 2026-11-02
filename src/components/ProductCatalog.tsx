import { useState, useMemo } from "react";
import { 
  Search, 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Heart, 
  Eye, 
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { BOUTIQUE_CATEGORIES, PRODUCTS_CATALOG, Product } from "../data/boutiqueData";

interface ProductCatalogProps {
  selectedCategorySlug: string | null;
  onSelectCategorySlug: (slug: string | null) => void;
  onQuickView: (product: Product) => void;
  onBookInquiry: (product: Product) => void;
  onAddToBag: (product: Product) => void;
  favorites: string[];
  onToggleFavorite: (productId: string) => void;
}

export default function ProductCatalog({
  selectedCategorySlug,
  onSelectCategorySlug,
  onQuickView,
  onBookInquiry,
  onAddToBag,
  favorites,
  onToggleFavorite
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return PRODUCTS_CATALOG.filter((item) => {
      // Category filter
      if (selectedCategorySlug && item.categorySlug !== selectedCategorySlug) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesFabric = item.fabric.toLowerCase().includes(query);
        const matchesWork = item.work.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesWork && !matchesCategory) {
          return false;
        }
      }

      // Price filter
      if (priceFilter === "1k-special" && item.price !== 1000) return false;
      if (priceFilter === "under-2k" && item.price >= 2000) return false;
      if (priceFilter === "2k-3k" && (item.price < 2000 || item.price >= 3000)) return false;
      if (priceFilter === "3k-special" && item.price !== 3000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "best-sellers") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategorySlug, searchQuery, priceFilter, sortBy]);

  const activeCategoryObject = BOUTIQUE_CATEGORIES.find((c) => c.slug === selectedCategorySlug);

  return (
    <section id="catalog" className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-[#E6C2C7]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#B76E79]/20">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="font-cursive-flourish text-2xl text-[#B76E79]">Exclusive Catalog</span>
            </div>
            <h2 className="font-serif-royal text-3xl sm:text-4xl font-bold text-[#4A0E17] tracking-tight">
              {activeCategoryObject ? activeCategoryObject.name : "All Boutique Creations"}
            </h2>
            <p className="text-sm text-[#4A0E17]/70 mt-1 max-w-xl">
              {activeCategoryObject 
                ? activeCategoryObject.description 
                : "Browse authentic bridal lehengas, Pakistani chiffon suits, anarkalis, modest abayas, sarees and home essentials."}
            </p>
          </div>

          {/* Quick search input */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#B76E79] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search zari, silk, chiffon, bridal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs bg-white rounded-full border border-[#B76E79]/30 focus:outline-none focus:ring-2 focus:ring-[#B76E79]/40 text-[#4A0E17] placeholder-[#4A0E17]/40 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden p-2 bg-white rounded-full border border-[#B76E79]/30 text-[#4A0E17] shadow-sm flex items-center justify-center"
              aria-label="Filter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Horizontal Filter Bar (Interactive Segmented Tabs) */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <button
              onClick={() => onSelectCategorySlug(null)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                selectedCategorySlug === null
                  ? "bg-[#4A0E17] text-[#D4AF37] shadow-md border border-[#D4AF37]/50"
                  : "bg-white text-[#4A0E17]/80 hover:bg-[#FFF0F3] border border-[#B76E79]/20"
              }`}
            >
              All Collections ({PRODUCTS_CATALOG.length})
            </button>
            {BOUTIQUE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategorySlug(cat.slug)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 ${
                  selectedCategorySlug === cat.slug
                    ? "bg-[#4A0E17] text-[#D4AF37] shadow-md border border-[#D4AF37]/50"
                    : "bg-white text-[#4A0E17]/80 hover:bg-[#FFF0F3] border border-[#B76E79]/20"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter & Sort Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#FFF0F3]/50 p-3.5 rounded-2xl border border-[#B76E79]/15">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-[#4A0E17]">Price Range:</span>
            {[
              { id: "all", label: "All Prices" },
              { id: "1k-special", label: "₹1,000 Special (Punjabi Suits)" },
              { id: "3k-special", label: "₹3,000 Special Edit" },
              { id: "2k-3k", label: "₹2,000 – ₹2,999" },
              { id: "under-2k", label: "Under ₹2,000" }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPriceFilter(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors whitespace-nowrap ${
                  priceFilter === p.id
                    ? "bg-[#4A0E17] text-white font-medium shadow-sm"
                    : "text-[#4A0E17]/80 hover:text-[#4A0E17] hover:bg-white"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold text-[#4A0E17] whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#B76E79]/25 rounded-lg px-3 py-1.5 text-xs text-[#4A0E17] focus:outline-none focus:ring-1 focus:ring-[#B76E79]"
            >
              <option value="featured">Featured First</option>
              <option value="best-sellers">Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#B76E79]/20 p-8 max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF0F3] flex items-center justify-center text-[#B76E79]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif-royal text-2xl font-bold text-[#4A0E17] mb-2">No Matching Outfits Found</h3>
            <p className="text-sm text-[#4A0E17]/70 mb-6">
              Try adjusting your search keywords, clear the price filters, or select another category.
            </p>
            <button
              onClick={() => {
                onSelectCategorySlug(null);
                setSearchQuery("");
                setPriceFilter("all");
              }}
              className="px-6 py-2.5 bg-[#4A0E17] text-[#D4AF37] text-xs font-semibold rounded-full shadow hover:bg-[#5C1D27] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-[#B76E79]/20 hover:border-[#B76E79]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Block: 70% height with subtle hover zoom */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#4A0E17]/90 backdrop-blur-md text-[#D4AF37] text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase border border-[#D4AF37]/30">
                        {product.badge}
                      </div>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                        isFavorite 
                          ? "bg-[#B76E79] text-white shadow-md" 
                          : "bg-white/80 text-[#4A0E17] hover:bg-white hover:text-[#B76E79]"
                      }`}
                      aria-label="Save to favorites"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                    </button>

                    {/* Quick View Button Hover Overlay */}
                    <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => onQuickView(product)}
                        className="flex-1 py-2.5 bg-white/95 hover:bg-white text-[#4A0E17] text-xs font-semibold rounded-xl shadow-lg backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#B76E79]" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => onAddToBag(product)}
                        className="p-2.5 bg-[#4A0E17] hover:bg-[#5C1D27] text-[#D4AF37] rounded-xl shadow-lg transition-colors"
                        title="Add to Inquiry Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content & Details */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Quiet Unboxed Category Text */}
                      <div className="flex items-center gap-2 text-xs text-[#B76E79] font-medium uppercase tracking-wider mb-1.5">
                        <span>{product.categorySlug.replace("-", " ")}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.fabric.split(" ")[0]}</span>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onQuickView(product)}
                        className="font-serif-royal text-base sm:text-lg font-bold text-[#4A0E17] line-clamp-1 group-hover:text-[#7B1123] transition-colors cursor-pointer"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      {/* Fabric & Work snippet */}
                      <p className="text-xs text-[#4A0E17]/65 line-clamp-1 mt-1">
                        {product.work}
                      </p>

                      {/* Price in Tabular figures */}
                      <div className="mt-3 flex items-baseline gap-2.5">
                        <span className="font-mono tabular-nums text-lg font-bold text-[#4A0E17]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        {product.originalPrice && (
                          <span className="font-mono tabular-nums text-xs text-[#4A0E17]/40 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                        <span className="text-[11px] text-[#B76E79] font-medium ml-auto">
                          ≈ ${(product.price / 85).toFixed(0)} USD
                        </span>
                      </div>
                    </div>

                    {/* Interactive "Book / Order via Inquiry" Button */}
                    <div className="mt-5 pt-3 border-t border-[#E6C2C7]/30 flex items-center gap-2">
                      <button
                        onClick={() => onBookInquiry(product)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#4A0E17] to-[#5C1D27] hover:from-[#5C1D27] hover:to-[#7B1123] text-[#FFFDF9] text-xs font-semibold rounded-xl shadow transition-all duration-200 group-hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Book / Order via Inquiry</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1 text-[#D4AF37]" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
