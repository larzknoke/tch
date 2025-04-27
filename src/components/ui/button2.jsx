import { ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

function Button2({ children, href = "", style = "blue", className }) {
  return (
    <Link
      href={href}
      className={`button ${className} ${
        style == "blue " ? "bg-tch-blue text-white" : "bg-white text-tch-blue"
      } `}
    >
      {children}
      <ChevronDoubleRightIcon className="size-5 pt-1" />
    </Link>
  );
}

export default Button2;
