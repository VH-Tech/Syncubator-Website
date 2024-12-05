import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip
} from "@material-tailwind/react";

export function Card2({ title, description, image_path, class_style }) {
  return (
    <Card className={class_style}>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none  md:w-1/2 h-[20rem] flex justify-center items-center"
      >
        <img loading="lazy" src={image_path} alt="" />
      </CardHeader>
      <CardBody className="md:w-1/2 flex flex-col justify-center h-[20rem]">
        <Typography
          variant="h5"
          className="text-3xl text-black lg:text-3xl xl:text-3xl"
        >
          {title}
        </Typography>
        <Typography className="text-xl lg:text-2xl xl:text-2xl">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}
