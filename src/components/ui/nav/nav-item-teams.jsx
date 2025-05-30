import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function NavItemTeams() {
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
        className="flex items-center gap-2 focus:outline-hidden"
      >
        TEAMS
        {/* <ChevronDownIcon className="size-5 group-data-open:rotate-180" /> */}
      </PopoverButton>
      <PopoverPanel
        anchor={{ to: "bottom start", gap: "20px" }}
        transition
        className="nav-item-dropdown"
      >
        <a className="nav-item group" href="/club/gelaende">
          <span className="group-hover:bg-[length:100%_2px]">Jugend-Teams</span>
        </a>
        <a className="nav-item group" href="/club/vorstand">
          <span className="group-hover:bg-[length:100%_2px]">
            Senioren-Teams
          </span>
        </a>
      </PopoverPanel>
    </Popover>
  );
}

export default NavItemTeams;
