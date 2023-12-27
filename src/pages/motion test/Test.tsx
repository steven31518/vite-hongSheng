import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
//useMotionTemplate
export default function TestMotion() {
  const lineRef = useRef(null);
  const baseY = useMotionValue(50);

  const scroll = useScroll({
    target: lineRef,
    offset: ["start 50%", "start 20%"],
  });

  const variableY = useTransform(scroll.scrollYProgress, [0, 1], [1, 2]);

  //   const variable = useTransform(baseY, [0, 100], [1, 2]);

  return (
    <div className="container h-[200vh] flex items-center justify-center">
      <div className="flex items-center">
        <motion.div
          className="w-20 h-20 bg-red-500"
          style={{
            scale: variableY,
          }}
        >
          Test Motion
        </motion.div>
        <div className="w-[1000px] h-2 bg-primary" ref={lineRef}></div>
      </div>
      <div className="w-full h-200px bg-primary"></div>
    </div>
  );
}
