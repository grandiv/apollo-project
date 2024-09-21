import React from "react";
import Image from "next/image";

type Props = {};

const StartSectionBg = (props: Props) => {
  return (
    <div className="">
      <div className="absolute right-[30vw] z-10 transform translate-y-[34vw] rotate-[-10deg] w-1/3 max-w-[7.813vw] min-w-[7.813vw] aspect-square">
        <Image
          alt="astronaut"
          src="/astronaut.png"
          fill
          className="animate-bounce"
        />
      </div>
      <div className="absolute left-1 translate-y-[10vw] transform rotate-[30deg] w-1/3 max-w-[7.813vw] min-w-[7.813vw] aspect-square">
        <Image alt="ufo" src="/ufo.png" fill />
      </div>
      <div className="absolute left-[19.531vw] transform translate-y-[30vw] w-1/3 max-w-[7.813vw] min-w-[7.813vw] aspect-square">
        <Image alt="planet1" src="/planet1.png" fill />
      </div>
      <div className="absolute right-[17.188vw] transform translate-y-[11vw] w-1/3 max-w-[7.813vw] min-w-[7.813vw] aspect-square">
        <Image alt="planet3" src="/planet3.png" fill />
      </div>
      <div className="max-w-[1920px] max-h-[1080px]">
        <Image alt="ornament3" src="/ornament3.png" fill />
      </div>
    </div>
  );
};

export default StartSectionBg;
