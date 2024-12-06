import React from "react";
import { Card4 } from "./Card4";
const Page7 = () => {
  return (
    <div className="bg-[#f7f7f7] min-h-screen flex flex-col mt-[8%] xl:mt-[5%] px-10 md:px-28 items-center mb-10">
      <div className="flex flex-col items-center w-full gap-y-6">
        <div className="mt-20 text-2xl lg:text-2xl xl:text-5xl text-[#2A2A2A]">
          Discover the Expertise Behind Our Innovations
        </div>
        <div className="text-xl lg:text-xl xl:text-2xl text-[#2A2A2A]">
          Our team is dedicated to advancing neonatal care with exceptional
          skills and unwavering commitment.
        </div>
        <div className="flex flex-wrap items-center justify-center w-full sm:flex-col md:flex-row lg:flex-row xl:flex-row gap-7">
          <Card4
            name={"Gajendra Singh"}
            image={"/assets/img_rectangle_76.png"}
            post={"Mentor"}
          />
          <Card4
            name={"Satvasheel Powar"}
            image={"/assets/img_rectangle_78.png"}
            post={"Mentor"}
          />
          <Card4
            name={"Keshav verma"}
            image={"/assets/img_rectangle_79.png"}
            post={"Mechanical lead"}
          />
          <Card4
            name={"Vatsal Hariramani"}
            image={"/assets/img_rectangle_77.png"}
            post={"Electronics and Software Lead"}
          />
          <Card4
            name={"Aman Sikarwar"}
            image={"/assets/aman_pic.jpg"}
            post={"Software Engineer"}
          />
          <Card4
            name={"Badal Gupta"}
            image={"/assets/badal_gupta.jpg"}
            post={"Mechanical Engineer"}
          />
          <Card4
            name={"Dheeraj"}
            image={"/assets/dheeraj_pic.jpg"}
            post={"Electronics Engineer"}
          />
        </div>
      </div>

      {/* Sponsor Section */}
      <div className="flex flex-col items-center justify-center w-full mt-10 ">
        <div className="text-xl">In collaboration with</div>
        <div
          className="grid w-full grid-cols-2 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 lg:gap-8 xl:gap-6 md:gap-6"
          id="collabs"
        >
          <img
            loading="lazy"
            src="/assets/img_all_india_insti.png"
            className="object-contain w-36 h-36"
            alt="All India Institute"
          />
          <img
            loading="lazy"
            src="/assets/img_custom_logo_img_full_high.png"
            className="object-contain w-36 h-36"
            alt="Custom Logo"
          />
          <img
            loading="lazy"
            src="/assets/img_ihub_logo_new_2.png"
            className="object-contain w-36 h-36"
            alt="iHub Logo"
          />
          <img
            loading="lazy"
            src="/assets/img_images_1.png"
            className="object-contain w-36 h-36"
            alt="Logo 1"
          />
          <img
            loading="lazy"
            src="/assets/img_indian_institut.png"
            className="object-contain w-36 h-36"
            alt="Indian Institute"
          />
          <img
            loading="lazy"
            src="/assets/img_images_1_118x118.png"
            className="object-contain w-36 h-36"
            alt="Logo 2"
          />
        </div>
      </div>
    </div>
  );
};

export default Page7;
