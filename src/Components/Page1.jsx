import { Typography } from "@material-tailwind/react";
import React from "react";

const Page1 = () => {
  return (
    <div className="w-full h-screen relative">
      <figure className="w-full h-full">
        <img
          loading="lazy"
          src="/assets/img_hero_2.webp"
          alt="hero image"
          className="w-full h-full object-cover"
        />
        <figcaption className="absolute bottom-8 left-8 text-white">
          <div className="uppercase">
            <div className="font-poppins text-[1.5rem] sm:text-[3rem] lg:text-[5rem]">
              Precision Care for
            </div>
            <div className="font-poppins text-[1.5rem] sm:text-[3rem] lg:text-[5rem]">
              Premature Life
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default Page1;
