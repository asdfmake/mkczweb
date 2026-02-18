"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ParalaxImage() {
  const [accelerator, setAccelerator] = useState(0.1);
  const [imgOffset, setImgOffset] = useState(0);

  const handleScroll = () => setImgOffset(window.scrollY - 1400);
  useEffect(() => {
    // You may want to throttle this. Might not need to though.
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const attrs = {
    style: { transform: `translateY(${imgOffset * accelerator}px)` },
  };
  return (
    <div
      className={
        "hidden sm:block absolute  sm:top-[250px] md:top-0 xl:right-16 lg:-right-16  sm:-right-48"
      }
      {...attrs}
    >
      <Image
        src="/man.png"
        width={710}
        height={525}
        alt="missing picture"
        className="md:scale-150"
      />
    </div>
  );
}

export default ParalaxImage;
