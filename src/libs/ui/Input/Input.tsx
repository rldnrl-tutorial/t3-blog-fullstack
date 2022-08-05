import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

type Size = "lg" | "md" | "sm";

const getInputSize = (size: Size = "md") => {
  switch (size) {
    case "lg":
      return "block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    case "md":
      return "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    case "sm":
      return "block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  }
};

type InputProps = {
  size?: Size;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({ size, ...props }: InputProps) {
  return (
    <input {...props} className={clsx(getInputSize(size), props.className)} />
  );
}
