import { useEffect, useState } from "react";
import { NavbarMobile, NavbarPC } from "@/components";

interface NavbarProps {
  active?: boolean;
}

export function Navbar({ active }: NavbarProps) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {width < 700 ? (
        <NavbarMobile active={active} />
      ) : (
        <NavbarPC active={active} />
      )}
    </>
  );
}

export default Navbar;
