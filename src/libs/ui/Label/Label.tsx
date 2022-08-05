import clsx from "clsx";
import React, { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label(props: LabelProps) {
  return (
    <label
      {...props}
      className={clsx(
        "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",
        props.className
      )}
    >
      {props.children}
    </label>
  );
}
