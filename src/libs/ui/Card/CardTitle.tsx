import React, { ReactNode } from "react";
import { useCardContext } from "./Card";

type CardTitleProps = {
  children: ReactNode;
};

export default function CardTitle(props: CardTitleProps) {
  const { to } = useCardContext();
  return (
    <a href={to}>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.children}
      </h5>
    </a>
  );
}
