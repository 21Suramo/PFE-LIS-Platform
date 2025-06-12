// src/components/common/PageTransition.jsx
import React from "react";
import { motion } from "framer-motion";

const variants = {
  initial: { rotateY: -45, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 45, opacity: 0 },
};

const transition = { duration: 0.6, ease: "easeInOut" };

export default function PageTransition({ children }) {
  return (
    <motion.div
      style={{
        perspective: 800,
        transformStyle: "preserve-3d",
        height: "100%",
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={transition}>
      {children}
    </motion.div>
  );
}
