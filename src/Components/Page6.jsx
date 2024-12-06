import React from "react";
import { Card3 } from "./Card3";

const Page6 = () => {
  return (
    <div className="w-screen md:min-h-screen flex flex-col mt-[8%] xl:mt-[5%] px-10 md:px-28 items-center mb-10">
      <div className="w-4/5 text-3xl lg:text-5xl xl:text-6xl uppercase">
        paired with Advanced <span className="text-[#EE1B49]">accessories</span>{" "}
        for enhanced functionality
      </div>
      <div className="w-full flex overflow-x-scroll xl:justify-center hide-scroll-bar ">
        {/* Set each Card3 width to 15rem and ensure it's scrollable */}
        <div className="flex gap-6">
          <Card3
            mode={"Vital Band"}
            description={
              "Effortlessly monitor your baby's heart rate, oxygen levels, and temperature with our comfortable, real-time Vital Band."
            }
            image_path={"/assets/img_rectangle_85.png"}
          />
          <Card3
            mode={"Phototherapy Module"}
            description={
              "Deliver effective jaundice treatment with our advanced Phototherapy Module. Designed for safety and comfort, it provides optimal light therapy while ensuring gentle care for your baby."
            }
            image_path={"/assets/img_rectangle_85_232x304.png"}
          />
          <Card3
            mode={"Camera Module"}
            description={
              "Keep a close eye on your baby with our high-definition Camera Module, offering clear, real-time monitoring for added peace of mind and enhanced remote supervision."
            }
            image_path={"/assets/img_rectangle_85_1.png"}
          />
          <Card3
            mode={"Adjustable Mattress"}
            description={
              "Ensure optimal comfort with our Adjustable Mattress, designed to support your baby’s posture while adapting to their needs for better care and restful sleep."
            }
            image_path={"/assets/img_rectangle_85_2.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default Page6;
