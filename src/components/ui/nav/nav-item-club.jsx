import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function NavItemClub() {
  const popoverButtonRef = useRef();

  useEffect(() => {
    const current = popoverButtonRef.current;
    if (!current) {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      const hovered = mutations.find(
        ({ attributeName }) => attributeName === "data-hover"
      );
      const active = current.hasAttribute("data-active");

      if (hovered && !active) {
        current.click();
      }
    });

    observer.observe(current, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [popoverButtonRef]);

  return (
    <Popover className="relative group">
      <PopoverButton
        ref={popoverButtonRef}
        className="flex items-center gap-2 focus:outline-none"
      >
        DER CLUB
        <ChevronDownIcon className="size-5 group-data-[open]:rotate-180" />
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom start", gap: "10px" }}
        transition
        className="nav-item-dropdown"
      >
        <a className="nav-item group" href="/club/gelaende">
          <span className="group-hover:bg-[length:100%_1px]">
            Clubgelände & Anfahrt
          </span>
        </a>
        <a className="nav-item group" href="/club/vorstand">
          <span className="group-hover:bg-[length:100%_1px]">Vorstand</span>
        </a>
        <a className="nav-item group" href="/club/aufnahme">
          <span className="group-hover:bg-[length:100%_1px]">
            Aufnahmeantrag
          </span>
        </a>
        <a className="nav-item group" href="/club/satzung">
          <span className="group-hover:bg-[length:100%_1px]">Satzung</span>
        </a>
      </PopoverPanel>
    </Popover>
  );
}

export default NavItemClub;
