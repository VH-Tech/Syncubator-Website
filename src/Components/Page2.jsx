import React from "react";

const Page2 = () => {
  return (
    <div className="flex items-center justify-center w-screen md:min-h-screen md:mt-6 xl:mt-0">
      <div className="w-full px-10 md:px-28 h-full flex flex-col mt-[6%] justify-center items-center gap-y-1 xl:flex-row-reverse">
        <div className="flex flex-col items-center justify-center gap-y-4 xl:w-1/2">
          <div className="text-left sm:text-3xl lg:text-5xl text-wrap font-source ">
            Transforming infant care through pioneering and advanced technology
          </div>
          <div className="text-left sm:text-xl lg:text-3xl md:text-2xl  text-wrap text-[#828282]">
            We're innovating the next era of smarter, more efficient infant care
            solutions specifically designed for the indian healthcare system
          </div>
        </div>

        <div className="xl:w-1/2 md:w-3/5 lg:w-1/2">
          <img
            loading="lazy"
            src="/assets/img_rectangle_66_3.webp"
            className="h-auto max-h-[80vh] w-full object-cover"
            // className="sm:h-full md:h-3/5 lg:h-[40rem] xl:w-1/2 "
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Page2;
