export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  fabric: string;
  work: string;
  color: string;
  sizes: string[];
  description: string;
  image: string;
  badge?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  accentColor: string;
  itemCount: number;
}

export const HERO_SLIDES = [
  {
    id: "slide-1",
    title: "Welcome to Madeena Dresses Home Boutique",
    subtitle: "Where Elegance Meets Tradition",
    description: "Welcome to our exclusive home boutique. Discover royal bridal lehengas, Pakistani suits, and designer ethnic wear handcrafted with love and custom tailored at welcoming prices.",
    ctaText: "Explore Collection",
    tagline: "Home Boutique Exclusive",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    accent: "Rose Gold & Velvet Maroon",
    targetCategory: "lehengas"
  },
  {
    id: "slide-2",
    title: "Pakistani Designer Suits",
    subtitle: "Chiffon & Luxury Lawn Poetry",
    description: "Breathtaking heavy threadwork, intricate cutwork borders, and flowing feather-light dupattas available right at our home boutique with personalized fittings.",
    ctaText: "View Designer Suits",
    tagline: "Festive Home Collection",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    accent: "Emerald Green & Dusty Blush",
    targetCategory: "ladies-pakistani-suits"
  },
  {
    id: "slide-3",
    title: "The Regal Anarkali Gown",
    subtitle: "360-Degree Swirl of Heritage",
    description: "Flared silhouettes adorned with micro-sequins, zari florets, and delicate georgette draping made for unforgettable celebrations.",
    ctaText: "Discover Anarkalis",
    tagline: "Pure Artisanal Opulence",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    accent: "Ivory White & Antique Gold",
    targetCategory: "anarkalis-long-frogs"
  },
  {
    id: "slide-4",
    title: "Heritage Banarasi Sarees",
    subtitle: "Woven in Pure Gold & Silk",
    description: "Authentic handloom silks, intricate temple borders, and opulent pallus that pass down royal grace through generations.",
    ctaText: "Shop Sarees",
    tagline: "Handcrafted Heritage",
    image: "/assets/images/category_designer_saree_1793507321323.jpg",
    accent: "Crimson Maroon & Warm Gold",
    targetCategory: "sarees"
  },
  {
    id: "slide-5",
    title: "Dubai Modest Abayas & Burqas",
    subtitle: "Graceful Elegance & Luxury Fabrics",
    description: "Finest Nida fabric, delicate French lace trimmings, and refined rose gold accents tailored for sophisticated modest fashion.",
    ctaText: "Explore Modest Wear",
    tagline: "Modern Modesty",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    accent: "Jet Black & Rose Gilded Lace",
    targetCategory: "burqas-abayas"
  }
];

export const BOUTIQUE_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    slug: "lehengas",
    name: "Lehengas",
    subtitle: "Bridal & Festive Royale",
    description: "Zardozi, gotapatti, sequins & raw silk grand lehengas crafted for brides and festive celebrations.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    accentColor: "from-rose-900/80 to-amber-950/90",
    itemCount: 42
  },
  {
    id: "cat-2",
    slug: "ladies-pakistani-suits",
    name: "Ladies Pakistani Suits",
    subtitle: "Designer Lawn & Heavy Chiffon",
    description: "Intricate neckline embroidery, organza cutwork, and digital printed luxury lawn with heavy chiffon dupattas.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    accentColor: "from-emerald-950/80 to-rose-950/90",
    itemCount: 38
  },
  {
    id: "cat-3",
    slug: "anarkalis-long-frogs",
    name: "Long Frocks & Anarkalis",
    subtitle: "Floor-Length Regal Gowns",
    description: "Majestic kalis, heavy can-can flares, and exquisite mirror & pearl embellishments.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    accentColor: "from-amber-900/80 to-rose-950/90",
    itemCount: 29
  },
  {
    id: "cat-4",
    slug: "sarees",
    name: "Sarees",
    subtitle: "Traditional & Designer Drapes",
    description: "Pure Kanjeevaram, Banarasi Silk, Georgette ruffled cocktail sarees, and Organza hand-painted drapes.",
    image: "/assets/images/category_designer_saree_1793507321323.jpg",
    accentColor: "from-rose-950/80 to-stone-900/90",
    itemCount: 46
  },
  {
    id: "cat-5",
    slug: "burqas-abayas",
    name: "Burqas & Abayas",
    subtitle: "Modest Luxury & Designer Cuts",
    description: "Breathable Korean Nida, Front-open kimonos, butterfly cuts, and embroidered evening abayas.",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    accentColor: "from-neutral-950/85 to-rose-950/80",
    itemCount: 31
  },
  {
    id: "cat-6",
    slug: "scarfs-chunies",
    name: "Scarfs & Chunies",
    subtitle: "Designer Dupattas & Stoles",
    description: "Banarasi brocade dupattas, Phulkari chunies, velvet zardozi shawls, and featherlight modal stoles.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    accentColor: "from-pink-950/80 to-rose-900/80",
    itemCount: 24
  },
  {
    id: "cat-7",
    slug: "cotton-dresses",
    name: "Cotton Dresses",
    subtitle: "Daily & Comfort Wear",
    description: "100% pure Mulmul and Cambric cotton breathable kurtis, co-ord sets, and soothing daily casuals.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    accentColor: "from-stone-900/80 to-rose-950/80",
    itemCount: 35
  },
  {
    id: "cat-8",
    slug: "party-wear",
    name: "Party Wear Dresses",
    subtitle: "Glitzy Evening & Reception Silhouettes",
    description: "Sequin jacket sets, draped Indo-western gowns, peplum shararas, and cocktail ensembles.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    accentColor: "from-purple-950/80 to-rose-950/90",
    itemCount: 27
  },
  {
    id: "cat-9",
    slug: "punjabi-dresses",
    name: "Punjabi Dresses",
    subtitle: "Patiala & Salwar Suits",
    description: "Authentic flared Patiala salwars, embroidered short kurtis, mirror work dupattas, and festive suits.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    accentColor: "from-red-950/80 to-amber-950/90",
    itemCount: 22
  },
  {
    id: "cat-10",
    slug: "tops-leggings",
    name: "Tops & Leggings",
    subtitle: "Contemporary Ethnic & Everyday Bottoms",
    description: "4-way stretch churidar leggings, palazzo pants, silk cigarette pants, and stylish short fusion tops.",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    accentColor: "from-rose-950/80 to-slate-950/80",
    itemCount: 19
  },
  {
    id: "cat-11",
    slug: "home-essentials",
    name: "Home Essentials",
    subtitle: "Door Curtains & Luxury Bed Sheets",
    description: "Jacquard blackout door curtains, velvet royal bedsheets with pillow shams, and traditional diwan sets.",
    image: "/assets/images/category_designer_saree_1793507321323.jpg",
    accentColor: "from-amber-950/80 to-stone-900/90",
    itemCount: 16
  }
];

export const PRODUCTS_CATALOG: Product[] = [
  // 1. Lehengas
  {
    id: "lh-01",
    name: "Maharani Zardozi Velvet Bridal Lehenga",
    category: "Lehengas (Bridal & Festive)",
    categorySlug: "lehengas",
    price: 3000,
    originalPrice: 4500,
    fabric: "Royal Micro Velvet & Soft French Net",
    work: "Pure Copper Zardozi, Resham Threadwork & Hand Mukaish",
    color: "Deep Maroon & Rose Gold",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom Bridal Stitching"],
    description: "An heirloom masterpiece designed for the royal bride. Features an opulent circular flare with double can-can layer, accompanied by a heavily embellished sweetheart blouse and dual dupattas.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "lh-02",
    name: "Noor-E-Chashm Blush Pink Floral Lehenga",
    category: "Lehengas (Bridal & Festive)",
    categorySlug: "lehengas",
    price: 3000,
    originalPrice: 4200,
    fabric: "Raw Silk & Organza Silk",
    work: "Cutdana, Pearls, and Rose Gold Gota Patti",
    color: "Soft Blush Pink & Ivory",
    sizes: ["S", "M", "L", "XL", "XXL", "Semi-Stitched"],
    description: "Romantic pastel beauty featuring cascading floral motifs in rose gold thread, sparkling crystal sequins, and a featherlight embroidered organza dupatta.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    inStock: true
  },
  {
    id: "lh-03",
    name: "Rani Bagh Emerald Green Heritage Lehenga",
    category: "Lehengas (Bridal & Festive)",
    categorySlug: "lehengas",
    price: 2900,
    originalPrice: 3800,
    fabric: "Banarasi Brocade & Silk Georgette",
    work: "Antique Gold Weaving & Zari Border",
    color: "Imperial Emerald & Gold",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom Fit"],
    description: "Regal jewel-tone silhouette woven with authentic Mughal motifs. Perfect for Sangeet, Mehendi, and festive celebrations.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    badge: "Festive Edit",
    isFeatured: false,
    inStock: true
  },

  // 2. Ladies Pakistani Suits
  {
    id: "ps-01",
    name: "Sultana Embroidered Chiffon 3-Piece Suit",
    category: "Ladies Pakistani Suits",
    categorySlug: "ladies-pakistani-suits",
    price: 3000,
    originalPrice: 3800,
    fabric: "Pure Bamberg Chiffon with Malai Silk Bottom",
    work: "Intricate Kashmiri Threadwork, Dori & Cutwork Borders",
    color: "Forest Emerald & Champagne Pink",
    sizes: ["S", "M", "L", "XL", "XXL", "Unstitched"],
    description: "Imported luxury designer suit with a heavily embroidered front daman, delicate sleeve cutwork, and an 80-gram pure chiffon printed dupatta with scalloped borders.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "ps-02",
    name: "Nazneen Heavy Lawn Festive Collection",
    category: "Ladies Pakistani Suits",
    categorySlug: "ladies-pakistani-suits",
    price: 2600,
    originalPrice: 3200,
    fabric: "Premium 100/100 Digital Lawn & Organza",
    work: "Cross-stitch Floral Vines with Schiffli Laser Cut",
    color: "Lavender & Powder Blue",
    sizes: ["S", "M", "L", "XL", "XXL", "Unstitched"],
    description: "Breathable ultra-fine combed lawn with elaborate neckline patches, organza sleeve inserts, and digitally printed silk-blend dupatta.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    badge: "Festive Lawn",
    isFeatured: true,
    inStock: true
  },
  {
    id: "ps-03",
    name: "Jannat Velvet & Organza Luxury Suit",
    category: "Ladies Pakistani Suits",
    categorySlug: "ladies-pakistani-suits",
    price: 3000,
    originalPrice: 3900,
    fabric: "Plush Micro Velvet with Tissue Organza",
    work: "Tilla Embroidery, Sequence & Mirror Highlights",
    color: "Royal Plum & Antique Bronze",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom Fit"],
    description: "Winter and wedding exclusive Pakistani suit featuring rich velvet bodice and organza ruffles with gold tilla work.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    badge: "Special ₹3,000",
    inStock: true
  },

  // 3. Long Frocks & Anarkalis
  {
    id: "ak-01",
    name: "Mumtaz Mahal Flared Ivory Anarkali Gown",
    category: "Long Frocks & Anarkalis",
    categorySlug: "anarkalis-long-frogs",
    price: 3000,
    originalPrice: 3999,
    fabric: "Pure Georgette with Butter Crepe Lining",
    work: "Micro Sequin Clusters, Pearl Beads & Gold Zari",
    color: "Ivory White & Warm Rose Gold",
    sizes: ["S", "M", "L", "XL", "XXL", "Custom Length"],
    description: "56-kali royal flared floor-length gown featuring grand yoke work, dramatic translucent sleeves with button cuffs, and a full-length sequined stole.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "ak-02",
    name: "Aafreen Wine Silk Floor-Touching Frock",
    category: "Long Frocks & Anarkalis",
    categorySlug: "anarkalis-long-frogs",
    price: 2800,
    originalPrice: 3500,
    fabric: "Chanderi Silk & Soft Net",
    work: "Pitta Work, Resham Threadwork & Mirror Borders",
    color: "Deep Wine Maroon",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Stately silhouette with broad border hemline, built-in padded bustier, and matching churidar pants with sheer dupatta.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    inStock: true
  },

  // 4. Sarees
  {
    id: "sr-01",
    name: "Ayodhya Katan Silk Banarasi Saree",
    category: "Sarees (Traditional & Designer)",
    categorySlug: "sarees",
    price: 3000,
    originalPrice: 4200,
    fabric: "Pure Handloom Katan Silk",
    work: "Real Gold Tested Zari Kadwa Floral Weave",
    color: "Crimson Maroon & Golden Temple Border",
    sizes: ["Standard 6.3m (With Unstitched Blouse Piece)", "S", "M", "L", "XL", "XXL"],
    description: "Handcrafted master weave boasting rich meenakari work in the opulent grand pallu and contrast heavy brocade blouse piece.",
    image: "/assets/images/category_designer_saree_1793507321323.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "sr-02",
    name: "Gulabi Cocktail Organza Designer Saree",
    category: "Sarees (Traditional & Designer)",
    categorySlug: "sarees",
    price: 2400,
    originalPrice: 3100,
    fabric: "Tissue Organza with Satin Border",
    work: "Hand-painted Rose Motifs & Scallop Cutwork",
    color: "Powder Blush Pink",
    sizes: ["Standard 6.3m", "Free Size"],
    description: "Contemporary lightweight cocktail saree with delicate hand-drawn roses, crystal highlights, and a designer embroidered designer blouse piece.",
    image: "/assets/images/category_designer_saree_1793507321323.jpg",
    inStock: true
  },

  // 5. Burqas & Abayas
  {
    id: "ab-01",
    name: "Madinah Rose Gold Gilded Luxury Abaya",
    category: "Burqas & Abayas (Modest Wear)",
    categorySlug: "burqas-abayas",
    price: 3000,
    originalPrice: 3800,
    fabric: "Original Dubai Breathable Nida Fabric",
    work: "Rose Gold Hand Crochet Lace & Rhinestones",
    color: "Midnight Jet Black with Rose Gold Accents",
    sizes: ["S", "M", "L", "XL", "XXL (52-60)", "Custom Length"],
    description: "Premium modest gown with graceful batwing fall, hidden snap buttons, delicate rose lace sleeve cuffs, and matching 2-meter chiffon shayla hijab.",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "ab-02",
    name: "Al-Zahra Kimono Style Open Abaya Cardigan",
    category: "Burqas & Abayas (Modest Wear)",
    categorySlug: "burqas-abayas",
    price: 2500,
    originalPrice: 3200,
    fabric: "Crinkled Crepe Georgette",
    work: "Minimalist Satin Edging & Pearl Tassels",
    color: "Mocha Taupe & Soft Ivory",
    sizes: ["S", "M", "L", "XL", "XXL", "52", "54", "56", "58"],
    description: "Versatile dual-layer open kimono abaya featuring a detachable belt and inner slip dress, ideal for everyday elegance and festive gatherings.",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    inStock: true
  },

  // 6. Scarfs & Chunies
  {
    id: "sc-01",
    name: "Mughal Jaal Banarasi Brocade Dupatta",
    category: "Scarfs & Chunies (Designer Dupattas)",
    categorySlug: "scarfs-chunies",
    price: 1800,
    originalPrice: 2400,
    fabric: "Pure Chanderi Silk",
    work: "All-over Zari Jaal Weave with Hand Tassels",
    color: "Ruby Red & Antique Rose",
    sizes: ["2.5 Meters Full Width", "Free Size"],
    description: "Transform any plain suit into a royal ensemble with this grand Banarasi silk chunni laden with golden booties and temple edging.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    badge: "Essential Luxe",
    isFeatured: false,
    inStock: true
  },
  {
    id: "sc-02",
    name: "Heirloom Phulkari Georgette Chunni",
    category: "Scarfs & Chunies (Designer Dupattas)",
    categorySlug: "scarfs-chunies",
    price: 1500,
    originalPrice: 1999,
    fabric: "Pure Georgette",
    work: "Traditional Pat Silk Thread Hand Embroidery & Mirrors",
    color: "Multi-Color on Mustard Yellow",
    sizes: ["2.4 Meters", "Free Size"],
    description: "Authentic Punjab artisan hand-crafted Phulkari chunni with shimmering foil mirrors and hand-finished borders.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    inStock: true
  },

  // 7. Cotton Dresses
  {
    id: "cd-01",
    name: "Jaipuri Mulmul Handblock Printed Kurta Set",
    category: "Cotton Dresses (Daily & Comfort)",
    categorySlug: "cotton-dresses",
    price: 1800,
    originalPrice: 2400,
    fabric: "100% Superfine Mulmul Cotton",
    work: "Natural Indigo Vegetable Dye with Gota Highlights",
    color: "Ocean Indigo & Pearl White",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Featherlight 3-piece daily comfort suit featuring an A-line kurta, straight pants with pocket, and soft cotton dupatta.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    badge: "Pure Cotton",
    isFeatured: false,
    inStock: true
  },
  {
    id: "cd-02",
    name: "Gulmohar Comfort Fit Cotton Angrakha Dress",
    category: "Cotton Dresses (Daily & Comfort)",
    categorySlug: "cotton-dresses",
    price: 2100,
    originalPrice: 2700,
    fabric: "South Cotton with Slub Texture",
    work: "Handmade Dori with Pom-Pom Latkans",
    color: "Terracotta Peach & Sage",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Charming side-tie Angrakha design with flared hemline, perfect for office wear, shopping sprees, and casual evenings.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    inStock: true
  },

  // 8. Party Wear Dresses
  {
    id: "pw-01",
    name: "Shahana Peplum Top & Sharara Set",
    category: "Party Wear Dresses",
    categorySlug: "party-wear",
    price: 3000,
    originalPrice: 3800,
    fabric: "Silk Georgette & Organza",
    work: "Liquid Mirror Work, Cutdana & Sequin Bodice",
    color: "Champagne Rose Gold",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Showstopper reception wear featuring a tailored peplum top with flared sleeves and a dramatic tiered sharara bottom.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    badge: "Special ₹3,000",
    isFeatured: true,
    inStock: true
  },
  {
    id: "pw-02",
    name: "Draped Indo-Western Cowl Evening Gown",
    category: "Party Wear Dresses",
    categorySlug: "party-wear",
    price: 2800,
    originalPrice: 3500,
    fabric: "Satin Silk with Lycra Blend",
    work: "Embroidered Shoulder Brooch & Crystal Belt",
    color: "Midnight Navy & Rose Gold",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Modern elegance with pre-stitched shoulder drape, pleated cowl skirt, and sculpted bodice.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    inStock: true
  },

  // 9. Punjabi Dresses
  {
    id: "pj-01",
    name: "Amritsari Royal Heavy Patiala Suit",
    category: "Punjabi Dresses (Patiala & Suits)",
    categorySlug: "punjabi-dresses",
    price: 1000,
    originalPrice: 1500,
    fabric: "Pure Glace Cotton with Shantoon Bottom",
    work: "Zari Dori Neckline & Full Flared Patiala Pleats",
    color: "Hot Rani Pink & Lime Yellow",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Authentic pleated Patiala salwar with short kurti and pure chiffon tie-dye dupatta with golden lace. Comfortable all-day wear.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    badge: "Special ₹1,000",
    isFeatured: true,
    isBestSeller: true,
    inStock: true
  },
  {
    id: "pj-02",
    name: "Chandigarh Mirror Work Crepe Punjabi Suit",
    category: "Punjabi Dresses (Patiala & Suits)",
    categorySlug: "punjabi-dresses",
    price: 1000,
    originalPrice: 1400,
    fabric: "French Crepe with Cotton Lining",
    work: "Original Abhala Mirror Work & Gota Kinari",
    color: "Teal Blue & Mustard",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Vibrant ethnic festive suit with comfortable drape, wrinkle-free fabric, and matching bordered dupatta.",
    image: "/assets/images/category_anarkali_gown_1793507321253.jpg",
    badge: "Special ₹1,000",
    inStock: true
  },
  {
    id: "pj-03",
    name: "Phulkari Embroidered Festive Patiala Suit",
    category: "Punjabi Dresses (Patiala & Suits)",
    categorySlug: "punjabi-dresses",
    price: 1000,
    originalPrice: 1600,
    fabric: "Chanderi Cotton with Patiala Salwar",
    work: "Full Front Phulkari Threadwork & Mirror Dupatta",
    color: "Royal Blue & Sunshine Yellow",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Handcrafted Phulkari embroidery on fine cotton kurta with fully gathered Patiala salwar and contrast dupatta.",
    image: "/assets/images/hero_pakistani_suit_1793507319779.jpg",
    badge: "Special ₹1,000",
    isFeatured: true,
    inStock: true
  },

  // 10. Tops & Leggings
  {
    id: "tl-01",
    name: "Royal Velvet Short Kurti & Palazzo Ensemble",
    category: "Tops & Leggings",
    categorySlug: "tops-leggings",
    price: 1999,
    originalPrice: 2600,
    fabric: "Silk Velvet with Stretch Lycra",
    work: "Antique Zari Cuffs and Collar",
    color: "Rich Maroon & Black",
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Versatile party-ready short kurti pairable with palazzos, cigarette pants, or flared skirts.",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    inStock: true
  },
  {
    id: "tl-02",
    name: "Super-Soft Bio-Wash 4-Way Stretch Churidar Pack",
    category: "Tops & Leggings",
    categorySlug: "tops-leggings",
    price: 1299,
    originalPrice: 1699,
    fabric: "95% Combed Cotton, 5% Spandex",
    work: "Seamless Ankle Gatherings, Anti-Pilling",
    color: "Pack of 3: Gold, Maroon & Ivory",
    sizes: ["Free Size (Up to 42 waist)", "XXL Plus Size (44-50)"],
    description: "Ultra-comfortable all-day stretch leggings with broad elastic waistband that stays flat without pinching.",
    image: "/assets/images/category_abaya_modest_1793507320741.jpg",
    badge: "Value Pack",
    inStock: true
  },

  // 11. Home Essentials
  {
    id: "he-01",
    name: "Royal Heritage Jacquard Door Curtain (Set of 2)",
    category: "Home Essentials",
    categorySlug: "home-essentials",
    price: 1800,
    originalPrice: 2400,
    fabric: "Heavy 380 GSM Jacquard Chenille",
    work: "Embossed Damask Weave with Metallic Eyelets",
    color: "Deep Maroon & Antique Gold",
    sizes: ["7 Feet (Door)", "9 Feet (Long Door)"],
    description: "Transform your living room into a royal palace with our 85% light-filtering thermal insulated luxury curtains.",
    image: "/assets/images/category_designer_saree_1793507321323.jpg",
    badge: "Home Luxe",
    inStock: true
  },
  {
    id: "he-02",
    name: "Kashmir Velvet Quilted King Bedsheet with 2 Pillow Shams",
    category: "Home Essentials",
    categorySlug: "home-essentials",
    price: 2500,
    originalPrice: 3200,
    fabric: "Flocked Micro Velvet with Anti-Slip Backing",
    work: "Geometric Computerized Quilting & Zari Border",
    color: "Rose Gold Blush & Wine",
    sizes: ["Super King 108 x 108 inches"],
    description: "Sumptuous winter bedding that exudes warmth and 5-star hotel luxury. Colorfast and machine-wash friendly.",
    image: "/assets/images/hero_bridal_lehenga_1793507319785.jpg",
    inStock: true
  }
];

export const BOUTIQUE_DETAILS = {
  name: "Madeena Dresses Home Boutique",
  shortName: "Madeena Dresses",
  tagline: "Where Elegance Meets Tradition",
  email: "shabbirmohammad413@gmail.com",
  phone: "9505785254",
  phoneDisplay: "+91 95057 85254",
  whatsappNumber: "919398974922",
  whatsappDisplay: "+91 93989 74922",
  address: "Madeena Dresses Home Boutique, Charminar Heritage Area, Hyderabad (Home Visits & Video Consultation Welcome)",
  hours: "Monday - Saturday: 10:00 AM – 10:00 PM | Sunday: 10:00 AM – 10:00 PM (All Days Open)",
  formspreeEndpoint: "https://formspree.io/f/mqkvrkzp",
  experienceYears: 22,
  happyBrides: "25,000+",
  customStitchingAvailable: true
};

export const BOUTIQUE_REVIEWS = [
  {
    id: "rev-1",
    name: "Farheen Sultana",
    city: "Hyderabad",
    occasion: "Bridal Velvet Lehenga (₹3,000)",
    rating: 5,
    comment: "I visited the Madeena Dresses home boutique in person. The ₹3,000 Maharani zardozi velvet lehenga and XXL custom fitting were unbelievable quality for the price! Warm, personal home hospitality.",
    date: "October 2026"
  },
  {
    id: "rev-2",
    name: "Zainab Fatima",
    city: "Secunderabad",
    occasion: "Pakistani Chiffon 3-Piece Suit (₹3,000)",
    rating: 5,
    comment: "Ordered via WhatsApp quick chat with 9398974922. The Sultana chiffon suit in size XXL is so comfortable and rich. Prompt reply and same-day home pickup!",
    date: "October 2026"
  },
  {
    id: "rev-3",
    name: "Ayesha Siddiqua",
    city: "Hyderabad",
    occasion: "Madinah Rose Gold Abaya (₹3,000)",
    rating: 5,
    comment: "The rose gold gilded abaya has such a rich, graceful fall. The Nida fabric is breathable and the XXL fit was spot on. True home boutique warmth with designer finish.",
    date: "October 2026"
  }
];
