import React, { ReactNode } from "react";

type CardDescriptionProps = {
  children: ReactNode;
};

export default function CardDescription(props: CardDescriptionProps) {
  return (
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {props.children}
    </p>
  );
}
