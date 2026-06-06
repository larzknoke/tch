import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/ui/layouts/layout";
import ProductCard from "@/components/shop/product-card";
import CartDrawer from "@/components/shop/cart-drawer";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import { PRODUCT_TYPE_OPTIONS, AUDIENCE_OPTIONS } from "@/lib/product-taxonomy";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const PRODUCT_TYPE_LABELS = Object.fromEntries(
  PRODUCT_TYPE_OPTIONS.map((option) => [option.value, option.label]),
);

const AUDIENCE_LABELS = Object.fromEntries(
  AUDIENCE_OPTIONS.map((option) => [option.value, option.label]),
);

// export const getServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: "/", // Startseite
//       permanent: false, // temporär
//     },
//   };
// };

const sampleProducts = [
  {
    id: 1,
    name: "TCH Tennisschläger Pro",
    description:
      "Professioneller Tennisschläger für ambitionierte Spieler. Leicht und kraftvoll.",
    price: 149.99,
    stock: 15,
    active: true,
    image: "https://picsum.photos/seed/racket/400/300",
    sku: "TCH-RACKET-001",
    hasVariants: false,
  },
  {
    id: 2,
    name: "Tennisbälle Premium (3er Pack)",
    description:
      "Hochwertige Tennisbälle für Training und Wettkampf. ITF zugelassen.",
    price: 8.99,
    stock: 50,
    active: true,
    image: "https://picsum.photos/seed/balls/400/300",
    sku: "TCH-BALLS-001",
    hasVariants: false,
  },
  {
    id: 3,
    name: "TCH Club T-Shirt",
    description: "Offizielles TCH Vereins-Shirt aus atmungsaktivem Material.",
    price: 24.99,
    active: true,
    image: "https://picsum.photos/seed/shirt/400/300",
    hasVariants: true,
    variants: [
      { id: 301, size: "XS", stock: 3, sku: "TCH-SHIRT-XS" },
      { id: 302, size: "S", stock: 8, sku: "TCH-SHIRT-S" },
      { id: 303, size: "M", stock: 12, sku: "TCH-SHIRT-M" },
      { id: 304, size: "L", stock: 5, sku: "TCH-SHIRT-L" },
      { id: 305, size: "XL", stock: 2, sku: "TCH-SHIRT-XL" },
      { id: 306, size: "XXL", stock: 0, sku: "TCH-SHIRT-XXL" },
    ],
  },
  {
    id: 4,
    name: "Tennissocken Performance (3er Pack)",
    description:
      "Komfortable Sportsocken mit Polsterung und Feuchtigkeitstransport.",
    price: 12.99,
    stock: 40,
    active: true,
    image: "https://picsum.photos/seed/socks/400/300",
    sku: "TCH-SOCKS-001",
    hasVariants: false,
  },
  {
    id: 5,
    name: "Schweißband Set",
    description: "2x Handgelenk-Schweißbänder und 1x Stirnband in TCH Farben.",
    price: 6.99,
    stock: 25,
    active: true,
    image: "https://picsum.photos/seed/sweatbands/400/300",
    sku: "TCH-SWEAT-001",
    hasVariants: false,
  },
  {
    id: 6,
    name: "Trinkflasche TCH Edition",
    description:
      "Isolierte Trinkflasche 750ml mit TCH Logo. Hält bis zu 24h kalt.",
    price: 18.99,
    stock: 20,
    active: true,
    image: "https://picsum.photos/seed/bottle/400/300",
    sku: "TCH-BOTTLE-001",
    hasVariants: false,
  },
];

export default function Shop() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const [sizeGuideIndex, setSizeGuideIndex] = useState(0);
  const [activeSizeGuideType, setActiveSizeGuideType] = useState("HOODIE");
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const sizeGuides = [
    {
      id: "damen-hoodie",
      typ: "HOODIE",
      title: "Damen Hoodie",
      src: "/shop/Groessen/DamenGroessenHoodie.jpeg",
      alt: "Größentabelle Damen",
    },
    {
      id: "herren-hoodie",
      typ: "HOODIE",
      title: "Herren Hoodie",
      src: "/shop/Groessen/HerrenGroessenHoodie.jpeg",
      alt: "Größentabelle Herren",
    },
    {
      id: "jugend-hoodie",
      typ: "HOODIE",
      title: "Jugend Hoodie",
      src: "/shop/Groessen/KinderGroessenHoodie.jpeg",
      alt: "Größentabelle Jugend",
    },
    {
      id: "jugend-trikot",
      typ: "TRIKOT",
      title: "Jugend Trikot",
      src: "/shop/Groessen/KinderGroessenTrikot.jpeg",
      alt: "Größentabelle Jugend",
    },
    {
      id: "damen-trikot",
      typ: "TRIKOT",
      title: "Damen Trikot",
      src: "/shop/Groessen/DamenGroessenTrikot.jpeg",
      alt: "Größentabelle Damen",
    },
    {
      id: "herren-trikot",
      typ: "TRIKOT",
      title: "Herren Trikot",
      src: "/shop/Groessen/HerrenGroessenTrikot.jpeg",
      alt: "Größentabelle Herren",
    },
  ];

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        selectedProductTypes.forEach((productType) => {
          params.append("productType", productType);
        });
        selectedAudiences.forEach((audience) => {
          params.append("audience", audience);
        });

        const query = params.toString();
        const response = await fetch(
          `/api/products${query ? `?${query}` : ""}`,
        );
        const data = await response.json();

        if (!response.ok) {
          console.error("Failed to fetch products:", data?.error || data);
          setProducts([]);
          return;
        }

        if (!Array.isArray(data)) {
          console.error("Unexpected products response:", data);
          setProducts([]);
          return;
        }

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedProductTypes, selectedAudiences]);

  const toggleFilterValue = (value, selectedValues, setSelectedValues) => {
    setSelectedValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((entry) => entry !== value)
        : [...prevValues, value],
    );
  };

  const clearAllFilters = () => {
    setSelectedProductTypes([]);
    setSelectedAudiences([]);
  };

  const totalActiveFilters =
    selectedProductTypes.length + selectedAudiences.length;
  const sizeGuideTypes = [...new Set(sizeGuides.map((guide) => guide.typ))];
  const activeGuides = sizeGuides.filter(
    (guide) => guide.typ === activeSizeGuideType,
  );
  const sizeGuideTypeLabels = {
    HOODIE: "Hoodie",
    TRIKOT: "Trikot",
  };

  const renderFilterContent = ({ showCloseButton = false } = {}) => (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-tch-blue">Filter</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-sm font-medium text-tch-blue hover:underline hover:cursor-pointer"
          >
            Zurücksetzen
          </button>
          {showCloseButton && (
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(false)}
              className="rounded border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
            >
              Schließen
            </button>
          )}
        </div>
      </div>

      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-semibold text-gray-800">
          Produktart
        </legend>
        <div className="space-y-2">
          {PRODUCT_TYPE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedProductTypes.includes(option.value)}
                onChange={() =>
                  toggleFilterValue(
                    option.value,
                    selectedProductTypes,
                    setSelectedProductTypes,
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-tch-blue focus:ring-tch-blue"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-gray-800">
          Geschlecht / Zielgruppe
        </legend>
        <div className="space-y-2">
          {AUDIENCE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selectedAudiences.includes(option.value)}
                onChange={() =>
                  toggleFilterValue(
                    option.value,
                    selectedAudiences,
                    setSelectedAudiences,
                  )
                }
                className="h-4 w-4 rounded border-gray-300 text-tch-blue focus:ring-tch-blue"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );

  const handleAddToCart = (product, variantId = null) => {
    setCart((prevCart) => {
      let variant = null;
      let actualStock = product.stock;

      if (product.hasVariants && variantId) {
        variant = product.variants.find((v) => v.id === variantId);
        actualStock = variant.stock;
      }

      // Group order products have unlimited "stock" for cart purposes
      if (product.isGroupOrder) {
        actualStock = Infinity;
      }

      const cartKey = variantId || product.id;
      const existingItem = prevCart.find((item) => item.cartKey === cartKey);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: Math.min(item.quantity + 1, actualStock) }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          cartKey,
          variantId,
          variant: variant ? variant.size : null,
          stock: actualStock,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartKey, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(cartKey);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartKey === cartKey ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (cartKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartKey !== cartKey));
  };

  const handleCheckout = () => {
    router.push("/shop/checkout");
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <>
      <Head>
        <title>Shop | Tennis Club Holzminden von 1928 e.V</title>
        <meta name="description" content="Unser Tennis Shop" />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-tch-blue">Shop</h1>
            <div className="mx-3 mb-0 rounded-lg border-2 border-amber-500 bg-amber-100 px-4 py-3 text-amber-900">
              <p className="text-sm md:text-base font-semibold">
                TEST-MODUS: Bestellungen werden zu Testzwecken erfasst und per
                E-Mail bestaetigt (nicht verbindlich).
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-tch-blue text-white rounded hover:bg-tch-blue/90 hover:cursor-pointer"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
          <div className="mb-8 overflow-hidden rounded-lg border border-gray-200">
            <div className="relative h-40 w-full md:h-56 lg:h-80">
              <Image
                src="/shop/HeaderShop2.jpg"
                alt="Shop Header"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="mb-4 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
            >
              Filter
              {totalActiveFilters > 0 && (
                <span className="rounded-full bg-tch-blue px-2 py-0.5 text-xs font-semibold text-white">
                  {totalActiveFilters}
                </span>
              )}
            </button>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[230px_1fr]">
            <aside className="hidden h-fit rounded-lg border border-gray-200 bg-gray-50 p-5 lg:block">
              {renderFilterContent()}
            </aside>

            <section>
              {totalActiveFilters > 0 && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {selectedProductTypes.map((productType) => (
                    <button
                      key={`productType-${productType}`}
                      type="button"
                      onClick={() =>
                        setSelectedProductTypes((prevValues) =>
                          prevValues.filter((entry) => entry !== productType),
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-tch-blue/20 bg-tch-blue/10 px-3 py-1 text-xs font-medium text-tch-blue hover:bg-tch-blue/20 hover:cursor-pointer"
                    >
                      Produktart:{" "}
                      {PRODUCT_TYPE_LABELS[productType] || productType}
                      <span aria-hidden="true">x</span>
                    </button>
                  ))}
                  {selectedAudiences.map((audience) => (
                    <button
                      key={`audience-${audience}`}
                      type="button"
                      onClick={() =>
                        setSelectedAudiences((prevValues) =>
                          prevValues.filter((entry) => entry !== audience),
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100 hover:cursor-pointer"
                    >
                      Zielgruppe: {AUDIENCE_LABELS[audience] || audience}
                      <span aria-hidden="true">x</span>
                    </button>
                  ))}
                </div>
              )}

              {loading ? (
                <p className="text-center text-gray-500">
                  Produkte werden geladen...
                </p>
              ) : safeProducts.length === 0 ? (
                <p className="text-center text-gray-500">
                  Keine Produkte verfügbar
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {safeProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {isMobileFiltersOpen && (
            <div
              className="fixed inset-0 z-40 lg:hidden"
              aria-modal="true"
              role="dialog"
            >
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="absolute inset-0 bg-black/40"
                aria-label="Filter schließen"
              />
              <aside className="absolute left-0 top-0 h-full w-[88vw] max-w-sm overflow-y-auto border-r border-gray-200 bg-white p-5 shadow-xl">
                {renderFilterContent({ showCloseButton: true })}
              </aside>
            </div>
          )}

          <div className="mt-12 border border-gray-200 rounded-lg bg-gray-50 p-5 md:p-7">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-2xl font-bold text-tch-blue">Größenguide</h2>
              <p className="text-sm text-gray-600">
                Damen, Herren und Jugend. Zum Vergrößern einfach auf ein Bild
                klicken.
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {sizeGuideTypes.map((type) => {
                const isActive = type === activeSizeGuideType;

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setActiveSizeGuideType(type);
                      setSizeGuideIndex(0);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:cursor-pointer ${
                      isActive
                        ? "border-tch-blue bg-tch-blue text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-tch-blue hover:text-tch-blue"
                    }`}
                  >
                    {sizeGuideTypeLabels[type] || type}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {activeGuides.map((guide) => (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => {
                    setSizeGuideIndex(
                      activeGuides.findIndex((g) => g.id === guide.id),
                    );
                    setOpenSizeGuide(true);
                  }}
                  className="group text-left bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer"
                >
                  <div className="relative aspect-4/3 bg-gray-100">
                    <Image
                      src={guide.src}
                      alt={guide.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <span className="font-semibold text-tch-blue">
                      {guide.title}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-gray-700">
                      Vergrößern
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <Lightbox
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
          open={openSizeGuide}
          close={() => setOpenSizeGuide(false)}
          plugins={[Thumbnails]}
          index={sizeGuideIndex}
          slides={activeGuides.map((guide) => ({
            src: guide.src,
            alt: guide.alt,
          }))}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </Layout>
    </>
  );
}
