import { Typography } from "@material-tailwind/react";
import React from "react";

const Page1 = () => {
  return (
    <div className="w-full h-full">
      <figure className="relative w-full h-full">
        <img
          loading="lazy"
          src="/assets/img_hero.jpg"
          alt="hero image"
          className="object-cover object-center w-full h-full"
        />
        <figcaption className="uppercase absolute bottom-4 ml-8 flex text-white lg:text-[5rem] md:text-[3rem] sm:text-[1.5rem]">
          <div>
            <div className="font-poppins">Precision Care for</div>

            <div className="font-poppins ">Premature Life</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default Page1;
