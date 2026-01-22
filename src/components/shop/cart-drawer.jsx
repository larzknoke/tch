import { Drawer, Portal, CloseButton } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";

const roboto_cond = Roboto_Condensed({ subsets: ["latin"] });

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0,
  );

  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="end"
      size={{ base: "full", md: "md" }}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content className={roboto_cond.className}>
            <Drawer.Header borderBottomWidth="1px">
              <Drawer.Title>Warenkorb ({cart.length})</Drawer.Title>
            </Drawer.Header>

            <Drawer.Body>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-8">
                  Ihr Warenkorb ist leer
                </p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.cartKey}
                      className="flex gap-3 border-b pb-4"
                    >
                      {item.image && (
                        <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {item.name}
                          {item.variant && (
                            <span className="text-sm text-gray-600 ml-2">
                              - Größe: {item.variant}
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {parseFloat(item.price).toFixed(2)} €
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.cartKey, item.quantity - 1)
                            }
                            className="p-1 border rounded hover:bg-gray-100"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.cartKey, item.quantity + 1)
                            }
                            className="p-1 border rounded hover:bg-gray-100"
                            disabled={item.quantity >= item.stock}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.cartKey)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Drawer.Body>

            {cart.length > 0 && (
              <Drawer.Footer
                borderTopWidth="1px"
                flexDirection="column"
                alignItems="stretch"
                gap={4}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">Gesamtsumme:</span>
                  <span className="text-2xl font-bold text-tch-blue">
                    {total.toFixed(2)} €
                  </span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-tch-blue text-white py-3 rounded-lg hover:bg-tch-blue/90 font-semibold"
                >
                  Zur Kasse
                </button>
              </Drawer.Footer>
            )}
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
