import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link as Scrolllink } from "react-scroll";

const SITEMAP = [
  {
    title: "Navigate",
    links: ["Product", "Accessories", "Team", "Colllaborations"],
    link_map: ["4", "5", "7", "collabs"]
  },
  {
    title: "Contact Us",
    links: ["vatsal@syncubator.in", "keshav@syncubator.in"]
  },
  {
    title: "Headquarters",
    links: ["IIT Mandi,", "Kamand, HP 175001"]
  }
];

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="w-screen h-auto flex flex-col mt-[3%] xl:mt-[5%] px-10 md:px-28 items-center mb-10">
      <div className="flex flex-col items-center justify-center w-full">
        {/* Logo and Title */}
        <div className="flex flex-col items-center justify-center text-center">
          <Scrolllink
            to="home"
            smooth={true}
            suration={500}
            className="cursor-pointer"
          >
            <img
              loading="lazy"
              className="w-28"
              src="/src/assets/img_syncubator_logo.png"
              alt="Syncubator Logo"
            />
            <Typography
              variant="h2"
              className="font-logo bg-gradient-to-r from-[#EE1B49] to-[#FF99AA] bg-clip-text text-transparent"
            >
              Syncubator
            </Typography>
          </Scrolllink>
          <Typography variant="h6">Precise Care for Premature Life</Typography>
        </div>

        {/* Sitemap */}
        <div className="flex justify-between w-full ml-[10%]">
          <div className="grid w-full grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            {SITEMAP.map(({ title, links, link_map }, key) => (
              <div key={key} className="w-full text-left">
                <Typography
                  variant="small"
                  className="mb-4 font-bold uppercase opacity-50 text-[#EE1B49]"
                >
                  {title}
                </Typography>
                <hr className="h-px w-1/2  bg-red-200 border-0 " />

                <ul className="space-y-1">
                  {links.map((link, idx) => (
                    <Typography key={idx} as="li" className="font-medium">
                      <Scrolllink
                        to={link_map ? link_map[idx] : ""}
                        smooth={true}
                        duration={500}
                        className="inline-block py-1 pr-2 hover:translate-x-3 duration-500 hover:text-[#EE1B49]"
                      >
                        {link}
                      </Scrolllink>
                    </Typography>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-center w-full py-4 border-t border-blue-gray-50 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 font-normal text-center text-blue-gray-900 md:mb-0"
          >
            Copyright &copy; {currentYear} Syncubator Inc. All Rights Reserved.
          </Typography>
          {/* Placeholder for Social Media Icons */}
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            {/* Add your social media icons here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
