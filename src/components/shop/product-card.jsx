import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
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
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-tch-blue">
              {parseFloat(product.price).toFixed(2)} €
            </p>
            <p className="text-sm text-gray-500">
              {product.stock > 0
                ? `Auf Lager: ${product.stock}`
                : "Ausverkauft"}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className="bg-tch-blue text-white px-4 py-2 rounded-lg hover:bg-tch-blue/90 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            In den Warenkorb
          </button>
        </div>
      </div>
    </div>
  );
}
