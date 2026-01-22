"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Portal, Select, Spacer, createListCollection } from "@chakra-ui/react";

export default function ProductCard({ product, onAddToCart }) {
  const [selectedVariant, setSelectedVariant] = useState(null);

  const variantCollection = createListCollection({
    items: (product.variants || []).map((v) => ({
      label: `${v.size} ${v.stock === 0 ? "(Ausverkauft)" : `(${v.stock} verfügbar)`}`,
      value: String(v.id),
      disabled: v.stock === 0,
    })),
  });

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

  const isOutOfStock = getAvailableStock() === 0;

  return (
    <div className="bg-gray-100 border border-gray-300 rounded overflow-hidden hover:shadow-lg transition-shadow duration-400 flex flex-col h-full">
      {product.image && (
        <div className="relative h-48 bg-gray-100">
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
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
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
