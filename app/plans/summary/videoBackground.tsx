import Image from "next/image";
import bg from "@/public/summaryBg-lg.jpg";

export default function BackgroundVideo() {
  return (
    <Image
      className="absolute top-0 left-0 w-full h-full object-cover -z-10 "
      alt="Background image cinema"
      src={bg}
      quality={100}
    ></Image>
  );
}

//   <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
