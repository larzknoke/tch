"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Portal, Select, Spacer, createListCollection } from "@chakra-ui/react";
import { formatProductType, formatAudience } from "@/lib/product-taxonomy";

export default function ProductCard({ product, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const productTypeLabel = formatProductType(product.productType);

  const variantCollection = createListCollection({
    items: (product.variants || []).map((v) => ({
      label: product.isGroupOrder ? `${v.size}` : `${v.size}`,
      value: String(v.id),
      disabled: !product.isGroupOrder && v.stock === 0,
    })),
  });

  // : `${v.size} ${v.stock === 0 ? "(Ausverkauft)" : `(${v.stock} verfügbar)`}`,
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
    const variant = product.variants?.find((v) => v.id === selectedVariant);
    return variant?.stock || 0;
  };

  const isOutOfStock = !product.isGroupOrder && getAvailableStock() === 0;
  const isGroupOrderClosed =
    product.isGroupOrder &&
    product.groupOrderStatus !== "open" &&
    product.groupOrderStatus !== null;

  return (
    <div className="bg-gray-100 border border-gray-300 rounded overflow-hidden hover:shadow-lg transition-shadow duration-400 flex flex-col h-full">
      {product.image && (
        <div className="relative h-48 bg-white border-b border-gray-200">
          <Image
            src={`/shop/${product.image}`}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-tch-blue  font-semibold text-lg mb-2">
          {product.name}
        </h3>
        {(productTypeLabel ||
          (product.audiences && product.audiences.length > 0)) && (
          <div className="mb-3 flex flex-wrap gap-2">
            {productTypeLabel && (
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                {productTypeLabel}
              </span>
            )}
            {(product.audiences || []).map((audience) => (
              <span
                key={audience}
                className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
              >
                {formatAudience(audience)}
              </span>
            ))}
          </div>
        )}
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Group Order Info */}
        {product.isGroupOrder && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded p-3 text-sm">
            <p className="font-semibold text-tch-blue mb-1 text-sm">
              <UserGroupIcon className="h-4 w-4 inline-block mr-1 mb-1 text-tch-blue" />
              Sammelbestellung
            </p>
            {product.groupOrderStatus === "priced" ||
            product.groupOrderStatus === "fulfilled" ? (
              <p className="text-green-700 font-semibold text-sm">
                Richtwert: {parseFloat(product.groupOrderFinalPrice).toFixed(2)}
                {" "}€
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Betrag wird nach Ende der Sammelphase festgelegt.
              </p>
            )}
            {product.groupOrderDeadline && (
              <p className="text-gray-500 mt-1 text-sm">
                Ende Sammelphase:{" "}
                {new Date(product.groupOrderDeadline).toLocaleDateString(
                  "de-DE",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )}
              </p>
            )}
            {/* <p className="text-gray-500 mt-1 text-sm">
              Bisher bestellt: <strong>{product.groupOrderCount || 0}</strong>{" "}
              Stück
            </p> */}
            {isGroupOrderClosed && (
              <p className="text-orange-600 font-semibold mt-1">
                Sammelphase beendet
              </p>
            )}
          </div>
        )}

        {product.hasVariants && product.variants && (
          <div className="mb-4 flex flex-row items-center gap-4 ">
            <Select.Root
              collection={variantCollection}
              width="100%"
              value={selectedVariant != null ? [String(selectedVariant)] : []}
              onValueChange={(selection) => {
                // `selection.value` can be an array for the new Select API
                const raw = selection?.value ?? "";
                const v = Array.isArray(raw) ? (raw[0] ?? "") : raw;
                setSelectedVariant(v === "" ? null : Number(v));
              }}
            >
              <Select.HiddenSelect />
              {/* <Select.Label>Größe:</Select.Label> */}
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Größe wählen" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {variantCollection.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </div>
        )}
        <div className="flex items-center justify-between mt-auto gap-4">
          <div className="flex flex-row items-center justify-between gap-4 w-full">
            {product.isGroupOrder ? (
              <p className="text-sm text-gray-500 italic">
                Betrag noch offen
              </p>
            ) : (
              <p className="text-2xl font-bold text-tch-blue">
                {parseFloat(product.price).toFixed(2)} €
              </p>
            )}
            {!product.isGroupOrder && !product.hasVariants && (
              <p className="text-sm text-gray-500">
                {product.stock > 0
                  ? `Auf Lager: ${product.stock}`
                  : "Ausverkauft"}
              </p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={
              isGroupOrderClosed ||
              isOutOfStock ||
              (product.hasVariants && !selectedVariant)
            }
            className="bg-tch-blue text-white px-4 py-2 rounded hover:bg-tch-blue/90 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 hover:cursor-pointer"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
