import React, { ReactNode } from "react";

type CardDescriptionProps = {
  children: ReactNode;
};

export default function CardDescription(props: CardDescriptionProps) {
  return (
    <p className="min-h-[100px] mb-3 font-normal text-gray-700 dark:text-gray-400">
      {props.children}
    </p>
  );
}
