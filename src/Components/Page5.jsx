import React from "react";
import { Card2 } from "./Card2";

const Page5 = () => {
  return (
    <div className="w-screen md:min-h-screen flex flex-col justify-center mt-[8%] xl:mt-[5%]  px-10 md:px-28 items-center mb-10">
      <div className="w-4/5 text-3xl lg:text-5xl xl:text-6xl uppercase">
        A&nbsp;
        <span
          className="text-[#EE1B49]
"
        >
          feature
        </span>
        &nbsp;filled incubator for highly precise diagnosis.
      </div>
      <div className="flex  gap-x-6 w-full flex-col  items-center  ">
        <Card2
          title={"Wireless Baby Montoring"}
          description={"No hassle of multiple probes and wires"}
          image_path={"/src/assets/img_syncubator_img_2.png"}
          class_style={`sm:w-full   lg:w-4/5 h-[22rem] mt-10 overflow-hidden flex md:flex-row-reverse text-center`}
        />
        <Card2
          title={"Smart Sync"}
          description={"Always stay connected via App based monitoring"}
          image_path={"/src/assets/img_syncubator_img_2_692x648.png"}
          class_style={` sm:w-full w-2/3 sm:w-full  lg:w-4/5 h-[22rem]  mt-10 text-center overflow-hidden flex md:flex-row `}
        />
        <Card2
          title={"Lightweight and Compact"}
          description={"Design that makes transportation less cumbersome"}
          image_path={"/src/assets/img_syncubator_img_2_620x646.png"}
          class_style={` sm:w-full w-2/3 sm:w-full lg:w-4/5 h-[22rem]  mt-10 overflow-hidden flex  items-center  md:flex-row-reverse text-center`}
        />
      </div>
    </div>
  );
};

export default Page5;
