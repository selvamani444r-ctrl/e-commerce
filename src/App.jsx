import React, { useState, useEffect } from 'react';
import { PRODUCTS_DATA, CATEGORIES_DATA } from './data/mockData';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { CategorySection } from './components/CategorySection';
import { TrendingProducts } from './components/TrendingProducts';
import { DealsSection } from './components/DealsSection';
import { PriceComparisonSection } from './components/PriceComparisonSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { DealOfTheDay } from './components/DealOfTheDay';
import { BrandsSection } from './components/BrandsSection';
import { RecommendedSection } from './components/RecommendedSection';
import { RecentlyViewed } from './components/RecentlyViewed';
import { ProductDiscoverySection } from './components/ProductDiscoverySection';
import { BuyingGuidesSection } from './components/BuyingGuidesSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';

// Modals
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { ComparisonModal } from './components/modals/ComparisonModal';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { AffiliateRedirectModal } from './components/modals/AffiliateRedirectModal';
import { PriceDropModal } from './components/modals/PriceDropModal';
import { AdminModal } from './components/modals/AdminModal';
import { LegalModal } from './components/modals/LegalModal';
import { ArticleModal } from './components/modals/ArticleModal';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus_nook_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus_nook_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Products Data State
  const [products, setProducts] = useState(PRODUCTS_DATA);

  // Search & Category State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Wishlist State (LocalStorage)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_nook_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_nook_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Comparison State (LocalStorage)
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_nook_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_nook_compare', JSON.stringify(compareList));
    } catch (e) {
      console.error(e);
    }
  }, [compareList]);

  // Recently Viewed State (LocalStorage)
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_nook_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nexus_nook_history', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  // Affiliate Click Tracker State
  const [clickLogs, setClickLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_nook_click_logs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toasts
  const [toasts, setToasts] = useState([]);
  const addToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Modals visibility
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [redirectTarget, setRedirectTarget] = useState(null); // { product, merchant }
  const [priceAlertProduct, setPriceAlertProduct] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState(null); // 'about' | 'disclosure' | 'merchants' | etc.
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Handlers
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    // Add to recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 10);
    });
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some(w => w.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(w => w.id !== product.id));
      addToast(`Removed "${product.name.slice(0, 24)}..." from Wishlist`);
    } else {
      setWishlist(prev => [product, ...prev]);
      addToast(`Saved "${product.name.slice(0, 24)}..." to Wishlist`);
    }
  };

  const handleToggleCompare = (product) => {
    const exists = compareList.some(c => c.id === product.id);
    if (exists) {
      setCompareList(prev => prev.filter(c => c.id !== product.id));
      addToast(`Removed from comparison table`);
    } else {
      if (compareList.length >= 4) {
        addToast(`You can compare up to 4 products at once`);
        return;
      }
      setCompareList(prev => [...prev, product]);
      addToast(`Added "${product.name.slice(0, 24)}..." to Compare table`);
    }
  };

  const handleViewDeal = (product, merchant) => {
    const chosenMerchant = merchant || product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0] || {
      name: 'Retail Partner',
      price: product.price,
      affiliateUrl: product.affiliateUrl
    };

    // Open transparency redirect modal
    setRedirectTarget({ product, merchant: chosenMerchant });

    // Track click log
    const newLog = {
      productName: product.name,
      merchantName: chosenMerchant.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    const updatedLogs = [newLog, ...clickLogs.slice(0, 49)];
    setClickLogs(updatedLogs);
    try {
      localStorage.setItem('nexus_nook_click_logs', JSON.stringify(updatedLogs));
    } catch (e) {
      console.error(e);
    }
  };

  const handleProceedRedirect = () => {
    if (!redirectTarget) return;
    const url = redirectTarget.merchant?.affiliateUrl || redirectTarget.product?.affiliateUrl || 'https://amazon.in';
    window.open(url, '_blank', 'noopener,noreferrer');
    setRedirectTarget(null);
  };

  const handleClearHistory = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('nexus_nook_history');
    addToast('Browsing history cleared');
  };

  // Admin handlers
  const handleAddProduct = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    addToast(`Added ${newProduct.name} to catalog`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast(`Product removed from catalog`);
  };

  // Voice Search simulation
  const handleVoiceSearch = () => {
    addToast("Listening for product or brand voice query...");
    setTimeout(() => {
      setSearchQuery("Sony Headphones");
      addToast('Voice recognized: "Sony Headphones"');
      const el = document.getElementById('catalog-discovery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 1800);
  };

  // Camera Search simulation
  const handleCameraSearch = () => {
    addToast("Image search active: Match identified for MacBook Pro & Ultrabooks");
    setTimeout(() => {
      setSelectedCategory("laptops");
      const el = document.getElementById('catalog-discovery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 1500);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-discovery-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDeals = () => {
    const el = document.getElementById('todays-deals-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="nexus-nook-app">
      {/* 1. ANNOUNCEMENT BAR + STICKY HEADER + MEGA NAVIGATION */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        wishlist={wishlist}
        compareList={compareList}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
        theme={theme}
        toggleTheme={toggleTheme}
        clickCount={clickLogs.length}
        onVoiceSearch={handleVoiceSearch}
        onCameraSearch={handleCameraSearch}
      />

      {/* 4. HERO SECTION */}
      <HeroSection
        onExploreDeals={scrollToDeals}
        onBrowseCategories={scrollToCatalog}
        onSelectProduct={handleSelectProduct}
        sampleProducts={products}
      />

      {/* 5. TRUST / VALUE BAR */}
      <TrustBar />

      {/* 6. SHOP BY CATEGORY */}
      <CategorySection
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          scrollToCatalog();
        }}
        selectedCategory={selectedCategory}
      />

      {/* 7. TRENDING PRODUCTS */}
      <TrendingProducts
        products={products}
        onSelectProduct={handleSelectProduct}
        onViewDeal={handleViewDeal}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        compareList={compareList}
        onToggleCompare={handleToggleCompare}
        onOpenPriceAlert={(p) => setPriceAlertProduct(p)}
      />

      {/* 8. TODAY'S BEST DEALS */}
      <DealsSection
        products={products}
        onSelectProduct={handleSelectProduct}
        onViewDeal={handleViewDeal}
      />

      {/* 9. COMPARE BEFORE YOU BUY (PRICE COMPARISON) */}
      <PriceComparisonSection
        products={products}
        onViewDeal={handleViewDeal}
        onSelectProduct={handleSelectProduct}
      />

      {/* 10. FEATURED COLLECTIONS */}
      <FeaturedCollections
        onSelectCollection={(col) => {
          addToast(`Loaded collection: ${col.title}`);
          scrollToCatalog();
        }}
      />

      {/* 11. DEAL OF THE DAY */}
      <DealOfTheDay
        product={products.find(p => p.isDealOfTheDay)}
        onViewDeal={handleViewDeal}
        onSelectProduct={handleSelectProduct}
      />

      {/* 12. POPULAR BRANDS */}
      <BrandsSection
        onSelectBrand={(brandName) => {
          setSearchQuery(brandName);
          scrollToCatalog();
        }}
      />

      {/* 13. RECOMMENDED FOR YOU */}
      <RecommendedSection
        products={products}
        onSelectProduct={handleSelectProduct}
        onViewDeal={handleViewDeal}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        compareList={compareList}
        onToggleCompare={handleToggleCompare}
        onOpenPriceAlert={(p) => setPriceAlertProduct(p)}
        recentlyViewed={recentlyViewed}
      />

      {/* 14. RECENTLY VIEWED */}
      <RecentlyViewed
        recentlyViewed={recentlyViewed}
        onSelectProduct={handleSelectProduct}
        onViewDeal={handleViewDeal}
        onClearHistory={handleClearHistory}
      />

      {/* COMPREHENSIVE PRODUCT DISCOVERY & FILTER CATALOG */}
      <ProductDiscoverySection
        products={products}
        onSelectProduct={handleSelectProduct}
        onViewDeal={handleViewDeal}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        compareList={compareList}
        onToggleCompare={handleToggleCompare}
        onOpenPriceAlert={(p) => setPriceAlertProduct(p)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 15. SMART SHOPPING GUIDES (EDITORIAL & BLOG) */}
      <BuyingGuidesSection
        onOpenArticle={(article) => setSelectedArticle(article)}
      />

      {/* 16. NEWSLETTER SUBSCRIPTION */}
      <NewsletterSection
        onShowToast={addToast}
      />

      {/* 17. COMPREHENSIVE FOOTER WITH AFFILIATE DISCLOSURE */}
      <Footer
        onOpenLegal={(tab) => setLegalModalTab(tab)}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          scrollToCatalog();
        }}
      />

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <MobileBottomNav
        wishlistCount={wishlist.length}
        compareCount={compareList.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenCategories={() => {
          setSelectedCategory('all');
          scrollToCatalog();
        }}
        onFocusSearch={() => {
          scrollToCatalog();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODALS & DRAWERS */}
      
      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onViewDeal={handleViewDeal}
          isWishlisted={wishlist.some(w => w.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          isCompared={compareList.some(c => c.id === selectedProduct.id)}
          onToggleCompare={handleToggleCompare}
          onOpenPriceAlert={(p) => setPriceAlertProduct(p)}
          allProducts={products}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {/* Product Comparison Modal */}
      {isCompareOpen && (
        <ComparisonModal
          compareList={compareList}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={(id) => setCompareList(prev => prev.filter(c => c.id !== id))}
          onClearCompare={() => setCompareList([])}
          onViewDeal={handleViewDeal}
        />
      )}

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(w => w.id !== id))}
        onClearWishlist={() => setWishlist([])}
        onViewDeal={handleViewDeal}
        onSelectProduct={handleSelectProduct}
        onToggleCompare={handleToggleCompare}
        compareList={compareList}
      />

      {/* Affiliate Outbound Redirect Transparency Modal */}
      {redirectTarget && (
        <AffiliateRedirectModal
          product={redirectTarget.product}
          merchant={redirectTarget.merchant}
          onClose={() => setRedirectTarget(null)}
          onProceed={handleProceedRedirect}
        />
      )}

      {/* Price Drop Alert Modal */}
      {priceAlertProduct && (
        <PriceDropModal
          product={priceAlertProduct}
          onClose={() => setPriceAlertProduct(null)}
          onSaveAlert={(p, target, email) => {
            addToast(`Alert set! We will notify ${email} when ${p.name.slice(0, 18)}... drops to ₹${target.toLocaleString('en-IN')}`);
          }}
        />
      )}

      {/* Admin / Headless CMS Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAddProduct={handleAddProduct}
        onDeleteProduct={handleDeleteProduct}
        clickLogs={clickLogs}
      />

      {/* Legal & Info Modal */}
      {legalModalTab && (
        <LegalModal
          initialTab={legalModalTab}
          onClose={() => setLegalModalTab(null)}
          onShowToast={addToast}
        />
      )}

      {/* Editorial Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
