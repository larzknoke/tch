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
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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

  const sizeGuides = [
    {
      id: "damen",
      title: "Damen",
      src: "/shop/Groessen/DamenGroessen.jpeg",
      alt: "Größentabelle Damen",
    },
    {
      id: "herren",
      title: "Herren",
      src: "/shop/Groessen/HerrenGroessen.jpeg",
      alt: "Größentabelle Herren",
    },
    {
      id: "jugend",
      title: "Jugend",
      src: "/shop/Groessen/KinderGroessen.jpeg",
      alt: "Größentabelle Jugend",
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
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

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

  return (
    <>
      <Head>
        <title>Shop | Tennis Club Holzminden von 1928 e.V</title>
        <meta name="description" content="Unser Tennis Shop" />
      </Head>

      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 rounded-lg border-2 border-amber-500 bg-amber-100 px-4 py-3 text-amber-900">
            <p className="text-sm md:text-base font-semibold">
              TEST-MODUS: Bestellungen werden zu Testzwecken erfasst und per
              E-Mail bestaetigt (nicht verbindlich).
            </p>
          </div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-tch-blue">Shop</h1>
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

          {/* Products Grid */}
          {loading ? (
            <p className="text-center text-gray-500">
              Produkte werden geladen...
            </p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">
              Keine Produkte verfügbar
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {sizeGuides.map((guide) => (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => {
                    setSizeGuideIndex(
                      sizeGuides.findIndex((g) => g.id === guide.id),
                    );
                    setOpenSizeGuide(true);
                  }}
                  className="group text-left bg-white rounded border border-gray-200 overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer"
                >
                  <div className="relative aspect-[4/3] bg-gray-100">
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
          slides={sizeGuides.map((guide) => ({
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
