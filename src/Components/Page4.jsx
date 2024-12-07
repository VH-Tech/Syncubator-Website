import React from "react";
import { Card1 } from "./Card1";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";
const Page4 = () => {
  return (
    <div className="w-screen md:min-h-screen flex flex-col justify-center mt-[8%] xl:mt-[5%]  px-10 md:px-28">
      {/* text title */}
      <div className="flex flex-col justify-center w-full lg:flex-row gap-x-5">
        <div className="flex flex-col w-1/3 gap-y-2">
          <div className="text-2xl lg:text-3xl xl:text-5xl">Presenting</div>
          <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Syncubator
          </div>
        </div>
        <div className="lg:w-1/3 mt-3 lg:text-md xl:text-lg text-[#828282]">
          We aim to revolutionise neonatal care through innovative technology,
          ensuring every newborn receives the highest standard of care.
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-8">
        <Tabs value={"incubator"} className="flex flex-col items-center w-full">
          <TabsHeader className="w-full">
            <Tab key={"incubator"} value={"incubator"}>
              <img
                loading="lazy"
                src="/assets/img_thumbs_up.svg"
                className="h-10"
                alt=""
              />
            </Tab>
            <Tab key={"warm"} value={"warm"}>
              <img
                loading="lazy"
                src="/assets/img_warmer_mode_buttons.svg"
                className="h-10 "
              />
            </Tab>
          </TabsHeader>
          <TabsBody
            className=""
            animate={{
              initial: { x: 120 },
              mount: { x: 3 },
              unmount: { x: 100 }
            }}
          >
            <TabPanel
              className="flex items-center justify-center w-full"
              key={"incubator"}
              value={"incubator"}
            >
              <Card1
                mode={"Incubator Mode"}
                description={
                  "Precise thermoregulation and vitals control for critical situations"
                }
                image_path={"/assets/img_syncubator_img_2_620x646.webp"}
              />
            </TabPanel>
            <TabPanel
              className="flex items-center justify-center w-full"
              key={"warm"}
              value={"warm"}
            >
              <Card1
                mode={"Warmer Mode"}
                description={
                  "Natural thermal regulation with gentle warmth, focusing on comfort"
                }
                image_path={"/assets/img_rectangle_66_3.webp"}
              />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default Page4;
