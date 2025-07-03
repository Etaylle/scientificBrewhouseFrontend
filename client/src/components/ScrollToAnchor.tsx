import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToAnchor() {
  const [location] = useLocation();

  useEffect(() => {
    if (location.includes("#")) {
      const id = location.split("#")[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return null;
}
