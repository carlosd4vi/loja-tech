import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Evitar que a página role para baixo
// Quando o usuário clicar em um link.

const ScrollToTop = () => {
  
  const { pathname } = useLocation();

  useEffect(() => {
   
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;