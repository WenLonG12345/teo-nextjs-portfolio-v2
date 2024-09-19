"use client";

import { AnimatePresence, AnimationProps, HTMLMotionProps, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const MotionDiv = motion.div;

export const MotionSection = ({
  children,
  animationProps,
}: {
  children: React.ReactNode;
  animationProps: HTMLMotionProps<"div"> & AnimationProps;
}) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    if (!domLoaded) {
      setDomLoaded(true);
    }
  }, []);

  return (
    <AnimatePresence initial={false}>
      {domLoaded ? (
        <motion.div {...animationProps}>{children}</motion.div>
      ) : (
        children
      )}
    </AnimatePresence>
  );
};