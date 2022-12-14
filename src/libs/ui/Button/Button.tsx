import React, { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";
import clsx from "clsx";

type Variant = "solid" | "outline";
type Size = "sm" | "md" | "lg";
type Color = "default" | "success" | "danger";

const commonStyle =
  "flex items-center text-white focus:outline-none font-medium text-center focus:ring-4";

const getButtonSize = (size: Size = "md") => {
  switch (size) {
    case "sm":
      return "py-2 px-3 text-sm";
    case "md":
      return "px-5 py-2.5 text-sm ";
    case "lg":
      return "py-3 px-5 text-base";
  }
};

const getDisabledStyle = (disabled = false, variant: Variant = "solid") => {
  if (!disabled) return;

  switch (variant) {
    case "solid":
      return "cursor-not-allowed hover:bg-gray-700 bg-gray-700 focus:ring-gray-300 dark:bg-gray-600 dark:focus:ring-gray-800";
    case "outline":
      return "cursor-not-allowed text-gray-700 hover:text-white hover:bg-white border border-gray-700 focus:ring-gray-300 dark:border-gray-500 dark:text-gray-500 dark:focus:ring-gray-800";
  }
};

const getSolidStyle = (color: Color = "default") => {
  switch (color) {
    case "default":
      return "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
    case "success":
      return "bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
    case "danger":
      return "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
  }
};

const getOutlineStyle = (color: Color = "default") => {
  switch (color) {
    case "default":
      return "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800";
    case "success":
      return "text-green-700 hover:text-white border border-green-600 hover:bg-green-700 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800";
    case "danger":
      return "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900";
  }
};

const getButtonVariantColor = (
  variant: Variant = "solid",
  color: Color = "default"
) => {
  switch (variant) {
    case "outline":
      return `rounded-lg ${getOutlineStyle(color)}`;
    case "solid":
      return `rounded-lg ${getSolidStyle(color)}`;
  }
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  color?: Color;
  leftIcon?: ReactNode;
} & ComponentPropsWithoutRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function ForwardRefButton(props, ref) {
    return (
      <button
        {...props}
        ref={ref}
        className={clsx(
          commonStyle,
          getButtonSize(props.size),
          getButtonVariantColor(props.variant, props.color),
          getDisabledStyle(props.disabled, props.variant),
          props.className
        )}
      />
    );
  }
);

export default Button;
