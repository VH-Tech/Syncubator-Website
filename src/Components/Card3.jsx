import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip
} from "@material-tailwind/react";

export function Card3({ mode, description, image_path }) {
  return (
    <Card className=" w-[18rem]  mt-10 border ">
      <CardHeader
        floated={false}
        className="m-0 h-[18rem] flex justify-center items-center rounded-none "
      >
        <img
          loading="lazy"
          src={image_path}
          className="h-[15rem] w-[100%]"
          alt=""
        />
      </CardHeader>
      <CardBody className="mt-2 ">
        <Typography variant="h5" className="text-black">
          {mode}
        </Typography>
        <Typography className="text-wrap">{description}</Typography>
      </CardBody>
    </Card>
  );
}
