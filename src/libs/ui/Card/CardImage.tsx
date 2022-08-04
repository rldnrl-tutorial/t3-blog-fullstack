import Image from "next/image";
import React from "react";
import { useCardContext } from "./Card";

type CardImageProps = {
  src?: string;
  alt?: string;
};

export default function CardImage(props: CardImageProps) {
  return (
    <>
      {props.src ? (
        <div className="w-full h-64 relative rounded">
          <Image
            className="rounded-t-lg"
            layout="fill"
            objectFit="cover"
            src={props.src}
            alt={props?.alt || "image"}
          />
        </div>
      ) : null}
    </>
  );
}
