import React from "react";

const Page3 = () => {
  return (
    <div className="w-screen md:min-h-screen bg-[#F7F7F7]">
      <div
        className=" w-full px-10 md:px-28 h-full flex flex-col xl:flex-row  justify-center items-center mt-[5%]
      pt-[2%]"
      >
        <div className="flex flex-col items-start xl:w-1/2 justify- xl:h-full gap-y-5">
          <div className="text-left sm:text-3xl lg:text-5xl text-wrap ">
            India is among the top 5 countries in number of{" "}
            <span className="text-[#EE1B49]">preterm births</span> every year
            <sup>#</sup>
          </div>
          <div className="text-left sm:text-xl lg:text-3xl md:text-2xl  text-wrap text-[#828282] ">
            Neonates need to be kept at a temperature of 37°C, at least for the
            first few weeks. This becomes quintessential in the case of preterm
            birth.
          </div>
        </div>
        <div className="w-full md:w-4/5 md:h-[135vh] xl:h-1/5  gap-1 md:gap-4  xl:w-1/2 flex  mt-7 overflow-hidden ">
          <div className="flex flex-col w-1/2 gap-y-1 md:gap-y-4 ">
            <img
              className="w-full"
              loading="lazy"
              src="/assets/img_rectangle_83.webp"
              alt=""
            />
            <img
              className="w-full "
              loading="lazy"
              src="/assets/img_rectangle_83_612x364.webp"
              alt=""
            />
          </div>
          <div className="flex flex-col w-1/2 gap-y-1 md:gap-y-4 ">
            <img
              className="w-full"
              loading="lazy"
              src="assets/img_rectangle_82.webp"
              alt=""
            />
            <img
              className="w-full h-fit"
              loading="lazy"
              src="assets/img_rectangle_80.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
