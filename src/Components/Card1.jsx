import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip
} from "@material-tailwind/react";

export function Card1({ mode, description, image_path }) {
  return (
    <Card className="w-2/3 mt-10 overflow-hidden sm:w-full lg:w-3/5 md:flex-row sm:h-76 md:h-[15rem]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex items-center justify-center object-contain m-0 rounded-none md:w-1/2"
      >
        <img
          loading="lazy"
          src={image_path}
          className="w-full h-[15rem]"
          alt=""
        />
      </CardHeader>
      <CardBody className="md:w-1/2 ">
        <Typography variant="h5" className="text-black">
          {mode}
        </Typography>
        <Typography>{description}</Typography>
      </CardBody>
    </Card>
  );
}
