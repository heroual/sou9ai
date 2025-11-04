import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 z-50 p-8"
    >
      <ul className="flex gap-8 text-lg">
        <li>
          <Link
            to="/"
            className="text-foreground/90 hover:text-moroccan-gold transition-colors duration-300"
          >
            السويقة
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-foreground/90 hover:text-moroccan-gold transition-colors duration-300"
          >
            شكون حنا
          </Link>
        </li>
        <li>
          <a
            href="#"
            className="text-foreground/90 hover:text-moroccan-gold transition-colors duration-300"
          >
            تواصل معنا
          </a>
        </li>
      </ul>
    </motion.nav>
  );
};
