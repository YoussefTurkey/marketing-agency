"use client";
import { useEffect, useState } from "react";

const useCountUp = (end: number, duration = 2000, startCount = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCount) return;

    let start = 0;
    const increment = end / (duration / 16); // 16ms ≈ 60fps

    const handle = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(handle);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [end, duration, startCount]);

  return count;
};

export default useCountUp;
