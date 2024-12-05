import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar
} from "@material-tailwind/react";

export function Card4({ name, image, post }) {
  return (
    <Card
      shadow={false}
      className="relative grid h-[20rem] w-full max-w-[15rem]
      min-w-[15rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className={`absolute inset-0 m-0 h-full w-full rounded-none  bg-cover bg-center`}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/40 via-black/20" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 -mb-9">
        <Typography variant="h5" className=" text-white">
          {name}
        </Typography>
        <Typography color="white">{post}</Typography>
      </CardBody>
    </Card>
  );
}
