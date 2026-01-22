import { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductCard({ product, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const handleAddToCart = () => {
    if (product.hasVariants && !selectedVariant) {
      alert("Bitte wählen Sie eine Größe");
      return;
    }
    onAddToCart(product, selectedVariant);
  };

  const getAvailableStock = () => {
    if (!product.hasVariants) return product.stock;
    if (!selectedVariant) return 0;
    const variant = product.variants.find((v) => v.id === selectedVariant);
    return variant?.stock || 0;
  };

  const isOutOfStock = getAvailableStock() === 0;

  return (
    <div className="bg-gray-100 border border-gray-300 rounded overflow-hidden hover:shadow-lg transition-shadow duration-400">
      {product.image && (
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-tch-blue  font-semibold text-lg mb-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {product.hasVariants && (
          <div className="mb-4 flex flex-row items-center gap-4 ">
            <label className="text-sm font-medium block">Größe:</label>
            <select
              value={selectedVariant || ""}
              onChange={(e) => setSelectedVariant(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Bitte wählen</option>
              {product.variants.map((variant) => (
                <option
                  key={variant.id}
                  value={variant.id}
                  disabled={variant.stock === 0}
                >
                  {variant.size}{" "}
                  {variant.stock === 0
                    ? "(Ausverkauft)"
                    : `(${variant.stock} verfügbar)`}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-tch-blue">
              {parseFloat(product.price).toFixed(2)} €
            </p>
            {!product.hasVariants && (
              <p className="text-sm text-gray-500">
                {product.stock > 0
                  ? `Auf Lager: ${product.stock}`
                  : "Ausverkauft"}
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || (product.hasVariants && !selectedVariant)}
            className="bg-tch-blue text-white px-4 py-2 rounded hover:bg-tch-blue/90 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 hover:cursor-pointer"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {/* In den Warenkorb */}
          </button>
        </div>
      </div>
    </div>
  );
}
