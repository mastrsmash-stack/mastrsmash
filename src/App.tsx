import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Salad,
  PlusCircle,
  CupSoda,
  X,
  Clock,
  MapPin,
  Bell,
  Check,
  Info,
  Star,
  Eye
} from 'lucide-react';
import { menuCategories, EXTRA_ITEMS } from './menuData';
import type { MenuItem } from './menuData';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [selectedBurgerSize, setSelectedBurgerSize] = useState<'single' | 'double'>('single');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Sizing toggle inside the detail modal
  const [modalSize, setModalSize] = useState<'single' | 'double'>('single');

  // General Toast Notification
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Sync modal active size with global toggle on open
  useEffect(() => {
    if (selectedItem) {
      setModalSize(selectedBurgerSize);
    }
  }, [selectedItem, selectedBurgerSize]);

  // Auto-scroll to active category header on change
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`category-section-${id}`);
    if (element) {
      const offset = 140; // sticky header + category bar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Sync scroll with category active state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const category of menuCategories) {
        const element = document.getElementById(`category-section-${category.id}`);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show notification
  const triggerNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Call Waiter logic
  const handleCallWaiter = () => {
    triggerNotification(`تم إرسال طلب استدعاء النادل لطاولتك. سيصلك في أقرب وقت.`, 'success');
  };

  // Helper to map Lucide Icons dynamic name
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Salad': return <Salad className="w-5 h-5" />;
      case 'PlusCircle': return <PlusCircle className="w-5 h-5" />;
      case 'CupSoda': return <CupSoda className="w-5 h-5" />;
      default: return <Flame className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-dark overflow-x-hidden">

      {/* Toast Notification (Rendered outside blurred container) */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 left-4 right-4 md:left-auto md:right-4 z-[999] p-4 rounded-xl shadow-2xl flex items-center justify-between border ${notification.type === 'success'
              ? 'bg-brand-charcoal border-brand-yellow text-brand-yellow'
              : 'bg-brand-charcoal border-brand-gray text-white'
              }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? <Check className="w-5 h-5 shrink-0" /> : <Info className="w-5 h-5 shrink-0" />}
              <span className="text-sm font-semibold">{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-white opacity-60 hover:opacity-100 p-1">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Layout Container (will blur when modal is open) */}
      <div
        className={`transition-all duration-500 pb-28 ${selectedItem ? 'filter blur-[5px] scale-[0.98] pointer-events-none' : ''
          }`}
      >
        {/* Hero Header Area */}
        <header className="relative w-full h-[280px] md:h-[350px] overflow-hidden flex items-end">
          <div className="absolute inset-0 z-0 bg-brand-dark">
            <img
              src={menuCategories[0].items[2].image}
              alt="Master Smash burger banner"
              className="w-full h-full object-cover object-center opacity-25 scale-105 filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full max-w-xl mx-auto px-5 pb-6">
            <div className="flex justify-between items-end">
              <div>
                <span className="bg-brand-yellow text-brand-dark px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-brand uppercase inline-block mb-3 animate-pulse-slow">
                  معرض سماش برجر المميز 🔥
                </span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-2">
                  ماستر سماش
                  <span className="text-brand-yellow text-glow-yellow">MASTER SMASH</span>
                </h1>
                <p className="text-brand-gray text-sm mt-2 max-w-[85%] font-medium leading-relaxed">
                  تصفح تشكيلة سماش برجر المحضرة يومياً من اللحم البلدي الطازج والخبز الفاخر.
                </p>
              </div>

              {/* Call Waiter floating button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCallWaiter}
                className="bg-brand-charcoal border border-brand-yellow/20 hover:border-brand-yellow text-white p-3 rounded-full flex flex-col items-center gap-1 shadow-premium shrink-0"
                title="استدعاء النادل"
              >
                <Bell className="w-6 h-6 text-brand-yellow animate-float" />
                <span className="text-[10px] font-bold text-brand-yellow">طلب نادل</span>
              </motion.button>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs text-brand-gray font-semibold border-t border-brand-charcoal-light pt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" />
                <span>أوقات العمل: 12:00 م - 2:00 ص</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
                <span>ليبيا , سبها , سبها مول , طابق الرابع</span>
              </div>
            </div>
          </div>
        </header>

        {/* Sticky Navigation and Menu items */}
        <div className="max-w-xl mx-auto px-4 mt-2">

          {/* Category Tabs */}
          <div className="sticky top-0 z-40 bg-brand-dark/95 backdrop-blur-md pt-3 pb-3 border-b border-brand-charcoal-light -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {menuCategories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${isActive
                      ? 'text-brand-dark z-10'
                      : 'text-brand-gray bg-brand-charcoal hover:text-white border border-transparent hover:border-brand-charcoal-light'
                      }`}
                  >
                    {renderCategoryIcon(category.iconName)}
                    <span>{category.name}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryBg"
                        className="absolute inset-0 bg-gradient-to-r from-brand-yellow to-brand-orange rounded-full -z-10 shadow-brand"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Menu Sections */}
          <div className="space-y-10 mt-6">
            {menuCategories.map((category) => (
              <section
                key={category.id}
                id={`category-section-${category.id}`}
                className="scroll-mt-40"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4 border-r-4 border-brand-yellow pr-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight">{category.name}</h2>
                    <span className="text-brand-gray text-xs font-semibold block uppercase tracking-wider">{category.id} list</span>
                  </div>

                  {/* Sizing switch for Burgers section */}
                  {category.id === 'burgers' && (
                    <div className="bg-brand-charcoal p-1 rounded-lg border border-brand-charcoal-light flex text-xs font-bold">
                      <button
                        onClick={() => setSelectedBurgerSize('single')}
                        className={`px-3 py-1 rounded-md transition-all ${selectedBurgerSize === 'single'
                          ? 'bg-brand-yellow text-brand-dark shadow-sm'
                          : 'text-brand-gray hover:text-white'
                          }`}
                      >
                        فردي
                      </button>
                      <button
                        onClick={() => setSelectedBurgerSize('double')}
                        className={`px-3 py-1 rounded-md transition-all ${selectedBurgerSize === 'double'
                          ? 'bg-brand-yellow text-brand-dark shadow-sm'
                          : 'text-brand-gray hover:text-white'
                          }`}
                      >
                        دبل
                      </button>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="grid grid-cols-1 gap-4">
                  {category.items.map((item, index) => {
                    let priceToShow = item.price;
                    if (item.hasSizes && item.prices) {
                      priceToShow = selectedBurgerSize === 'double' ? item.prices.double : item.prices.single;
                    }

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.35, delay: index * 0.04 }}
                        whileHover={{ y: -3 }}
                        onClick={() => setSelectedItem(item)}
                        className="bg-brand-charcoal hover:bg-brand-charcoal-light border border-brand-charcoal-light hover:border-brand-yellow/25 p-3.5 rounded-2xl flex gap-4 items-center cursor-pointer transition-all duration-300 shadow-premium group relative overflow-hidden"
                      >
                        {/* Popular badge */}
                        {item.popular && (
                          <div className="absolute top-0 right-0 bg-brand-yellow text-brand-dark text-[9px] font-black px-2 py-0.5 rounded-bl-lg shadow-sm">
                            🔥 الأكثر طلباً
                          </div>
                        )}

                        {/* Image */}
                        {item.image ? (
                          <div className="w-[85px] h-[85px] rounded-xl overflow-hidden bg-brand-dark shrink-0 relative border border-brand-charcoal-light">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="w-[85px] h-[85px] rounded-xl bg-brand-dark flex items-center justify-center shrink-0 border border-brand-charcoal-light">
                            <PlusCircle className="w-8 h-8 text-brand-yellow/20" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-extrabold text-base text-white group-hover:text-brand-yellow transition-colors truncate">
                              {item.name}
                            </h3>
                          </div>

                          <p className="text-brand-gray text-[11px] leading-relaxed mt-1 line-clamp-2">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between mt-3 pt-1 border-t border-brand-charcoal-light">
                            {/* Price display */}
                            <div className="flex items-baseline gap-1">
                              <span className="text-brand-yellow font-black text-lg">{priceToShow}</span>
                              <span className="text-brand-gray text-[10px] font-bold">دينار</span>
                              {item.hasSizes && item.prices && (
                                <span className="text-[10px] text-brand-gray/50 mr-1.5">
                                  ({selectedBurgerSize === 'single' ? 'فردي' : 'دبل'})
                                </span>
                              )}
                            </div>

                            {/* Info/Browse indicator */}
                            <div className="flex items-center gap-1.5 text-xs text-brand-yellow font-bold group-hover:underline">
                              <span>التفاصيل</span>
                              <Eye className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Item Details Popup Modal (Rendered outside blurred container) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4">

            {/* Modal backdrop backdrop click handler */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal Layout Container */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-xl bg-brand-charcoal rounded-t-[30px] sm:rounded-3xl border-t sm:border border-brand-charcoal-light overflow-hidden shadow-2xl z-10 max-h-[88vh] flex flex-col"
            >
              {/* Top drag handle indicator for mobile view */}
              <div
                className="h-1.5 w-12 bg-brand-charcoal-light rounded-full mx-auto my-3 shrink-0 cursor-pointer sm:hidden"
                onClick={() => setSelectedItem(null)}
              />

              {/* Top header navigation buttons */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-brand-dark/70 backdrop-blur-md text-white hover:text-brand-yellow p-2.5 rounded-full z-20 border border-brand-charcoal-light transition-colors"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable details wrapper */}
              <div className="overflow-y-auto no-scrollbar flex-1 pb-8 px-5">

                {/* Visual Image container */}
                {selectedItem.image ? (
                  <div className="w-full h-[240px] md:h-[280px] rounded-2xl overflow-hidden bg-brand-dark relative mt-2 border border-brand-charcoal-light shrink-0">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-[180px] rounded-2xl bg-brand-dark border border-brand-charcoal-light flex items-center justify-center mt-2 shrink-0">
                    <PlusCircle className="w-16 h-16 text-brand-yellow/20" />
                  </div>
                )}

                {/* Detail Descriptions */}
                <div className="mt-5">
                  <div className="flex flex-wrap items-baseline gap-2.5">
                    <h2 className="text-2xl font-black text-white">{selectedItem.name}</h2>
                    <span className="text-brand-gray text-xs font-semibold">{selectedItem.englishName}</span>
                  </div>

                  {/* Premium Stars Rating Component */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1.5 bg-brand-yellow/10 border border-brand-yellow/20 px-2.5 py-1 rounded-lg text-brand-yellow text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{selectedItem.rating || 4.9}</span>
                    </div>
                    <span className="text-brand-gray text-[11px] font-semibold">
                      ({selectedItem.reviewsCount || 120} تقييم من عملائنا)
                    </span>
                  </div>

                  <p className="text-brand-gray text-sm mt-4 leading-relaxed bg-brand-dark/50 p-4 rounded-xl border border-brand-charcoal-light/40">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Sizing Price displays */}
                {selectedItem.hasSizes && selectedItem.prices ? (
                  <div className="mt-6 border-t border-brand-charcoal-light pt-5">
                    <h3 className="text-sm font-black text-white mb-3">تفاصيل الأسعار:</h3>

                    {/* Interactive size viewer */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={() => setModalSize('single')}
                        className={`p-4 rounded-xl border flex justify-between items-center transition-all ${modalSize === 'single'
                          ? 'bg-brand-yellow/10 border-brand-yellow text-white shadow-brand'
                          : 'bg-brand-dark/40 border-brand-charcoal-light text-brand-gray'
                          }`}
                      >
                        <div className="flex flex-col items-start text-right">
                          <span className="font-extrabold text-sm">فردي (Single)</span>
                          <span className="text-[10px] text-brand-gray/80 mt-0.5">لحم وجبن</span>
                        </div>
                        <span className="font-black text-lg text-brand-yellow">{selectedItem.prices.single} دينار</span>
                      </button>

                      <button
                        onClick={() => setModalSize('double')}
                        className={`p-4 rounded-xl border flex justify-between items-center transition-all ${modalSize === 'double'
                          ? 'bg-brand-yellow/10 border-brand-yellow text-white shadow-brand'
                          : 'bg-brand-dark/40 border-brand-charcoal-light text-brand-gray'
                          }`}
                      >
                        <div className="flex flex-col items-start text-right">
                          <span className="font-extrabold text-sm">دبل (Double)</span>
                          <span className="text-[10px] text-brand-gray/80 mt-0.5">شريحتين لحم وجبن</span>
                        </div>
                        <span className="font-black text-lg text-brand-yellow">{selectedItem.prices.double} ر.s</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Normal item base price display
                  <div className="mt-6 border-t border-brand-charcoal-light pt-5">
                    <div className="flex items-center justify-between bg-brand-dark/50 p-4 rounded-xl border border-brand-charcoal-light/40">
                      <span className="text-sm font-bold text-brand-gray">السعر:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-black text-2xl text-brand-yellow">{selectedItem.price}</span>
                        <span className="text-xs text-brand-gray font-bold">دينار</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Showcase Option: Extras Reference list */}
                {selectedItem.id !== 'water' && selectedItem.id !== 'soda-drink' && (
                  <div className="mt-6 border-t border-brand-charcoal-light pt-5">
                    <h3 className="text-sm font-black text-white mb-2.5">إضافات متوفرة عند الطلب:</h3>
                    <p className="text-[10px] text-brand-gray mb-3">بإمكانك طلب هذه الإضافات مباشرة عند خدمة الكاشير أو النادل:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {EXTRA_ITEMS.map((extra) => (
                        <div
                          key={extra.id}
                          className="p-2.5 rounded-lg bg-brand-dark/30 border border-brand-charcoal-light/50 flex justify-between items-center text-right text-xs"
                        >
                          <span className="font-bold text-white/90">{extra.name}</span>
                          <span className="font-black text-brand-yellow">+{extra.price} دينار</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal footer (pure decorative and browse reassurance) */}
              <div className="bg-brand-dark p-4 border-t border-brand-charcoal-light flex items-center justify-center shrink-0">
                <span className="text-xs text-brand-gray font-bold">تذوق الفارق مع ماستر سماش 🍔🔥</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating copyright footer overlay */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-brand-dark via-brand-dark/95 to-transparent z-30 pointer-events-none">
        <div className="max-w-xl mx-auto px-4 flex justify-center items-center pointer-events-auto">
          <div className="bg-brand-charcoal border border-brand-charcoal-light/80 px-4 py-2 rounded-full shadow-premium flex items-center gap-1.5 text-[10px] font-black text-brand-gray select-none">
            <span>حقوق الطبع محفوظة © {new Date().getFullYear()}</span>
            <span className="text-brand-yellow font-black text-glow-yellow">ماستر سماش</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
