"use client";

import { randomUUID } from "crypto";
import {
  AnimatePresence,
  AnimationProps,
  HTMLMotionProps,
  motion,
} from "motion/react";
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

  if (domLoaded) return <motion.div {...animationProps}>{children}</motion.div>;

  return children;
};
