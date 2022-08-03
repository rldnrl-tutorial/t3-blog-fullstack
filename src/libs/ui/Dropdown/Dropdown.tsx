import clsx from "clsx";
import React, { ReactNode } from "react";

type DropdownProps = {
  showMenuList?: boolean;
  children?: ReactNode;
};

export default function Dropdown(props: DropdownProps) {
  return (
    <div
      id="dropdown"
      className={clsx(
        !props.showMenuList && "hidden",
        "z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute top-0 right-auto bottom-auto left-0 m-0 translate-y-16 translate-x-6"
      )}
    >
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefault"
      >
        {props.children}
      </ul>
    </div>
  );
}
